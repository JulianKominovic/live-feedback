import { Octokit } from "@octokit/core";
import { GH_TOKEN } from "../../const";

const octokit = new Octokit({
  auth: GH_TOKEN(),
});

export default octokit;
