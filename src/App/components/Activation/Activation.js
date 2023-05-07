import React from "react";
import { withTranslation } from "react-i18next";
import { Box, Typography, Button, CircularProgress } from "@mui/material";

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt.js";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied.js";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline.js";

// Components

// Services
import apiActivate from "./services/apiActivate.js";

// Shared
import Appbar from "../../shared/components/Appbar/Appbar.js";

class Activation extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Activation.constructor");
    }
    super(props);
    this.state = {
      outcome: "inprogress",
    };

    // Helpers
    this.activateAccount = this.activateAccount.bind(this);

    // Handles
    this.handleAppbarCallback = this.handleAppbarCallback.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Activation.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <Box>
        <Appbar
          signedin={this.props.signedin}
          callback={this.handleAppbarCallback}
          token={this.props.token}
          route="activation"
          title={t("generic-product-title")}
        />
        <Box sx={{ height: 48 }} />

        <Box hidden={this.state.outcome !== "inprogress"}>
          <Box
            sx={{
              m: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
              variant="h6"
              component="span"
            >
              {t("activation-label-inprogress")}
            </Typography>
            <CircularProgress sx={{ mt: 2, mb: 2 }} />
          </Box>
        </Box>

        <Box hidden={this.state.outcome !== "error"}>
          <Box
            sx={{
              m: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
              variant="h6"
              component="span"
            >
              {t("activation-label-error")}
            </Typography>
            <ErrorOutlineIcon
              sx={{ mt: 2, mb: 2 }}
              fontSize="large"
              color="error"
            />
            <Typography
              sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
              variant="body1"
              component="span"
            >
              {t("activation-label-errorexplanation")}
            </Typography>
          </Box>
        </Box>

        <Box hidden={this.state.outcome !== "activated"}>
          <Box
            sx={{
              m: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
              variant="h6"
              component="span"
            >
              {t("activation-label-activatedtitle")}
            </Typography>
            <SentimentSatisfiedAltIcon
              sx={{ mt: 2, mb: 2 }}
              fontSize="large"
              color="success"
            />
            <Typography
              sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
              variant="body1"
              component="span"
            >
              {t("activation-label-activatedaccountexplanations")}
            </Typography>
            <Button
              variant="outlined"
              sx={{ width: "80%", m: 1 }}
              onClick={() => {
                window.location = "/";
              }}
            >
              {t("activation-button-tohome")}
            </Button>
          </Box>
        </Box>

        <Box hidden={this.state.outcome !== "notfound"}>
          <Box
            sx={{
              m: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
              variant="h6"
              component="span"
            >
              {t("activation-label-notfoundtitle")}
            </Typography>
            <SentimentVeryDissatisfiedIcon
              sx={{ mt: 2, mb: 2 }}
              fontSize="large"
              color="error"
            />
            <Typography
              sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
              variant="body1"
              component="span"
            >
              {t("activation-label-notfoundaccountexplanations")}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Activation.componentDidMount");
    }
    this.activateAccount();
  }

  // Helpers
  activateAccount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Activation.activateAccount ");
    }
    let regToken = window.location.href.split("/activation/")[1];
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Activation regToken " + regToken);
    }
    apiActivate(regToken).then((data) => {
      //console.log("Activation data ");
      //console.log(data);
      this.setState((prevState, props) => ({
        outcome: data.outcome,
      }));
    });
  }

  // Handles
  handleAppbarCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Activation.handleTableCallback " + action);
    }
    switch (action) {
      default:
    }
  }
}

export default withTranslation()(Activation);
