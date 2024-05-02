import { log } from "./utils";

const {
  repo,
  owner,
  gh_token,
  activated: activatedFlag,
} = await chrome.storage.local.get(["repo", "owner", "gh_token", "activated"]);
let ghToken = gh_token;
let ghRepo = repo;
let ghOwner = owner;
let activated = activatedFlag;
export const GH_TOKEN = () => ghToken;
export const GH_REPO = () => ghRepo;
export const GH_OWNER = () => ghOwner;
export const ACTIVATED = () => activated;
export const GH_TEMP_FILES_PATH_FOLDER = ".github/live-feedback";

chrome.storage.onChanged.addListener((changes, areaName) => {
  log("Changes in extension local storage: ", changes);
  if (areaName !== "local") return;
  if (changes.gh_token) ghToken = changes.gh_token.newValue;
  if (changes.repo) ghRepo = changes.repo.newValue;
  if (changes.owner) ghOwner = changes.owner.newValue;
  if (changes.activated) activated = changes.activated.newValue;
});
