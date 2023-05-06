import React from "react";
import { withTranslation } from "react-i18next";
import { Box } from "@mui/material";

// Components
import Landing from "./components/Landing/Landing";
import MyStats from "./components/MyStats/MyStats";
import MyTables from "./components/MyTables/MyTables";

// Shared

import Appbar from "../../shared/components/Appbar/Appbar";

class Home extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Home.constructor");
    }
    super(props);
    this.state = {};

    // Handles
    this.handleAppbarCallback = this.handleAppbarCallback.bind(this);
    this.handleLandingCallback = this.handleLandingCallback.bind(this);
    this.handleMyTablesCallback = this.handleMyTablesCallback.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Home.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <div>
        <Appbar
          signedin={this.props.signedin}
          callback={this.handleAppbarCallback}
          token={this.props.token}
          route="home"
          title={t("generic-product-title")}
        />
        <Box sx={{ height: 48 }} />
        <Landing
          open={this.props.signedin === false}
          callback={this.handleLandingCallback}
        />
        <MyStats open={this.props.signedin === true} token={this.props.token} />
        <MyTables
          open={this.props.signedin === true}
          callback={this.handleMyTablesCallback}
          token={this.props.token}
          tables={this.props.user === undefined ? [] : this.props.user.tables}
        />
      </div>
    );
  }

  // Handles
  handleAppbarCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Home.handleLandingCallback " + action);
    }
    switch (action) {
      case "signedout":
        this.props.callback("signedout");
        break;
      default:
    }
  }
  handleLandingCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Home.handleLandingCallback " + action);
    }
    switch (action) {
      case "signedin":
        this.props.callback("signedin", details);
        break;
      default:
    }
  }
  handleMyTablesCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Home.handleMyTablesCallback " + action);
    }
    switch (action) {
      default:
    }
  }
}

export default withTranslation()(Home);