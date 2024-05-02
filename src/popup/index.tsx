import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
const div = document.querySelector("#app");
ReactDOM.createRoot(div!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
