import { Octokit } from "@octokit/core";
import useAuthStore from "../../store/auth";

const octokit = () =>
  new Octokit({
    auth: useAuthStore.getState().token,
  });

export default octokit;
