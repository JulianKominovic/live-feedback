import { INTERCOM_EVENTS } from "../../types/events";

export function takeTabScreenshot(): Promise<string | undefined> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      { type: INTERCOM_EVENTS.TAKE_TAB_SCREENSHOT },
      (response) => {
        resolve(response);
      }
    );
  });
}

let canvas: HTMLCanvasElement = document.createElement("canvas");
export function takeElementScreenshot(
  element: HTMLElement
): Promise<string | undefined> {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const elementDimensions = element.getBoundingClientRect();
  const dimensions = {
    top: elementDimensions.top * devicePixelRatio,
    left: elementDimensions.left * devicePixelRatio,
    width: elementDimensions.width * devicePixelRatio,
    height: elementDimensions.height * devicePixelRatio,
  };

  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      { type: INTERCOM_EVENTS.TAKE_TAB_SCREENSHOT, dimensions },
      (dataUrl) => {
        canvas = document.createElement("canvas");
        const image = new Image();
        image.onload = function () {
          canvas.width = dimensions.width;
          canvas.height = dimensions.height;
          const context = canvas.getContext("2d");

          context!.drawImage(
            image,
            dimensions.left,
            dimensions.top,
            dimensions.width,
            dimensions.height,
            0,
            0,
            dimensions.width,
            dimensions.height
          );
          const croppedDataUrl = canvas.toDataURL("image/png");
          resolve(croppedDataUrl);
        };
        image.src = dataUrl;
      }
    );
  });
}
