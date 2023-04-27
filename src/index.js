import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./resources/i18n-config";

console.log("NODE_ENV = '" + process.env.NODE_ENV + "'");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
