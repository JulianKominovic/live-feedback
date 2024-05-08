import { GH_OWNER, GH_REPO } from "../../const";
import useSystemStore from "../../store/system";
import { log } from "../../utils";
import octokit, { fetchCache } from "./client";

export async function getRepository() {
  useSystemStore.getState().addTask({
    id: "get-repository",
    title: "Fetching repository",
  });

  try {
    const response = await octokit().request("GET /repos/{owner}/{repo}", {
      owner: GH_OWNER(),
      repo: GH_REPO(),
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      request: {
        fetch: fetchCache,
      },
    });

    useSystemStore.getState().updateTaskStatus({
      id: "get-repository",
      title: "Fetched repository",
      status: "success",
    });

    return response;
  } catch (err) {
    log(err);
    useSystemStore.getState().updateTaskStatus({
      id: "get-repository",
      title: "Error fetching repository",
      status: "error",
    });

    return null;
  }
}
