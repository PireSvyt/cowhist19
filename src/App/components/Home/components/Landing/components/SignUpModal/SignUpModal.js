import * as React from "react";
import { withTranslation } from "react-i18next";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

// Resources
import emptySignup from "../../../../../../shared/resources/emptySignUp.js";

// Services
//import apiSignUp from "./services/apiSignUp.js";
import serviceCanSignUp from "./services/serviceCanSignUp.js";
import serviceSignUp from "./services/serviceSignUp.js";

// Shared
import serviceModalChange from "../../../../../../shared/services/serviceModalChange.js";
import Snack from "../../../../../../shared/components/Snack/Snack.js";
import { random_id } from "../../../../../../shared/services/toolkit.js";

class SignUpModal extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignUpModal.constructor");
    }
    super(props);
    this.state = {
      signup: { ...emptySignup },
      pseudoError: false,
      loginError: false,
      passwordError: false,
      repeatpasswordError: false,
      disabled: false,
      loading: false,
      componentHeight: undefined,
      openSnack: false,
      snack: { id: undefined },
    };

    // Handles
    this.handleClose = this.handleClose.bind(this);
    this.handleProceed = this.handleProceed.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSnack = this.handleSnack.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignUpModal.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <Box>
        <Dialog
          id="dialog_signup"
          open={this.props.open}
          onClose={this.handleClose}
          fullWidth={true}
        >
          <DialogTitle>{t("signup-title")}</DialogTitle>
          <DialogContent
            sx={{
              height: this.state.componentHeight,
            }}
          >
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                name="pseudo"
                required
                label={t("generic-input-pseudo")}
                variant="standard"
                value={this.state.signup.pseudo || ""}
                onChange={this.handleChange}
                autoComplete="off"
                error={this.state.pseudoError}
              />
              <TextField
                name="login"
                required
                label={t("generic-input-email")}
                variant="standard"
                value={this.state.signup.login || ""}
                onChange={this.handleChange}
                autoComplete="off"
                type="email"
                error={this.state.loginError}
              />
              <TextField
                name="password"
                required
                label={t("generic-input-password")}
                variant="standard"
                value={this.state.signup.password || ""}
                onChange={this.handleChange}
                autoComplete="off"
                type="password"
                error={this.state.passwordError}
              />
              <TextField
                name="repeatpassword"
                required
                label={t("signup-input-repeatpassword")}
                variant="standard"
                value={this.state.signup.repeatpassword || ""}
                onChange={this.handleChange}
                autoComplete="off"
                type="password"
                error={this.state.repeatpasswordError}
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose}>
              {t("generic-button-cancel")}
            </Button>
            <LoadingButton
              variant="contained"
              onClick={this.handleProceed}
              disabled={this.state.disabled}
              loading={this.state.loading}
            >
              {t("generic-button-proceed")}
            </LoadingButton>
          </DialogActions>
        </Dialog>

        <Snack
          open={this.state.openSnack}
          snack={this.state.snack}
          callback={this.handleSnack}
        />
      </Box>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("SignUpModal.componentDidMount");
    }
    this.setState({
      componentHeight: window.innerHeight - 115,
    });
  }

  // Handles
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignUpModal.handleClose");
    }

    this.setState((prevState, props) => ({
      signup: { ...emptySignup },
      pseudoError: false,
      loginError: false,
      passwordError: false,
      repeatpasswordError: false,
    }));

    this.props.callback("close");
  }
  handleChange(event, newValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignUpModal.handleChange");
    }
    let serviceChangeOutcome = serviceModalChange(
      event.target,
      this.state.signup
    );
    if (serviceChangeOutcome.errors.length > 0) {
      console.log("serviceModalChange errors");
      console.log(serviceChangeOutcome.errors);
    } else {
      serviceChangeOutcome.stateChanges.signup = serviceChangeOutcome.newValue;
      this.setState((prevState, props) => serviceChangeOutcome.stateChanges);
    }
  }
  handleProceed() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignUpModal.handleProceed");
      //console.log("this.state.signup");
      //console.log(this.state.signup);
    }

    // Check inputs
    let canProceedOutcome = serviceCanSignUp(this.state.signup);
    if (canProceedOutcome.errors.length !== 0) {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("serviceCanSignUp errors");
        console.log(canProceedOutcome.errors);
      }
    }
    this.setState((prevState, props) => canProceedOutcome.stateChanges);

    // Post or publish
    if (canProceedOutcome.proceed === true) {
      this.setState((prevState, props) => ({
        disabled: true,
        loading: true,
      }));

      let proceedOutcome = serviceSignUp(this.state.signup);
      if (proceedOutcome.errors.length !== 0) {
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("proceedOutcome errors");
          console.log(proceedOutcome.errors);
        }
      }
      this.setState((prevState, props) => proceedOutcome.stateChanges);
      proceedOutcome.callbacks.forEach((callback) => {
        if (callback.option === undefined) {
          this.props.callback(callback.key);
        } else {
          this.props.callback(callback.key);
        }
        this.props.callback(callback.key, callback.option);
      });
    } else {
      // Snack
      this.setState((prevState, props) => ({
        openSnack: true,
        snack: {
          uid: random_id(),
          id: "generic-snack-error",
          details: canProceedOutcome.errors,
        },
      }));
    }
  }
  handleSnack(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignUpModal.handleSnack " + action);
    }
    switch (action) {
      case "close":
        this.setState((prevState, props) => ({
          openSnack: false,
        }));
        break;
      default:
    }
  }
}

export default withTranslation()(SignUpModal);
