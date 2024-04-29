import { Octokit } from "@octokit/core";
import { GH_TOKEN } from "../../const";

function octokit() {
  return new Octokit({
    auth: GH_TOKEN(),
  });
}
export default octokit;
