import { GH_OWNER, GH_REPO } from "../../const";
import { checkForSettingsToExist } from "../../logic/settings";
import octokit from "./client";

export async function uploadFile({
  fileContent,
  path,
}: {
  fileContent: string;
  path: string;
}) {
  checkForSettingsToExist();
  try {
    return octokit().request("PUT /repos/{owner}/{repo}/contents/{path}", {
      owner: GH_OWNER(),
      repo: GH_REPO(),
      path,
      message: `Created file ${path}`,
      content: fileContent,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
  } catch (e) {
    console.error(e);
    return null;
  }
}
