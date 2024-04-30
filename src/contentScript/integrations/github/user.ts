import { GH_OWNER, GH_REPO } from "../../const";
import { checkForSettingsToExist } from "../../logic/settings";
import octokit from "./client";

export async function getUserInfo() {
  try {
    return octokit().request("GET /user");
  } catch (e) {
    console.error(e);
    return null;
  }
}
