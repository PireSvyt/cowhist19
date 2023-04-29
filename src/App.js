import "./styles.css";
import * as React from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/
import Home from "./pages/Home";
import Table from "./pages/Table";
import Account from "./pages/Account";
import { apiAuthAssess } from "./api/auth";
import { apiUserDetails } from "./api/user";

export default class App extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.constructor");
    }
    super(props);
    this.state = {
      signedin: undefined,
      token: null,
      userid: undefined,
      user: undefined,
    };

    // Helpers
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.getUserDetails = this.getUserDetails.bind(this);

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
                user={this.state.user}
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

    // Check token from cookies
    // https://medium.com/how-to-react/how-to-use-js-cookie-to-store-data-in-cookies-in-react-js-aab47f8a45c3
    let token = Cookies.get("cowhist19-token");
    /*if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.componentDidMount token");
      console.log(token);
    }*/
    if (token !== undefined) {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("App.componentDidMount assessing token from cookies");
      }
      apiAuthAssess(token).then((assessment) => {
        if (assessment.status === 200) {
          if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("App.componentDidMount token valid");
          }
          this.signIn(token);
        } else {
          if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("App.componentDidMount token invalid");
          }
        }
      });
    } else {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("App.componentDidMount token missing from cookies");
      }
      this.signOut();
    }
  }

  // Helpers
  signIn(token) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.signIn ");
    }
    let decodedtoken = jwt_decode(token);
    this.setState((prevState, props) => ({
      signedin: true,
      token: token,
      userid: decodedtoken.id,
    }));
    // Get user details
    this.getUserDetails(token);
  }
  signOut() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.signOut ");
    }
    this.setState((prevState, props) => ({
      signedin: false,
      token: null,
      userid: undefined,
      user: undefined,
    }));
  }
  getUserDetails(token) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.getUserDetails ");
    }
    if (token !== undefined) {
      apiUserDetails(token).then((data) => {
        this.setState((prevState, props) => ({
          user: data.user,
        }));
      });
    }
  }

  // Handles
  handleHomeCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleHomeCallback " + action);
    }
    switch (action) {
      case "signedin":
        this.signIn(details);
        break;
      case "signedout":
        this.signOut();
        break;
      default:
    }
  }
  handleAccountCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleAccountCallback " + action);
    }
    switch (action) {
      case "signedout":
        this.signOut();
        break;
      default:
    }
  }
}
