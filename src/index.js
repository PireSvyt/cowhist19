import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App/App.js";

import "./i18n/i18n-config.js";
import appStore from "./App/store/appStore.js";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </React.StrictMode>,
);

//document.body.requestFullscreen();
