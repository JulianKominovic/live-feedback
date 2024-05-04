import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { log } from "./utils";
import { ACTIVATED } from "./const";
let root: ReactDOM.Root | null = null;
function initApp() {
  document.getElementById("live-feedback")?.remove();
  const div = document.createElement("div");
  div.id = "live-feedback";
  document.body.appendChild(div);
  root = ReactDOM.createRoot(div);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
function destroyApp() {
  root?.unmount();
  document.getElementById("live-feedback")?.remove();
}
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local") return;
  if (changes.activated) {
    log("Extension activation changed: ", changes.activated);
    if (changes.activated.newValue) {
      initApp();
    } else {
      destroyApp();
    }
  }
});

if (ACTIVATED()) initApp();
