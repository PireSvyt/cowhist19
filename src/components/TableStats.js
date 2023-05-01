import * as React from "react";
import { withTranslation } from "react-i18next";
import { Typography, Box, Button } from "@mui/material";

import ToComeModal from "../components/ToComeModal";

class TableStats extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableStats.constructor");
    }
    super(props);
    this.state = {
      showToComeModal: false,
    };
    // Handles
    this.handleToComeModalOpen = this.handleToComeModalOpen.bind(this);
    this.handleToComeModalCallback = this.handleToComeModalCallback.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableStats.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <Box
        sx={{
          m: 2,
        }}
      >
        <Box
          textAlign="center"
          sx={{
            m: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: "80%",
              m: 1,
            }}
            onClick={this.handleToComeModalOpen}
          >
            {t("generic-label-tocome")}
          </Button>
        </Box>
        <ToComeModal
          open={this.state.showToComeModal}
          callback={this.handleToComeModalCallback}
        />
      </Box>
    );
  }

  // Handlers
  handleToComeModalOpen() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableStats.handleToComeModalOpen");
    }
    this.setState((prevState, props) => ({
      showToComeModal: true,
    }));
  }
  handleToComeModalCallback(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableStats.handleToComeModalCallback " + action);
    }
    switch (action) {
      case "close":
        this.setState((prevState, props) => ({
          showToComeModal: false,
        }));
        break;
      default:
    }
  }
}

export default withTranslation()(TableStats);
