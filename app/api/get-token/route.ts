import { NextResponse } from "next/server";
import { authServerBaseUrl, octokitApp } from "../octokit";

export const dynamic = "force-dynamic"; // defaults to auto
export const GET = async (req: Request) => {
  const requestUrl = new URL(req.url);
  const state = requestUrl.searchParams.get("state");
  if (!state) return NextResponse.json({ error: "state is required" });
  const { url } = octokitApp.getWebFlowAuthorizationUrl({
    state,
    allowSignup: true,
    redirectUrl: authServerBaseUrl + "/api/github/oauth/callback",
  });
  return NextResponse.redirect(url, { status: 302 });
};
