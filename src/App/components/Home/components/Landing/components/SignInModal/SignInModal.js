import * as React from "react";
import { withTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
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

// Resources
import emptySignin from "../../../../../../shared/resources/emptySignIn";
// Services
import serviceSignInCheck from "./services/serviceSignInCheck.js";
import serviceSignIn from "./services/serviceSignIn.js";
// Shared
import serviceModalChange from "../../../../../../shared/services/serviceModalChange.js";
import Snack from "../../../../../../shared/components/Snack/Snack.js";
import { random_id } from "../../../../../../shared/services/toolkit.js";
// Reducers
import storeSignIn from "./store/storeSignIn.js";
import { selectSignInOpen, actionSignInClose } from "./store/sliceSignIn.js";

class SignInModal extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignInModal.constructor");
    }
    super(props);
    this.state = {
      componentHeight: undefined,
      openSnack: false,
      snack: { id: undefined },
    };

    // Handles
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
          open={useSelector(selectSignInOpen)}
          onClose={() => {
            storeSignIn.dispatch({
              type: "signIn/close",
            });
          }}
          fullWidth={true}
        >
          <DialogTitle>{t("signin.label.title")}</DialogTitle>
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
                  label={t("generic.input.email")}
                  variant="standard"
                  value={storeSignIn.getState().signIn.inputs.login || ""}
                  onChange={this.handleChange}
                  autoComplete="off"
                  type="email"
                  error={storeSignIn.getState().signIn.loginError}
                />
                <TextField
                  name="password"
                  required
                  label={t("generic.input.password")}
                  variant="standard"
                  value={storeSignIn.getState().signIn.inputs.password || ""}
                  onChange={this.handleChange}
                  autoComplete="off"
                  type="password"
                  error={storeSignIn.getState().signIn.passwordError}
                />
              </FormControl>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => {
                storeSignIn.dispatch({
                  type: "signIn/close",
                });
              }}
            >
              {t("generic.button.cancel")}
            </Button>
            <LoadingButton
              variant="contained"
              onClick={this.handleProceed}
              disabled={storeSignIn.getState().signIn.disabled}
              loading={storeSignIn.getState().signIn.loading}
            >
              {t("generic.button.proceed")}
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
    this.setState({
      componentHeight: window.innerHeight - 115,
    });
  }

  // Handles
  handleChange(event, newValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignInModal.handleChange");
    }
    let serviceChangeOutcome = serviceModalChange(
      event.target,
      storeSignIn.getState().signIn.inputs
    );
    if (serviceChangeOutcome.errors.length > 0) {
      console.log("serviceModalChange errors");
      console.log(serviceChangeOutcome.errors);
    } else {
      storeSignIn.dispatch({
        type: "signIn/change",
        payload: serviceChangeOutcome.payload,
      });
    }
  }
  handleProceed() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignInModal.handleProceed");
    }

    // Check inputs
    let proceedCheckOutcome = serviceSignInCheck(
      storeSignIn.getState().signIn.inputs
    );
    if (proceedCheckOutcome.errors.length > 0) {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("proceedCheckOutcome errors");
        console.log(proceedCheckOutcome.errors);
      }
    }

    this.setState((prevState, props) => proceedCheckOutcome.stateChanges);

    // Post or publish
    if (proceedCheckOutcome.proceed === true) {
      this.setState((prevState, props) => ({
        disabled: true,
        loading: true,
      }));

      serviceSignIn({ ...storeSignIn.getState().signIn.inputs }).then(
        (proceedOutcome) => {
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
              this.props.callback(callback.key, callback.option);
            }
          });
        }
      );
    } else {
      // Snack
      if (proceedCheckOutcome.errors.length > 0) {
        this.setState((prevState, props) => ({
          openSnack: true,
          snack: {
            uid: random_id(),
            id: "generic.snack.error.withdetails",
            details: proceedCheckOutcome.errors,
          },
        }));
      }
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
