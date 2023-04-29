import "./styles.css";
import * as React from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/
import Home from "./pages/Home";
import Table from "./pages/Table";
import Account from "./pages/Account";
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
  }

  // Helpers
  getUserDetails(token) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.getUserDetails " + userid);
    }
    apiUserDetails(token).then((data) => {
      /*console.log("apiUserDetails data.user");
      console.log(data.user);*/
      this.setState((prevState, props) => ({
        user: data.user,
      }));
    });
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
          token: details.token,
          userid: details.id,
        }));
        this.getUserDetails(details.token);
        break;
      case "signedout":
        this.setState((prevState, props) => ({
          signedin: false,
          token: null,
          userid: undefined,
          user: undefined,
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
      case "signedout":
        this.setState((prevState, props) => ({
          signedin: false,
          token: null,
          userid: undefined,
          user: undefined,
        }));
        break;
      default:
    }
  }
}
