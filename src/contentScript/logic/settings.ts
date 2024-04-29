import { GH_OWNER, GH_REPO, GH_TOKEN } from "../const";

export function checkForSettingsToExist() {
  if (!GH_TOKEN) {
    alert("Please set your Github token in the settings");
  }
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
