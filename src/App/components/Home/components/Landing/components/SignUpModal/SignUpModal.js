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
import emptySignup from "./resources/emptySignUp.js";

// Services
//import apiSignUp from "./services/apiSignUp.js";
import serviceCanSignUp from "./services/serviceCanSignUp.js";
import serviceChange from "./services/serviceChange.js";
import serviceSignUp from "./services/serviceSignUp.js";

// Shared
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
      repeatPasswordError: false,
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
                name="password1"
                required
                label={t("generic-input-password")}
                variant="standard"
                value={this.state.signup.password1 || ""}
                onChange={this.handleChange}
                autoComplete="off"
                type="password"
                error={this.state.passwordError}
              />
              <TextField
                name="password2"
                required
                label={t("signup-input-repeatpassword")}
                variant="standard"
                value={this.state.signup.password2 || ""}
                onChange={this.handleChange}
                autoComplete="off"
                type="password"
                error={this.state.repeatPasswordError}
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
      repeatPasswordError: false,
    }));

    this.props.callback("close");
  }
  handleChange(event, newValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignUpModal.handleChange");
    }
    let serviceChangeOutcome = serviceChange(event.target, this.state.signup);
    if (serviceChangeOutcome.errors.length > 0) {
      console.log("serviceChange errors");
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
    if (canProceedOutcome.errors.length === 0) {
      this.setState((prevState, props) => canProceedOutcome.stateChanges);
    } else {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("serviceCanSignUp errors");
        console.log(canProceedOutcome.errors);
      }
    }

    // Post or publish
    if (canProceedOutcome.proceed === true) {
      this.setState((prevState, props) => ({
        disabled: true,
        loading: true,
      }));

      let serviceSignUpOutcome = serviceSignUp(this.state.signup);
      if (serviceSignUpOutcome.errors.length !== 0) {
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("serviceSignUp errors");
          console.log(serviceSignUpOutcome.errors);
        }
      }
      this.setState((prevState, props) => serviceSignUpOutcome.stateChanges);
      serviceSignUpOutcome.callbacks.forEach((callback) => {
        this.props.callback(callback);
      });

      /*
      // Prep
      let user = this.state.signup;
      user.password = user.password1;
      delete user.password1;
      delete user.password2;
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("user ");
        console.log(user);
      }
      // API call
      apiSignUp(user).then((res) => {
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("res ");
          console.log(res);
        }
        switch (res.status) {
          case 201:
            //console.log("default");
            this.setState({
              signup: emptySignup,
              openSnack: true,
              snack: { uid: random_id(), id: "signup-snack-success" },
            });
            this.props.callback("close");
            this.setState((prevState, props) => ({
              disabled: false,
              loading: false,
            }));
            break;
          case 409:
            //console.log("modified");
            this.setState((prevState, props) => ({
              openSnack: true,
              snack: { uid: random_id(), id: "signup-snack-existinguser" },
              disabled: false,
              loading: false,
            }));
            break;
          case 400:
            //console.log("error");
            //console.log(res);
            this.setState({
              openSnack: true,
              snack: { uid: random_id(), id: "generic-snack-errornetwork" },
              disabled: false,
              loading: false,
            });
            break;
          default:
            //console.log("default");
            this.setState((prevState, props) => ({
              openSnack: true,
              snack: { uid: random_id(), id: "generic-snack-errorunknown" },
              disabled: false,
              loading: false,
            }));
        }
      });
      */
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
