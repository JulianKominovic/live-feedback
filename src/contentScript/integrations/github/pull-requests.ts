import { GH_OWNER, GH_REPO } from "../../const";
import useSystemStore from "../../store/system";
import { log } from "../../utils";
import octokit, { fetchCache } from "./client";

export async function getOpenPullRequests() {
  useSystemStore.getState().setAsyncOperationsStatus("pending");

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

    useSystemStore.getState().setAsyncOperationsStatus("success");

    return response;
  } catch (err) {
    log(err);
    useSystemStore.getState().setAsyncOperationsStatus("error");

    return null;
  }
}
