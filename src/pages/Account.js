import React from "react";
import { withTranslation } from "react-i18next";
import { Box } from "@mui/material";

import Appbar from "../components/Appbar";
import MyAccount from "../components/MyAccount";

class Account extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Account.constructor");
    }
    super(props);
    this.state = {};

    // Handles
    this.handleAppbarCallback = this.handleAppbarCallback.bind(this);
    this.handleMyAccountCallback = this.handleMyAccountCallback.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Account.render");
    }
    return (
      <div>
        <Appbar
          signedin={this.props.signedin}
          callback={this.handleAppbarCallback}
          route="account"
        />
        <Box sx={{ height: 48 }} />
        <MyAccount
          signedin={this.props.signedin}
          callback={this.handleMyAccountCallback}
          user={this.props.user}
        />
      </div>
    );
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Account.componentDidUpdate");
    }
  }

  // Handles
  handleAppbarCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Account.handleLandingCallback " + action);
    }
    switch (action) {
      case "signedout":
        this.props.callback("signedout");
        break;
      case "signedin":
        this.props.callback("signedin", details);
        break;
      default:
    }
  }
  handleMyAccountCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Account.handleMyAccountCallback " + action);
    }
    switch (action) {
      default:
    }
  }
}

export default withTranslation()(Account);
