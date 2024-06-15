import { GH_OWNER, GH_REPO } from "../../const";
import useSystemStore from "../../store/system";
import { log } from "../../utils";
import { checkAuthError } from "./auth-error-msg";
import octokit from "./client";
import { RequestError } from "octokit";
export async function getOpenPullRequests() {
  useSystemStore.getState().addTask({
    id: "get-open-pull-requests",
    title: "Fetching open pull requests",
  });

  try {
    const client = await octokit();
    const response = client.request("GET /repos/{owner}/{repo}/pulls", {
      owner: GH_OWNER,
      repo: GH_REPO,
      state: "open",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    useSystemStore.getState().updateTaskStatus({
      id: "get-open-pull-requests",
      title: "Fetched open pull requests",
      status: "success",
    });

    return response;
  } catch (err) {
    log(err);
    if (err instanceof RequestError) {
      checkAuthError(err);
    }
    useSystemStore.getState().updateTaskStatus({
      id: "get-open-pull-requests",
      title: "Error fetching open pull requests",
      status: "error",
    });

    return null;
  }
}
