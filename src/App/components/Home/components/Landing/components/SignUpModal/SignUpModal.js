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
import LoadingButton from "@mui/lab/LoadingButton";

// Services
import apiSignUp from "./services/apiSignUp";

// Shared
import Snack from "../../../../../../shared/components/Snack/Snack";
import { random_id, validateEmail } from "../../../../../../shared/services/toolkit";

let emptySignup = {
  pseudo: undefined,
  login: undefined,
  password1: undefined,
  password2: undefined,
};

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
    // Updates
    this.updateComponentHeight = this.updateComponentHeight.bind(this);

    // Handles
    this.canProceed = this.canProceed.bind(this);
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
    this.updateComponentHeight();
  }

  // Updates
  updateComponentHeight() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignUpModal.updateComponentHeight");
    }
    this.setState({
      componentHeight: window.innerHeight - 115,
    });
  }

  // Helpers
  canProceed() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignUpModal.canProceed");
    }
    var proceed = true;
    var errors = [];

    // Checks

    // Pseudo is empty?
    if (
      this.state.signup.pseudo === undefined ||
      this.state.signup.pseudo === ""
    ) {
      proceed = false;
      errors.push("signup-error-missingpseudo");
      this.setState((prevState, props) => ({
        pseudoError: true,
      }));
    }

    // Login is empty?
    if (
      this.state.signup.login === undefined ||
      this.state.signup.login === ""
    ) {
      proceed = false;
      errors.push("signup-error-missinglogin");
      this.setState((prevState, props) => ({
        loginError: true,
      }));
    } else {
      // Login is an email?
      if ( !validateEmail(this.state.signup.login) ) {
        proceed = false;
        errors.push("signup-error-invalidlogin");
        this.setState((prevState, props) => ({
          loginError: true,
        }));
      }
    }

    // Password is empty?
    if (
      this.state.signup.password1 === undefined ||
      this.state.signup.password1 === ""
    ) {
      proceed = false;
      errors.push("signup-error-missingpassword");
      this.setState((prevState, props) => ({
        passwordError: true,
      }));
    }
    
    // Repeated password is empty?
    if (
      this.state.signup.password2 === undefined ||
      this.state.signup.password2 === ""
    ) {
      proceed = false;
      errors.push("signup-error-missingrepeatpassword");
      this.setState((prevState, props) => ({
        repeatPasswordError: true,
      }));
    } else {
      // Password match?
      if (this.state.signup.password1 !== this.state.signup.password2) {
        proceed = false;
        errors.push("signup-error-passwordmissmatch");
        this.setState((prevState, props) => ({
          repeatPasswordError: true,
        }));
      }      
    }

    // Outcome
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("proceed " + proceed);
    }
    return {
      proceed: proceed,
      errors: errors,
    };
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

    const target = event.target;
    /*if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("target.name : " + target.name);
      console.log("target.value : " + target.value);
      console.log("newValue : " + newValue);
    }*/
    var previousSignup = this.state.signup;
    switch (target.name) {
      case "pseudo":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change pseudo : " + target.value);
        }
        this.setState((prevState, props) => ({
          pseudoError: false,
        }));
        previousSignup.pseudo = target.value;
        break;
      case "login":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change login : " + target.value);
        }
        this.setState((prevState, props) => ({
          loginError: false,
        }));
        previousSignup.login = target.value;
        break;
      case "password1":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change password1 : " + target.value);
        }
        this.setState((prevState, props) => ({
          passwordError: false,
        }));
        previousSignup.password1 = target.value;
        break;
      case "password2":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change password2 : " + target.value);
        }
        this.setState((prevState, props) => ({
          repeatPasswordError: false,
        }));
        previousSignup.password2 = target.value;
        break;
      default:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("/!\\ no match : " + target.name);
        }
    }
    // Update
    /*if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignUpModal.signup");
      console.log(this.state.signup);
    }*/
    // Check inputs
    this.setState((prevState, props) => ({
      signup: previousSignup
    }));
  }
  handleProceed() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignUpModal.handleProceed");
      //console.log("this.state.signup");
      //console.log(this.state.signup);
    }

    // Check inputs
    let canProceedOutcome = this.canProceed();

    // Proceed or not?
    if (!canProceedOutcome.proceed && process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("canProceedOutcome.errors");
      console.log(canProceedOutcome.errors);
    }
    // Post or publish
    if (canProceedOutcome.proceed === true) {
      this.setState((prevState, props) => ({
        disabled: true,
        loading: true,
      }));
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
    } else {
      // Snack
      this.setState((prevState, props) => ({
        openSnack: true,
        snack: { uid: random_id(), id: "generic-snack-error", details: canProceedOutcome.errors },
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
