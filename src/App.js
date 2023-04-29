import "./styles.css";
import * as React from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/
import Home from "./pages/Home";
import Table from "./pages/Table";
import Account from "./pages/Account";

export default class App extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.constructor");
    }
    super(props);
    this.state = {
      signedin: undefined,
      token: null,
    };

    // Handles
    this.handleHomeCallback = this.handleHomeCallback.bind(this);
    this.handleAccountCallback = this.handleAccountCallback.bind(this);
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
            element={
              <Home
                callback={this.handleHomeCallback}
                signedin={this.state.signedin}
              />
            }
          />
          <Route path="/:id" element={<Table />} />
          <Route
            path="/account"
            element={
              <Account
                callback={this.handleAccountCallback}
                signedin={this.state.signedin}
                token={this.state.token}
              />
            }
          />
        </Routes>
      </Router>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.componentDidMount");
    }
    // Load
  }

  // Handles
  handleHomeCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleHomeCallback " + action);
    }
    switch (action) {
      case "signedin":
        this.setState((prevState, props) => ({
          signedin: true,
          token: details,
        }));
        break;
      case "signedout":
        this.setState((prevState, props) => ({
          signedin: false,
          token: null,
        }));
        break;
      default:
    }
  }
  handleAccountCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleAccountCallback " + action);
    }
    switch (action) {
      case "signedin":
        this.setState((prevState, props) => ({
          signedin: true,
          token: details,
        }));
        break;
      case "signedout":
        this.setState((prevState, props) => ({
          signedin: false,
          token: null,
        }));
        break;
      default:
    }
  }
}
