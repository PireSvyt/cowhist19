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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

// Services
import serviceCanInvite from "./services/serviceCanInvite.js";
import serviceInvite from "./services/serviceInvite.js";

// Shared
import Snack from "../../../Snack/Snack.js";
import { random_id } from "../../../../services/toolkit.js";
import emptyUser from "../../../../resources/emptyUser.js";
import serviceModalChange from "../../../../services/serviceModalChange.js";

class InviteModal extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("InviteModal.constructor");
    }
    super(props);
    this.state = {
      user: { ...emptyUser },
      pseudoError: false,
      loginError: false,
      acknowledgementError: false,
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
      console.log("InviteModal.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <Box>
        <Dialog
          id="dialog_invite"
          open={this.props.open}
          onClose={this.handleClose}
          fullWidth={true}
        >
          <DialogTitle>{t("invite-title")}</DialogTitle>
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
                label={t("generic-input-pseudo")}
                variant="standard"
                value={this.state.user.pseudo || ""}
                onChange={this.handleChange}
                autoComplete="off"
                sx={{ mb: 1 }}
                required
                error={this.state.pseudoError}
              />
              <TextField
                name="login"
                label={t("generic-input-email")}
                variant="standard"
                value={this.state.user.login || ""}
                onChange={this.handleChange}
                autoComplete="off"
                sx={{ mb: 1 }}
                required
                error={this.state.loginError}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="acknowledgement"
                    checked={this.state.user.acknowledgement}
                    onChange={this.handleChange}
                    required
                  />
                }
                label={t("invite-input-acknowledgement")}
                error={this.state.acknowledgementError ? "dummy" : null}
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
              {t("invite-button-invite")}
            </LoadingButton>
          </DialogActions>
        </Dialog>

        <Snack
          open={this.state.openSnack}
          snack={this.state.snack}
          callback={this.handleSnack}
          language={this.props.language}
        />
      </Box>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("InviteModal.componentDidMount");
    }
    this.setState({
      componentHeight: window.innerHeight - 115,
    });
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("InviteModal.componentDidUpdate");
    }
    if (prevState.open !== this.props.open) {
      this.setState((prevState, props) => ({
        user: { ...emptyUser },
      }));
    }
  }

  // handleCloseMenu
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("InviteModal.handleClose");
    }

    this.setState((prevState, props) => ({
      user: { ...emptyUser },
      pseudoError: false,
      loginError: false,
      acknowledgementError: false,
    }));

    this.props.callback("close");
  }
  handleChange(event, newValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("InviteModal.handleChange");
    }
    let serviceChangeOutcome = serviceModalChange(
      event.target,
      this.state.user
    );
    if (serviceChangeOutcome.errors.length > 0) {
      console.log("serviceModalChange errors");
      console.log(serviceChangeOutcome.errors);
    } else {
      serviceChangeOutcome.stateChanges.user = serviceChangeOutcome.newValue;
      this.setState((prevState, props) => serviceChangeOutcome.stateChanges);
    }
  }
  handleProceed() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("InviteModal.handleProceed");
    }

    // Check inputs
    let canProceedOutcome = serviceCanInvite(this.state.user);
    if (canProceedOutcome.errors.length !== 0) {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("serviceCanInvite errors");
        console.log(canProceedOutcome.errors);
      }
    }
    this.setState((prevState, props) => canProceedOutcome.stateChanges);

    // Proceed or not?
    if (canProceedOutcome.proceed === true) {
      this.setState((prevState, props) => ({
        disabled: true,
        loading: true,
      }));

      serviceInvite(this.props.token, this.state.user).then(
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
            id: "generic-snack-error",
            details: proceedCheckOutcome.errors,
          },
        }));
      }
    }
  }
  handleSnack(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("InviteModal.handleSnack " + action);
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

export default withTranslation()(InviteModal);
