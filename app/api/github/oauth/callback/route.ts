import { NextResponse } from "next/server";
import { octokitApp } from "../../../octokit";

export const dynamic = "force-dynamic"; // defaults to auto
export const GET = async (req: Request) => {
  const requestUrl = new URL(req.url);
  const state = requestUrl.searchParams.get("state");
  const code = requestUrl.searchParams.get("code");
  if (!state) return NextResponse.json({ error: "state is required" });
  if (!code) return NextResponse.json({ error: "code is required" });

  const { authentication } = await octokitApp.createToken({ code, state });
  const json = JSON.stringify({
    type: `LIVE_FEEDBACK_AUTH_COMPLETE_${state}`,
    app: "LIVE_FEEDBACK",
    token: authentication.token,
    tokenExpiresAt: authentication.expiresAt,
  });
  const response = new Response(
    `
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
    `,
    {
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
  return response;
};
