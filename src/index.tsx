import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GH_OWNER, GH_REPO } from "./const";
let root: ReactDOM.Root | null = null;

if (!GH_REPO) {
  const error = "You must declare 'repo' attribute in the script tag.";
  alert(error);
  throw new Error(error);
}
if (!GH_OWNER) {
  const error = "You must declare 'owner' attribute in the script tag.";
  alert(error);
  throw new Error(error);
}

document.getElementById("live-feedback")?.remove();
const div = document.createElement("div");
div.id = "live-feedback";
document.body.appendChild(div);
const shadowRoot = div.attachShadow({ mode: "open" });
root = ReactDOM.createRoot(shadowRoot);
root.render(
  <React.StrictMode>
    <App shadowRoot={shadowRoot} />
  </React.StrictMode>
);
