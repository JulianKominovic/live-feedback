import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
let root: ReactDOM.Root | null = null;

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
