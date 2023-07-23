import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/

// Components
import Home from "./components/Home/Home.js";
import Activation from "./components/Activation/Activation.js";
import PasswordReset from "./components/PasswordReset/PasswordReset.js";
import Table from "./components/Table/Table.js";
import Account from "./components/Account/Account.js";
import Documentation from "./components/Documentation/Documentation.js";
import About from "./components/About/About.js";
import Admin from "./components/Admin/Admin.js";
// Services
import serviceAssessCookie from "./services/Access/serviceAssessCookie.js";

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
