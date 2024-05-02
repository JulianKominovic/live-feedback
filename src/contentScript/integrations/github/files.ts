import { GH_OWNER, GH_REPO } from "../../const";
import useSystemStore from "../../store/system";
import octokit from "./client";

export async function uploadFile({
  fileContent,
  path,
}: {
  fileContent: string;
  path: string;
}) {
  useSystemStore.getState().setAsyncOperationsStatus("pending");
  try {
    const response = octokit().request(
      "PUT /repos/{owner}/{repo}/contents/{path}",
      {
        owner: GH_OWNER(),
        repo: GH_REPO(),
        path,
        message: `Created file ${path}`,
        content: fileContent,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    useSystemStore.getState().setAsyncOperationsStatus("success");
    return response;
  } catch (e) {
    useSystemStore.getState().setAsyncOperationsStatus("error");
    console.error(e);
    return null;
  }
}
