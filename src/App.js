import "./styles.css";
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/
import Home from "./pages/Home";
import Table from "./pages/Table";

export default class App extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.constructor");
    }
    super(props);
    this.state = {
      signedin: false,
    };

    // Handles
    this.handleHomeCallback = this.handleHomeCallback.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.render");
    }
    return (
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home callback={this.handleHomeCallback} />}
          />
          <Route path="/:id" element={<Table />} />
        </Routes>
      </Router>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.componentDidMount");
    }
    // Update

    // Load
  }

  // Handles
  handleHomeCallback(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleHomeCallback");
    }
    switch (action) {
      case "signedin":
        this.setState((prevState, props) => ({
          signedin: true,
        }));
        break;
      default:
    }
  }
}
