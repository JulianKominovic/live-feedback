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
createServer((req, res) => {
  middleware(req, res).then((success) => {
    if (req.url === "/") return;
    if (success) {
      console.log(`${req.url} OK`);
    } else {
      console.error(`${req.url} FAIL`);
    }
  });
}).listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
