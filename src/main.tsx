import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
const div = document.createElement("div");
div.id = "live-feedback";
document.body.appendChild(div);
ReactDOM.createRoot(div).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
