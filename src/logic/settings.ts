import { GH_OWNER, GH_REPO } from "../const";

export function checkForSettingsToExist() {
  if (!GH_REPO) {
    alert(
      "Please provide the Github repository in the settings where issues will be created"
    );
  }
  if (!GH_OWNER) {
    alert(
      "Please provide the username of the owner of the Github repository in the settings"
    );
  }
}
