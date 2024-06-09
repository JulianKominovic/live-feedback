import { createServer } from "node:http";
import { OAuthApp, createNodeMiddleware } from "octokit";

const app = new OAuthApp({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  defaultScopes: ["repo", "user"],
});

// Your app can receive the OAuth redirect at /api/github/oauth/callback
// Users can initiate the OAuth web flow by opening /api/oauth/login
createServer(createNodeMiddleware(app)).listen(3000);
