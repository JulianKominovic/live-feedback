import { createServer } from "node:http";
import { OAuthApp, createNodeMiddleware } from "@octokit/oauth-app";

const port = process.env.PORT || 4000;
const app = new OAuthApp({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  defaultScopes: ["repo", "user"],
  clientType: "github-app",
});

const middleware = createNodeMiddleware(app, {
  pathPrefix: "/api/github/oauth",
});

// Your app can receive the OAuth redirect at /api/github/oauth/callback
// Users can initiate the OAuth web flow by opening /api/oauth/login
createServer(async (req, res) => {
  if (req.url === "/") return res.end("OK");
  if (req.url.startsWith("/api/github/oauth/callback?code=")) {
    const searchParams = new URLSearchParams(req.url.split("?", 2)[1]);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    const { authentication } = await app.createToken({ code, state });
    const json = JSON.stringify({
      type: `LIVE_FEEDBACK_AUTH_COMPLETE_${state}`,
      app: "LIVE_FEEDBACK",
      token: authentication.token,
    });
    res.write(`
      <html>
        <head>
          <title>Live feedback OAuth Callback</title>
        </head>
        <body>
          You can close this tab now.
          <script>
            window.opener.postMessage(${json}, "*");
          </script>
        </body>
      </html>
    `);
    res.end();
    return console.log(`${req.url} OK`);
  }
  if (req.url.startsWith("/get-token?state=")) {
    const state = new URLSearchParams(req.url.split("?", 2)[1]).get("state");
    const { url } = app.getWebFlowAuthorizationUrl({
      state,
      allowSignup: true,
      redirectUrl: "http://localhost:4000/api/github/oauth/callback",
    });
    res.writeHead(302, { Location: url });
    res.end();
    return console.log(`${req.url} OK`);
  }
  middleware(req, res).then((success) => {
    if (success) {
      console.log(`${req.url} OK`);
    } else {
      console.error(`${req.url} FAIL`);
    }
  });
}).listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
