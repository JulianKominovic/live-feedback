const IS_DEV = false;
export const GH_TOKEN_COOKIE_KEY = "GH-LIVE-FEEDBACK-TOKEN";
export const GH_AUTH_SERVER_BASE_URL = IS_DEV
  ? "http://localhost:4000"
  : "https://live-feedback.onrender.com";
export const GH_REPO = document.currentScript?.getAttribute("repo") ?? "";
export const GH_OWNER = document.currentScript?.getAttribute("owner") ?? "";
export const MINIMUM_CSS_SELECTORS_FOR_ELEMENT_TO_SHOW_BUBBLE = 2;
export const TRACKING_INTERVAL = 1000;
export const TEXT_RANGE_BUBBLE_THREAD_CREATION_DEBOUNCE = 500;

if (IS_DEV) {
  console.warn("This is a development environment");
}
