import { GH_OWNER, GH_REPO } from "../../const";
import useSystemStore from "../../store/system";
import { log } from "../../utils";
import octokit from "./client";

export async function uploadFile({
  fileContent,
  path,
}: {
  fileContent: string;
  path: string;
}) {
  useSystemStore.getState().addTask({
    id: path,
    title: `Creating file ${path}`,
  });
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
    useSystemStore.getState().updateTaskStatus({
      id: path,
      title: `File created ${path}`,
      status: "success",
    });
    return response;
  } catch (e) {
    useSystemStore.getState().updateTaskStatus({
      id: path,
      title: `Error creating file ${path}`,
      status: "error",
    });
    log(e);
    return null;
  }
}
