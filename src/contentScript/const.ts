import { GLOBAL_CONST_VARIABLES } from "./types/const";
import { INTERCOM_EVENTS } from "./types/events";
import { getHTMLSettingsTagProperties, log, platformIsPopup } from "./utils";

const {
  repo,
  owner,
  gh_token,
  activated: activatedFlag,
  locked_repo,
  locked_owner,
} = await chrome.storage.local.get([
  GLOBAL_CONST_VARIABLES.REPO,
  GLOBAL_CONST_VARIABLES.OWNER,
  GLOBAL_CONST_VARIABLES.GH_TOKEN,
  GLOBAL_CONST_VARIABLES.ACTIVATED,
  GLOBAL_CONST_VARIABLES.LOCKED_OWNER,
  GLOBAL_CONST_VARIABLES.LOCKED_REPO,
]);
let ghToken = gh_token;
let ghRepo = window.LIVE_FEEDBACK?.repo || repo;
let ghOwner = window.LIVE_FEEDBACK?.owner || owner;
let activated = activatedFlag;
let lockedRepo = Boolean(getHTMLSettingsTagProperties()?.ghRepo || locked_repo);
let lockedOwner = Boolean(
  getHTMLSettingsTagProperties()?.ghOwner || locked_owner
);
export const GH_TOKEN = () => ghToken;
export const GH_REPO = () => ghRepo;
export const GH_OWNER = () => ghOwner;
export const ACTIVATED = () => activated;
export const LOCKED_REPO = () => lockedRepo;
export const LOCKED_OWNER = () => lockedOwner;
export const GH_TEMP_FILES_PATH_FOLDER = ".github/live-feedback";
export const MINIMUM_CSS_SELECTORS_FOR_ELEMENT_TO_SHOW_BUBBLE = 2;
chrome.storage.onChanged.addListener((changes, areaName) => {
  log("Changes in extension local storage: ", changes);
  if (areaName !== "local") return;
  if (changes.gh_token) ghToken = changes.gh_token.newValue;
  if (changes.repo) ghRepo = changes.repo.newValue;
  if (changes.owner) ghOwner = changes.owner.newValue;
  if (changes.activated) activated = changes.activated.newValue;
  if (changes.locked_repo) lockedRepo = changes.locked_repo.newValue;
  if (changes.locked_owner) lockedOwner = changes.locked_owner.newValue;
});

async function applyWebsiteImperativeSettings() {
  if (platformIsPopup()) return;
  const settings = getHTMLSettingsTagProperties();
  if (settings) {
    if (settings.ghRepo) {
      ghRepo = settings.ghRepo;
      await chrome.storage.local.set({ repo: ghRepo, locked_repo: true });
    }
    if (settings.ghOwner) {
      ghOwner = settings.ghOwner;
      await chrome.storage.local.set({ owner: ghOwner, locked_owner: true });
    }
  } else {
    await chrome.storage.local.set({ locked_repo: false, locked_owner: false });
  }
}
chrome.runtime.onMessage.addListener(
  async (message, sender, senderResponse) => {
    console.log("Message received in content script: ", message);
    if (
      message.type === INTERCOM_EVENTS.ACTIVE_TAB_CHANGED ||
      message.type === INTERCOM_EVENTS.TAB_UPATED
    ) {
      if (sender.tab?.active) applyWebsiteImperativeSettings();
    }

    senderResponse({});

    return true;
  }
);
