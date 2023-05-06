import * as React from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/

// Components
import Home from "./components/Home/Home";
import Table from "./components/Table/Table";
import Account from "./components/Account/Account";

// Services
import apiAuthAssess from "./services/apiAuthAssess";
import apiUserDetails from "./services/apiUserDetails";
import apiUserTables from "./services/apiUserTables";

export default class App extends React.Component {
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
        }
        if (assessment.status === 404) {
          if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("App.componentDidMount token invalid");
          }
          Cookies.remove("cowhist19-token");
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
      Cookies.remove("cowhist19-token");
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
  getUserTables(token) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.getUserTables ");
    }
    if (token !== undefined) {
      apiUserTables(token).then((data) => {
        let updatedUser = this.state.user
        updatedUser.tables = data.tables
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
