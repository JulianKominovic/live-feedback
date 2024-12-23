const IS_DEV = false;
export const GH_TOKEN_COOKIE_KEY = "GH-LIVE-FEEDBACK-TOKEN";
export const GH_AUTH_SERVER_BASE_URL = IS_DEV
  ? "http://localhost:3000/api"
  : "https://jkominovic.dev/api";
export const GH_REPO = document.currentScript?.getAttribute("repo") ?? "";
export const GH_OWNER = document.currentScript?.getAttribute("owner") ?? "";
export const MINIMUM_CSS_SELECTORS_FOR_ELEMENT_TO_SHOW_BUBBLE = 3;
export const TRACKING_INTERVAL = 400;
export const TEXT_RANGE_BUBBLE_THREAD_CREATION_DEBOUNCE = 500;
export const TOOLTIP_DELAY = 300;
export const LIVE_FEEDBACK_ROOT_QUERY_SELECTOR = "#live-feedback";
if (IS_DEV) {
  console.warn("This is a development environment");
}
