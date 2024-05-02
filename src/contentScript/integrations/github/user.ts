import { log } from "../../utils";
import octokit from "./client";

export async function getUserInfo() {
  try {
    return octokit().request("GET /user");
  } catch (e) {
    log(e);
    return null;
  }
}
