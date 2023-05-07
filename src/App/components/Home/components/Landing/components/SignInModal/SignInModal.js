import * as React from "react";
import Cookies from "js-cookie";
import { withTranslation } from "react-i18next";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

// Services
import apiSignIn from "./services/apiSignIn.js";

// Shared
import Snack from "../../../../../../shared/components/Snack/Snack.js";
import {
  random_id,
  validateEmail,
} from "../../../../../../shared/services/toolkit.js";

let emptySignin = {
  login: "",
  password: "",
};

class SignInModal extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignInModal.constructor");
    }
    super(props);
    this.state = {
      signin: { ...emptySignin },
      loginError: false,
      passwordError: false,
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
      console.log("SignInModal.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <Box>
        <Dialog
          id="dialog_signin"
          open={this.props.open}
          onClose={this.handleClose}
          fullWidth={true}
        >
          <DialogTitle>{t("signin-title")}</DialogTitle>
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
              <FormControl>
                <TextField
                  name="login"
                  required
                  label={t("generic-input-email")}
                  variant="standard"
                  value={this.state.signin.login || ""}
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
                  value={this.state.signin.password || ""}
                  onChange={this.handleChange}
                  autoComplete="off"
                  type="password"
                  error={this.state.passwordError}
                />
              </FormControl>
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
      //console.log("SignInModal.componentDidMount");
    }
    this.updateComponentHeight();
  }

  // Updates
  updateComponentHeight() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignInModal.updateComponentHeight");
    }
    this.setState({
      componentHeight: window.innerHeight - 115,
    });
  }

  // Helpers
  canProceed() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignInModal.canProceed");
    }
    let proceed = true;
    let errors = [];

    // Checks

    // Login is empty?
    if (this.state.signin.login === "") {
      proceed = false;
      errors.push("signin-error-missinglogin");
      this.setState((prevState, props) => ({
        loginError: true,
      }));
    } else {
      // Login is an email?
      if (!validateEmail(this.state.signin.login)) {
        proceed = false;
        errors.push("signin-error-invalidlogin");
        this.setState((prevState, props) => ({
          loginError: true,
        }));
      }
    }

    // Password is empty?
    if (this.state.signin.password === "") {
      proceed = false;
      errors.push("signin-error-missingpassword");
      this.setState((prevState, props) => ({
        passwordError: true,
      }));
    }

    // Outcome
    /*if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("proceed " + proceed);
    }*/
    return {
      proceed: proceed,
      errors: errors,
    };
  }

  // Handles
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignInModal.handleClose");
    }

    this.setState((prevState, props) => ({
      signin: { ...emptySignin },
      loginError: false,
      passwordError: false,
    }));

    this.props.callback("close");
  }
  handleChange(event, newValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignInModal.handleChange");
    }

    const target = event.target;
    /*if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("target.name : " + target.name);
      console.log("target.value : " + target.value);
      console.log("newValue : " + newValue);
    }*/
    var previousSignin = this.state.signin;
    switch (target.name) {
      case "login":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change login : " + target.value);
        }
        this.setState((prevState, props) => ({
          loginError: false,
        }));
        previousSignin.login = target.value;
        break;
      case "password":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change password : " + target.value);
        }
        this.setState((prevState, props) => ({
          passwordError: false,
        }));
        previousSignin.password = target.value;
        break;
      default:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("/!\\ no match : " + target.name);
        }
    }
    // Update
    /*if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignInModal.signin");
      console.log(this.state.signin);
    }*/
    // Check inputs
    this.setState((prevState, props) => ({
      signin: previousSignin,
    }));
  }
  handleProceed() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignInModal.handleProceed");
      /*console.log("this.state.signin");
      console.log(this.state.signin);*/
    }

    // Check inputs
    let canProceedOutcome = this.canProceed();

    // Proceed or not?
    if (!canProceedOutcome.proceed && process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("tcanProceedOutcome.errors");
      console.log(canProceedOutcome.errors);
    }
    // Post or publish
    if (canProceedOutcome.proceed === true) {
      this.setState((prevState, props) => ({
        disabled: true,
        loading: true,
      }));
      // API call
      apiSignIn(this.state.signin).then((res) => {
        /*if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("res ");
          console.log(res);
        }*/
        switch (res.status) {
          case 200:
            this.setState({
              signin: emptySignin,
              //openSnack: true,
              //snack: { uid: random_id(), id: "signin-snack-success" },
            });
            // Store token
            // https://medium.com/how-to-react/how-to-use-js-cookie-to-store-data-in-cookies-in-react-js-aab47f8a45c3
            Cookies.set("cowhist19-token", res.token);
            // Close modal
            this.props.callback("close");
            this.props.callback("signedin", res.token);
            this.setState((prevState, props) => ({
              disabled: false,
              loading: false,
            }));
            break;
          case 401:
            this.setState((prevState, props) => ({
              openSnack: true,
              snack: { uid: random_id(), id: "signin-snack-unauthorized" },
              disabled: false,
              loading: false,
            }));
            break;
          case 404:
            this.setState((prevState, props) => ({
              openSnack: true,
              snack: { uid: random_id(), id: "signin-snack-notfound" },
              disabled: false,
              loading: false,
            }));
            break;
          case 400:
            this.setState({
              openSnack: true,
              snack: { uid: random_id(), id: "generic-snack-errornetwork" },
              disabled: false,
              loading: false,
            });
            break;
          default:
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
      console.log("SignInModal.handleSnack " + action);
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

export default withTranslation()(SignInModal);
