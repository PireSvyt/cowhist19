import React from "react";
import { withTranslation } from "react-i18next";
import { Box } from "@mui/material";

// Components
import Landing from "./components/Landing/Landing.js";
import MyStats from "./components/MyStats/MyStats.js";
import MyTables from "./components/MyTables/MyTables.js";

// Shared
import Appbar from "../../shared/components/Appbar/Appbar.js";

class Home extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Home.constructor");
    }
    super(props);
    this.state = {};

    // Handles
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Home.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <div>
        <Appbar route="home" title={t("generic.label.product")} />
        <Box sx={{ height: 48 }} />
        <Landing />
        <MyStats />
        <MyTables />
      </div>
    );
  }

  // Handles
}

export default withTranslation()(Home);
