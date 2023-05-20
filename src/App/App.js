import * as React from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { withTranslation } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";

// https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/

// Components
import Home from "./components/Home/Home.js";
import Activation from "./components/Activation/Activation.js";
import Table from "./components/Table/Table.js";
import Account from "./components/Account/Account.js";
import Help from "./components/Help/Help.js";
// Services
import apiUserDetails from "./services/apiUserDetails.js";
import apiUserTables from "./services/apiUserTables.js";
import serviceAssessCookie from "./services/serviceAssessCookie.js";
// Reducers
import appStore from "./store/appStore.js";

class App extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.constructor");
    }
    super(props);
    this.state = {};

    // Helpers
    this.getUserDetails = this.getUserDetails.bind(this);
    this.getUserTables = this.getUserTables.bind(this);

    // Handles
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.render");
    }
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/activation/:id" element={<Activation />} />
          <Route path="/account" element={<Account />} />
          <Route path="/table/:id" element={<Table />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </Router>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.componentDidMount");
    }
    // Check token from Cookies
    serviceAssessCookie();
  }

  // Helpers
  getUserDetails(token) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("App.getUserDetails ");
    }
    if (token !== undefined) {
      apiUserDetails(token).then((data) => {
        this.setState((prevState, props) => ({
          user: data.user,
        }));
        // STORE IN REDUX STORE
        appStore.dispatch({
          type: "user/update",
          payload: data.user,
        });
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
}

export default withTranslation()(App);
