import React from "react";
import { withTranslation } from "react-i18next";
//import jwt from "jsonwebtoken";
import { Paper, Button, Typography, Box } from "@mui/material";

import ToComeModal from "../components/ToComeModal";

let emptyAccount = {
  pseudo: "",
  email: "",
};

class MyAccount extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyAccount.constructor");
    }
    super(props);
    this.state = {
      showToComeModal: false,
      token: emptyAccount,
    };

    // Handles
    this.handleToComeModalOpen = this.handleToComeModalOpen.bind(this);
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
                {this.state.token.pseudo}
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  width: "80%",
                  m: 1,
                }}
                onClick={this.handleToComeModalOpen}
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
                {this.state.token.login}
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  width: "80%",
                  m: 1,
                }}
                onClick={this.handleToComeModalOpen}
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
                onClick={this.handleToComeModalOpen}
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
                variant="outlined"
                sx={{
                  width: "80%",
                  m: 1,
                }}
                onClick={this.handleToComeModalOpen}
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
                variant="outlined"
                sx={{
                  width: "80%",
                  m: 1,
                }}
                onClick={this.handleToComeModalOpen}
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
                variant="outlined"
                sx={{
                  width: "80%",
                  m: 1,
                }}
                onClick={this.handleToComeModalOpen}
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
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyAccount.componentDidUpdate");
    }
    /*
    let token = jwt.decode(this.props.token);
    if (token !== undefined && token !== null) {
      this.setState((prevState, props) => ({
        token: token,
      }));
    }
    */
  }

  // Handles
  handleToComeModalOpen() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyAccount.handleToComeModalOpen");
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
