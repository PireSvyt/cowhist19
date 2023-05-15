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
          signedin={this.props.signedin}
          callback={this.handleAppbarCallback}
          token={this.props.token}
          route="home"
          title={t("generic.label.help")}
        />
        <Box sx={{ height: 48 }} />
      </Box>
    );
  }

  // Handles
}

export default withTranslation()(Help);
