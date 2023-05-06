import * as React from "react";
import { withTranslation } from "react-i18next";
import { Typography, Box, Button } from "@mui/material";

// Shared
import ToComeModal from "../../../../shared/components/ToComeModal/ToComeModal";

class MyStats extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyStats.constructor");
    }
    super(props);
    this.state = {
      showToComeModal: false,
    };
    // Handles
    this.handleOpenToComeModal = this.handleOpenToComeModal.bind(this);
    this.handleToComeModalCallback = this.handleToComeModalCallback.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyStats.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <Box sx={{ m: 2 }}>
        <Typography variant="h6" component="span">
          {t("mystats-label-mystats")}
        </Typography>

        <Box textAlign="center" sx={{ m: 2 }}>
          <Button
            variant="outlined"
            sx={{ width: "80%", m: 1 }}
            onClick={this.handleOpenToComeModal}
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
  handleOpenToComeModal() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyStats.handleOpenToComeModal");
    }
    this.setState((prevState, props) => ({
      showToComeModal: true,
    }));
  }
  handleToComeModalCallback(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyStats.handleToComeModalCallback " + action);
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

export default withTranslation()(MyStats);
