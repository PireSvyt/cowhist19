import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import ReactGA from "react-ga4";

import App from "./App/App.js";

import "./i18n/i18n-config.js";
import appStore from "./App/store/appStore.js";

ReactGA.initialize([{ trackingId: process.env.GA_MEASUREMENT_ID }])

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </React.StrictMode>
);

//document.body.requestFullscreen();
