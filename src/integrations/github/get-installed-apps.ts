import { RequestError } from "octokit";
import useSystemStore from "../../store/system";
import { log } from "../../utils";
import { checkAuthError } from "./auth-error-msg";
import octokit from "./client";

export async function getUserInstallations() {
  useSystemStore.getState().addTask({
    id: "get-user-installations",
    title: "Fetching user installations",
  });

  try {
    const client = await octokit();
    const response = client.request("GET /user/installations");

    useSystemStore.getState().updateTaskStatus({
      id: "get-user-installations",
      title: "Fetched user installations",
      status: "success",
    });

    return response;
  } catch (err) {
    log(err);
    if (err instanceof RequestError) {
      checkAuthError(err);
    }
    useSystemStore.getState().updateTaskStatus({
      id: "get-user-installations",
      title: "Error fetching user installations",
      status: "error",
    });

    return null;
  }
}
