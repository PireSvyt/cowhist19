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
import apiUserInvite from "./services/apiUserInvite";

// Shared
import Snack from "../../../Snack/Snack";
import { random_id, validateEmail } from "../../../../services/toolkit";

let emptyUser = {
  pseudo: undefined,
  login: undefined,
  acknowledgement: false,
};

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
                error={this.state.acknowledgementError === true}
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
    this.updateComponentHeight();
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

  // Updates
  updateComponentHeight() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("InviteModal.updateComponentHeight");
    }
    this.setState({
      componentHeight: window.innerHeight - 115,
    });
  }

  // Helpers
  canProceed() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("InviteModal.canProceed");
    }
    let proceed = true;
    let errors = [];

    // Checks

    // Is pseudo empty?
    if (this.state.user.pseudo === undefined || this.state.user.pseudo === "") {
      proceed = false;
      errors.push("invite-error-missingpseudo");
      this.setState((prevState, props) => ({
        pseudoError: true,
      }));
    }

    // Is email empty?
    if (this.state.user.login === undefined || this.state.user.login === "") {
      proceed = false;
      errors.push("invite-error-missinglogin");
      this.setState((prevState, props) => ({
        loginError: true,
      }));
    } else {
      // Login is an email?
      if (!validateEmail(this.state.user.login)) {
        proceed = false;
        errors.push("invite-error-invalidlogin");
        this.setState((prevState, props) => ({
          loginError: true,
        }));
      }
    }

    // Is it acknowledged?
    if (this.state.user.acknowledgement !== true) {
      proceed = false;
      errors.push("invite-error-missingacknowledgement");
      this.setState((prevState, props) => ({
        acknowledgementError: true,
      }));
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

    const target = event.target;
    /*if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("target.name : " + target.name);
      console.log("target.value : " + target.value);
      console.log("newValue : " + newValue);
    }*/
    var previousUser = this.state.user;
    switch (target.name) {
      case "pseudo":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change pseudo : " + target.value);
        }
        this.setState((prevState, props) => ({
          pseudoError: false,
        }));
        previousUser.pseudo = target.value;
        break;
      case "login":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change login : " + target.value);
        }
        this.setState((prevState, props) => ({
          loginError: false,
        }));
        previousUser.login = target.value;
        break;
      case "acknowledgement":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change acknowledgement : " + target.checked);
        }
        this.setState((prevState, props) => ({
          acknowledgementError: false,
        }));
        previousUser.acknowledgement = target.checked;
        break;
      default:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("/!\\ no match : " + target.name);
        }
    }
    // Update
    /*if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("InviteModal.user");
      console.log(this.state.user);
    }*/
    // Check inputs
    this.setState((prevState, props) => ({
      user: previousUser,
    }));
  }
  handleProceed() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("InviteModal.handleProceed");
      //console.log("this.state.user");
      //console.log(this.state.user);
    }

    // Check inputs
    let canProceedOutcome = this.canProceed();

    // Proceed or not?
    /*if (canProceedOutcome.errors !== [] && process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("canProceedOutcome.errors");
      console.log(canProceedOutcome.errors);
    }*/
    // Post or publish
    if (canProceedOutcome.proceed === true) {
      this.setState((prevState, props) => ({
        disabled: true,
        loading: true,
      }));
      // API call
      apiUserInvite(this.props.token, this.state.user).then((res) => {
        /*if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("res ");
          console.log(res);
        }*/
        switch (res.status) {
          case 201:
            // User creation
            this.setState({
              user: emptyUser,
              openSnack: true,
              snack: { uid: random_id(), id: "invite-snack-success" },
            });
            this.props.callback("useradd", res.user);
            this.setState((prevState, props) => ({
              disabled: false,
              loading: false,
            }));
            break;
          case 202:
            // User already existing
            this.setState({
              user: emptyUser,
              openSnack: true,
              snack: { uid: random_id(), id: "invite-snack-success" },
            });
            this.props.callback("useradd", res.user);
            this.setState((prevState, props) => ({
              disabled: false,
              loading: false,
            }));
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
