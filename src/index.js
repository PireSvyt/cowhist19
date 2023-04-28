import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./resources/i18n-config";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
