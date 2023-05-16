import React from "react";
import { withTranslation } from "react-i18next";
import { Box } from "@mui/material";

// Components
//import Documentation from "./components/Documentation/Documentation.js";
//import Howto from "./components/Howto/Howto.js";

// Shared
import Appbar from "../../shared/components/Appbar/Appbar.js";

class Help extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Help.constructor");
    }
    super(props);
    this.state = {};

    // Handles
    this.handleAppbarCallback = this.handleAppbarCallback.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Help.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <Box>
        <Appbar
          callback={this.handleAppbarCallback}
          route="home"
          title={t("generic.label.help")}
        />
        <Box sx={{ height: 48 }} />
      </Box>
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
}

export default withTranslation()(Help);
