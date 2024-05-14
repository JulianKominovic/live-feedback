import { INTERCOM_EVENTS } from "../contentScript/types/events";
import { log } from "../contentScript/utils";
import { tabScreenshot } from "./jobs";

log("background is running");

chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {
  if (message.type === INTERCOM_EVENTS.TAKE_TAB_SCREENSHOT) {
    tabScreenshot(sender.tab?.id).then((captureBase64) => {
      senderResponse(captureBase64);
    });
  }

  return true;
});
chrome.tabs.onActivated.addListener((activeInfo) => {
  log("Active tab changed: ", activeInfo);

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id!, {
      type: INTERCOM_EVENTS.ACTIVE_TAB_CHANGED,
    });
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  log("Tab updated: ", tabId, changeInfo, tab);

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id!, {
      type: INTERCOM_EVENTS.TAB_UPATED,
    });
  });
});
