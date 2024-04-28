import { Octokit } from "@octokit/core";
const GH_TOKEN = import.meta.env.VITE_GH_TOKEN;
const octokit = new Octokit({
  auth: GH_TOKEN,
});
export default octokit;
