import useSystemStore from "../../store/system";
import { log } from "../../utils";
import octokit from "./client";

export async function getUserInstallations() {
  useSystemStore.getState().addTask({
    id: "get-user-installations",
    title: "Fetching user installations",
  });

  try {
    const response = await octokit().request("GET /user/installations");

    useSystemStore.getState().updateTaskStatus({
      id: "get-user-installations",
      title: "Fetched user installations",
      status: "success",
    });

    return response;
  } catch (err) {
    log(err);
    useSystemStore.getState().updateTaskStatus({
      id: "get-user-installations",
      title: "Error fetching user installations",
      status: "error",
    });

    return null;
  }
}
