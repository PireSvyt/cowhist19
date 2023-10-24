import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Home from "./components/Home.js";
import Activation from "./components/Activation.js";
import PasswordReset from "./components/PasswordReset.js";
import Table from "./components/Table.js";
import Account from "./components/Account.js";
import Help from "./components/Help.js";
import Admin from "./components/Admin.js";

// Services
import { serviceAuthAssessCookie } from "./services/auth.js";

export default function App() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("App");
  }

  // Gather token from cookies
  serviceAuthAssessCookie();

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />        
        <Route path="/activation/:token" element={<Activation />} />
        <Route path="/passwordreset/:token" element={<PasswordReset />} />
        <Route path="/account" element={<Account />} />
        <Route path="/table/:id" element={<Table />} />
        <Route path="/help" element={<Help />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
