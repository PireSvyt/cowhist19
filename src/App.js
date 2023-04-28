import "./styles.css";
import * as React from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/
import Home from "./pages/Home";
import Table from "./pages/Table";
import { apiAuthAssess } from "./api/auth";

export default class App extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.constructor");
    }
    super(props);
    this.state = {
      signedin: false,
      token: null,
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
            element={
              <Home
                callback={this.handleHomeCallback}
                signedin={this.state.signedin}
              />
            }
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
    // Check token from cookies
    // token stored at sign in from SignInModal.handleProceed
    // token destroyed at sign out from Appbar.handleSignout
    let token = Cookies.get("token");
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.componentDidMount token");
      console.log(token);
    }
    if (token !== undefined) {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("App.componentDidMount assessing token from cookies");
      }
      apiAuthAssess(token).then((assessment) => {
        if (assessment.status === 200) {
          if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("App.componentDidMount token valid");
          }
          this.setState((prevState, props) => ({
            signedin: true,
            token: token,
          }));
        } else {
          if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("App.componentDidMount token invalid");
          }
        }
      });
    }

    // Load
  }

  // Handles
  handleHomeCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleHomeCallback");
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
