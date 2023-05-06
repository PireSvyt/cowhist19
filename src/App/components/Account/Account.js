import React from "react";
import { withTranslation } from "react-i18next";
import { Box } from "@mui/material";

// Components
import MyAccount from "./components/MyAccount/MyAccount";

// Shared
import Appbar from "../../shared/components/Appbar/Appbar";

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
    // i18n
    const { t } = this.props;

    return (
      <div>
        <Appbar
          signedin={this.props.signedin}
          token={this.props.token}
          callback={this.handleAppbarCallback}
          route="account"
          title={t("generic-menu-account")}
        />
        <Box sx={{ height: 48 }} />
        <MyAccount
          signedin={this.props.signedin}
          token={this.props.token}
          callback={this.handleMyAccountCallback}
          user={this.props.user}
        />
      </div>
    );
  }

  // Handles
  handleAppbarCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Account.handleAppbarCallback " + action);
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
