import * as React from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { withTranslation } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/

// Components
import Home from "./components/Home/Home.js";
import Activation from "./components/Activation/Activation.js";
import Table from "./components/Table/Table.js";
import Account from "./components/Account/Account.js";

// Services
import apiAuthAssessV0 from "./services/apiAuthAssessV0.js";
//import serviceAssessCookie from "./services/serviceAssessCookie.js";
import apiUserDetails from "./services/apiUserDetails.js";
import apiUserTables from "./services/apiUserTables.js";
//import setLanguage from "./shared/services/setLanguage.js";

class App extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.constructor");
    }
    super(props);
    this.state = {
      signedin: undefined,
      token: undefined,
      userid: undefined,
      user: undefined,
    };

    // Helpers
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.getUserDetails = this.getUserDetails.bind(this);
    this.getUserTables = this.getUserTables.bind(this);

    // Handles
    this.handleHomeCallback = this.handleHomeCallback.bind(this);
    this.handleAssessLoginCallback = this.handleAssessLoginCallback.bind(this);
    this.handleAccountCallback = this.handleAccountCallback.bind(this);
    this.handleTableCallback = this.handleTableCallback.bind(this);
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
                token={this.state.token}
                user={this.state.user}
              />
            }
          />
          <Route
            path="/activation/:id"
            element={
              <Activation
                signedin={this.state.signedin}
                token={this.state.token}
              />
            }
          />
          <Route
            path="/account"
            element={
              <Account
                callback={this.handleAccountCallback}
                signedin={this.state.signedin}
                token={this.state.token}
                user={this.state.user}
              />
            }
          />
          <Route
            path="/table/:id"
            element={
              <Table
                callback={this.handleTableCallback}
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

    // Check token from cookies
    // https://medium.com/how-to-react/how-to-use-js-cookie-to-store-data-in-cookies-in-react-js-aab47f8a45c3
    let token = Cookies.get("cowhist19_token");
    if (token !== undefined) {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("App.componentDidMount assessing token from cookies");
      }
      apiAuthAssessV0(token).then((assessment) => {
        if (assessment.status === 200) {
          if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("App.componentDidMount token valid");
          }
          this.signIn(token);
        }
        if (assessment.status === 404) {
          if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("App.componentDidMount token invalid");
          }
          this.signOut();
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
    // User status tollgate
    if (
      decodedtoken.status === "registered" ||
      decodedtoken.status === "signedup"
    ) {
      // Then update variables to signed in
      this.setState((prevState, props) => ({
        signedin: true,
        token: token,
        userid: decodedtoken.id,
      }));
      // Get user details
      this.getUserDetails(token);
    } else {
      this.signOut();
    }
  }
  signOut() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.signOut ");
    }

    // Remove cookies
    Cookies.remove("cowhist19_token");

    // Check url
    if (
      window.location.href.includes("table") ||
      window.location.href.includes("account")
    ) {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        Cookies.remove("cowhist19_token");
        console.log("App.signOut ");
      }
      window.location = "/";
    }

    // Reset state if on home
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
  getUserTables(token) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.getUserTables ");
    }
    if (token !== undefined) {
      apiUserTables(token).then((data) => {
        let updatedUser = this.state.user;
        updatedUser.tables = data.tables;
        this.setState((prevState, props) => ({
          user: user,
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
  handleAssessLoginCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleAssessLoginCallback " + action);
    }
    switch (action) {
      case "assessed":
        this.signIn(details);
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
  handleTableCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.handleTableCallback " + action);
    }
    switch (action) {
      case "signedout":
        this.signOut();
        break;
      default:
    }
  }
}

export default withTranslation()(App);
