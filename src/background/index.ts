import { INTERCOM_EVENTS } from "../contentScript/types/events";
import { tabScreenshot } from "./jobs";

console.log("background is running");

chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {
  if (message.type === INTERCOM_EVENTS.TAKE_TAB_SCREENSHOT) {
    tabScreenshot(sender.tab?.id).then((captureBase64) => {
      senderResponse(captureBase64);
    });
  }

  return true;
});
