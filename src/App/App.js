import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/

import Documentation from "./Navigation/Page_Documentation/Documentation.js";
import About from "./Navigation/Page_About/About.js";
import Home from "./Navigation/Page_Home/Home.js";
import Table from "./Navigation/Page_Table/Table.js";
import Account from "./Navigation/Page_Account/Account.js";
import Admin from "./Navigation/Page_Admin/Admin.js";

import Activation from "./Auth/Activation/Activation.js";
import PasswordReset from "./Auth/PasswordReset/PasswordReset.js";

// Services
import serviceAssessCookie from "./Auth/Access/serviceAssessCookie.js"

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
        <Route path="/activation/:token" element={<Activation />} />
        <Route path="/passwordreset/:token" element={<PasswordReset />} />
        <Route path="/account" element={<Account />} />
        <Route path="/table/:id" element={<Table />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
