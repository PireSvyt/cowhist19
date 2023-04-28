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

import { apiAuthSignup } from "../api/auth";
import Snack from "./Snack";
import { random_id } from "../resources/toolkit";

let emptySignup = {
  name: undefined,
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
      disabled: true,
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
      <div>
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
                name="name"
                label={t("generic-input-pseudo")}
                variant="standard"
                value={this.state.signup.name || ""}
                onChange={this.handleChange}
                autoComplete="off"
              />
              <TextField
                name="login"
                label={t("generic-input-email")}
                variant="standard"
                value={this.state.signup.login || ""}
                onChange={this.handleChange}
                autoComplete="off"
              />
              <TextField
                name="password1"
                label={t("generic-input-password")}
                variant="standard"
                value={this.state.signup.password1 || ""}
                onChange={this.handleChange}
                autoComplete="off"
                type="password"
              />
              <TextField
                name="password2"
                label={t("signup-input-repeatpassword")}
                variant="standard"
                value={this.state.signup.password2 || ""}
                onChange={this.handleChange}
                autoComplete="off"
                type="password"
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose}>
              {t("generic-button-close")}
            </Button>
            <Button
              variant="contained"
              onClick={this.handleProceed}
              disabled={this.state.disabled}
            >
              {t("generic-button-proceed")}
            </Button>
          </DialogActions>
        </Dialog>

        <Snack
          open={this.state.openSnack}
          snack={this.state.snack}
          callback={this.handleSnack}
          language={this.props.language}
        />
      </div>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("SignUpModal.componentDidMount");
    }
    this.updateComponentHeight();
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("SignUpModal.componentDidUpdate");
      //console.log("SignUpModal.state");
      //console.log(this.state);
    }
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
    let proceed = true;
    let errors = [];
    // Checks
    if (this.state.signup.name === undefined || this.state.signup.name === "") {
      proceed = false;
      errors.push(" Name undefined");
    }
    if (
      this.state.signup.login === undefined ||
      this.state.signup.login === ""
    ) {
      proceed = false;
      errors.push(" Login undefined");
    }
    if (
      this.state.signup.password1 === undefined ||
      this.state.signup.password1 === ""
    ) {
      proceed = false;
      errors.push(" Password 1 undefined");
    }
    if (
      this.state.signup.password2 === undefined ||
      this.state.signup.password2 === ""
    ) {
      proceed = false;
      errors.push(" Password 2 undefined");
    }
    if (this.state.signup.password1 !== this.state.signup.password2) {
      proceed = false;
      errors.push(" Password mismatch");
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
    // i18n
    const { t } = this.props;

    this.setState((prevState, props) => ({
      signup: { ...emptySignup },
    }));
    this.props.callback("closeItem");
  }
  handleChange(event, newValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignUpModal.handleChange");
    }

    const target = event.target;
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("target.name : " + target.name);
      console.log("target.value : " + target.value);
      console.log("newValue : " + newValue);
    }
    var previousSignup = this.state.signup;
    switch (target.name) {
      case "name":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change name : " + target.value);
        }
        previousSignup.name = target.value;
        break;
      case "login":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change login : " + target.value);
        }
        previousSignup.login = target.value;
        break;
      case "password1":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change password1 : " + target.value);
        }
        previousSignup.password1 = target.value;
        break;
      case "password2":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change password2 : " + target.value);
        }
        previousSignup.password2 = target.value;
        break;
      default:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("/!\\ no match : " + target.name);
        }
    }
    // Update
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignUpModal.game");
      console.log(this.state.signup);
    }
    // Check inputs
    let { proceed, errors } = this.canProceed();
    if (proceed === true) {
      this.setState((prevState, props) => ({
        signup: previousSignup,
        disabled: false,
      }));
    } else {
      this.setState((prevState, props) => ({
        signup: previousSignup,
        disabled: true,
      }));
    }
  }
  handleProceed() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignUpModal.handleProceed");
      console.log("this.state.signup");
      console.log(this.state.signup);
    }

    // Check inputs
    let { proceed, errors } = this.canProceed();

    // Proceed or not?
    if (errors !== [] && process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("this.state.signup errors");
      console.log(errors);
    }
    // Post or publish
    if (proceed === true) {
      this.setState((prevState, props) => ({
        disabled: true,
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
      apiAuthSignup(user).then((res) => {
        this.setState((prevState, props) => ({
          disabled: false,
        }));
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
            this.props.callback("closeItem");
            break;
          case 409:
            //console.log("modified");
            this.setState((prevState, props) => ({
              openSnack: true,
              snack: { uid: random_id(), id: "signup-snack-existinguser" },
            }));
            break;
          case 400:
            //console.log("error");
            //console.log(res);
            this.setState({
              openSnack: true,
              snack: { uid: random_id(), id: "generic-snack-errornetwork" },
            });
            break;
          default:
            //console.log("default");
            this.setState((prevState, props) => ({
              openSnack: true,
              snack: { uid: random_id(), id: "generic-snack-errorunknown" },
            }));
        }
      });
    } else {
      // Snack
      this.setState((prevState, props) => ({
        openSnack: true,
        snack: { uid: random_id(), id: "generic-snack-error", details: errors },
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
