import { OAuthApp } from "@octokit/oauth-app";

const port = process.env.PORT || 4000;
const isDev = process.env.NODE_ENV === "development";
export const authServerBaseUrl = isDev
  ? "http://localhost:" + port
  : "https://live-feedback.jkominovic.dev";

export const octokitApp = new OAuthApp({
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  defaultScopes: ["repo", "user"],
  clientType: "github-app",
});
