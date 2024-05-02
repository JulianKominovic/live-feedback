import { log } from "../contentScript/utils";

export function tabScreenshot(tabId?: number): Promise<string | undefined> {
  return new Promise((resolve) => {
    log("Taking screenshot of tab", tabId);
    if (!tabId) return resolve(undefined);
    chrome.tabs.get(tabId, function (tab) {
      chrome.tabs.captureVisibleTab(
        tab.windowId,
        { format: "png" },
        function (dataUrl: string) {
          resolve(dataUrl);
        }
      );
    });
  });
}
