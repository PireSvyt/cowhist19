import "./styles.css";
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Langing";
import Home from "./pages/Home";
import Table from "./pages/Table";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/:id" element={<Table />} />
      </Routes>
    </Router>
  );
}

export default App;
