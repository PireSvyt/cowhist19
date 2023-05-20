import * as React from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { withTranslation } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";

// https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/

// Components
import Home from "./components/Home/Home.js";
import Activation from "./components/Activation/Activation.js";
import Table from "./components/Table/Table.js";
import Account from "./components/Account/Account.js";
import Help from "./components/Help/Help.js";
// Services
import serviceAssessCookie from "./services/serviceAssessCookie.js";

// Reducers
import appStore from "./store/appStore.js";

export default function App() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("App");
  }

  // Gather token from cookies
  serviceAssessCookie();

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/activation/:id" element={<Activation />} />
        <Route path="/account" element={<Account />} />
        <Route path="/table/:id" element={<Table />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
}
