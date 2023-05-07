import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App/App.js";
import "./i18n/i18n-config.js";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
