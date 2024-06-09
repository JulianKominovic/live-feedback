import { Octokit } from "@octokit/core";
import useAuthStore from "../../store/auth";

const octokit = async () =>
  new Octokit({
    auth: await useAuthStore.getState().getToken(),
  });

export default octokit;
