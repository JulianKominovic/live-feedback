import { GH_OWNER, GH_REPO } from "../../const";
import useSystemStore from "../../store/system";
import { log } from "../../utils";
import octokit, { fetchCache } from "./client";

export async function getOpenPullRequests() {
  useSystemStore.getState().addTask({
    id: "get-open-pull-requests",
    title: "Fetching open pull requests",
  });

  try {
    const response = await octokit().request(
      "GET /repos/{owner}/{repo}/pulls",
      {
        owner: GH_OWNER(),
        repo: GH_REPO(),
        state: "open",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
        request: {
          fetch: fetchCache,
        },
      }
    );

    useSystemStore.getState().updateTaskStatus({
      id: "get-open-pull-requests",
      title: "Fetched open pull requests",
      status: "success",
    });

    return response;
  } catch (err) {
    log(err);
    useSystemStore.getState().updateTaskStatus({
      id: "get-open-pull-requests",
      title: "Error fetching open pull requests",
      status: "error",
    });

    return null;
  }
}
