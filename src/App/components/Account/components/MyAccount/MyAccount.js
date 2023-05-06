import React from "react";
import { withTranslation } from "react-i18next";
import { Paper, Button, Typography, Box } from "@mui/material";

// Shared
import ToComeModal from "../../../../shared/components/ToComeModal/ToComeModal";

class MyAccount extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyAccount.constructor");
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
      console.log("MyAccount.render");
    }
    // i18n
    const { t } = this.props;

    return (
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
              {t("myaccount-label-infos")}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                pt: 1,
              }}
            >
              {t("myaccount-label-pseudo")}
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
                {t("myaccount-button-changepseudo")}
              </Button>
            </Box>

            <Typography
              variant="h6"
              sx={{
                pt: 1,
              }}
            >
              {t("myaccount-label-email")}
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
                {t("myaccount-button-changeemail")}
              </Button>
            </Box>

            <Typography
              variant="h6"
              sx={{
                pt: 1,
              }}
            >
              {t("myaccount-label-password")}
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
                {t("myaccount-button-changepassword")}
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
              {t("myaccount-label-account")}{" "}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                pt: 1,
              }}
            >
              {t("myaccount-label-merge")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("myaccount-details-merge")}
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
                {t("myaccount-button-merge")}
              </Button>
            </Box>

            <Typography
              variant="h6"
              sx={{
                pt: 1,
              }}
            >
              {t("myaccount-label-anonymize")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("myaccount-details-anonymize")}
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
                {t("myaccount-button-anonymize")}
              </Button>
            </Box>

            <Typography
              variant="h6"
              sx={{
                pt: 1,
              }}
            >
              {t("myaccount-label-close")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("myaccount-details-close")}
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
                {t("myaccount-button-close")}
              </Button>
            </Box>
          </Box>
        </Paper>
        <ToComeModal
          open={this.state.showToComeModal}
          callback={this.handleToComeModalCallback}
        />
      </Box>
    );
  }

  // Handles
  handleOpenToComeModal() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyAccount.handleOpenToComeModal");
    }
    this.setState((prevState, props) => ({
      showToComeModal: true,
    }));
  }
  handleToComeModalCallback(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyAccount.handleToComeModalCallback " + action);
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

export default withTranslation()(MyAccount);