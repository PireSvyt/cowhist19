import React from "react";
import { withTranslation } from "react-i18next";
import { Paper, Button, Typography, Box } from "@mui/material";

// Shared
import Appbar from "../../shared/components/Appbar/Appbar.js";
import ToComeModal from "../../shared/components/ToComeModal/ToComeModal.js";

class Account extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Account.constructor");
    }
    super(props);
    this.state = {
      showToComeModal: false,
    };

    // Handles
    this.handleAppbarCallback = this.handleAppbarCallback.bind(this);
    this.handleOpenToComeModal = this.handleOpenToComeModal.bind(this);
    this.handleToComeModalCallback = this.handleToComeModalCallback.bind(this);
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
        <Box component="span">
          <Paper
            sx={{
              p: 2,
              g: 2,
              m: 2,
            }}
          >
            <Box>
              <Typography variant="h5" gutterBottom>
                {t("account-label-infos")}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  pt: 1,
                }}
              >
                {t("account-label-pseudo")}
              </Typography>
              <Box textAlign="center">
                <Typography variant="body1" gutterBottom>
                  {this.props.user !== undefined
                    ? this.props.user.pseudo
                    : "pseudo place holder"}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    width: "80%",
                    m: 1,
                  }}
                  onClick={this.handleOpenToComeModal}
                >
                  {t("account-button-changepseudo")}
                </Button>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  pt: 1,
                }}
              >
                {t("account-label-email")}
              </Typography>
              <Box textAlign="center">
                <Typography variant="body1" gutterBottom>
                  {this.props.user !== undefined
                    ? this.props.user.login
                    : "email place holder"}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    width: "80%",
                    m: 1,
                  }}
                  onClick={this.handleOpenToComeModal}
                >
                  {t("account-button-changeemail")}
                </Button>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  pt: 1,
                }}
              >
                {t("account-label-password")}
              </Typography>
              <Box textAlign="center">
                <Button
                  variant="outlined"
                  sx={{
                    width: "80%",
                    m: 1,
                  }}
                  onClick={this.handleOpenToComeModal}
                >
                  {t("account-button-changepassword")}
                </Button>
              </Box>
            </Box>
          </Paper>
          <Paper
            sx={{
              p: 2,
              g: 2,
              m: 2,
            }}
          >
            <Box>
              <Typography variant="h5" gutterBottom>
                {t("account-label-account")}{" "}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  pt: 1,
                }}
              >
                {t("account-label-merge")}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {t("account-details-merge")}
              </Typography>
              <Box textAlign="center">
                <Button
                  color="error"
                  variant="outlined"
                  sx={{
                    width: "80%",
                    m: 1,
                  }}
                  onClick={this.handleOpenToComeModal}
                >
                  {t("account-button-merge")}
                </Button>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  pt: 1,
                }}
              >
                {t("account-label-anonymize")}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {t("account-details-anonymize")}
              </Typography>
              <Box textAlign="center">
                <Button
                  color="error"
                  variant="outlined"
                  sx={{
                    width: "80%",
                    m: 1,
                  }}
                  onClick={this.handleOpenToComeModal}
                >
                  {t("account-button-anonymize")}
                </Button>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  pt: 1,
                }}
              >
                {t("account-label-close")}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {t("account-details-close")}
              </Typography>
              <Box textAlign="center">
                <Button
                  color="error"
                  variant="outlined"
                  sx={{
                    width: "80%",
                    m: 1,
                  }}
                  onClick={this.handleOpenToComeModal}
                >
                  {t("account-button-close")}
                </Button>
              </Box>
            </Box>
          </Paper>
          <ToComeModal
            open={this.state.showToComeModal}
            callback={this.handleToComeModalCallback}
          />
        </Box>
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
  handleOpenToComeModal() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Account.handleOpenToComeModal");
    }
    this.setState((prevState, props) => ({
      showToComeModal: true,
    }));
  }
  handleToComeModalCallback(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Account.handleToComeModalCallback " + action);
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

export default withTranslation()(Account);
