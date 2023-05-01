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

import { apiUserInvite } from "../api/user";
import Snack from "./Snack";
import { random_id } from "../resources/toolkit";

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
      disabled: true,
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
              />
              <TextField
                name="login"
                label={t("generic-input-email")}
                variant="standard"
                value={this.state.user.login || ""}
                onChange={this.handleChange}
                autoComplete="off"
                sx={{ mb: 1 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="acknowledgement"
                    checked={this.state.user.acknowledgement}
                    onChange={this.handleChange}
                  />
                }
                label={t("invite-input-acknowledgement")}
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
    if (this.state.user.pseudo === undefined || this.state.user.pseudo === "") {
      proceed = false;
      errors.push(" Pseudo undefined");
    }
    if (this.state.user.login === undefined || this.state.user.login === "") {
      proceed = false;
      errors.push(" Email undefined");
    }
    if (this.state.user.acknowledgement !== true) {
      proceed = false;
      errors.push(" Acknowledgement missing");
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
        previousUser.pseudo = target.value;
        break;
      case "login":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change login : " + target.value);
        }
        previousUser.login = target.value;
        break;
      case "acknowledgement":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change acknowledgement : " + target.checked);
        }
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
    let { proceed, errors } = this.canProceed();
    if (proceed === true) {
      this.setState((prevState, props) => ({
        user: previousUser,
        disabled: false,
      }));
    } else {
      this.setState((prevState, props) => ({
        user: previousUser,
        disabled: true,
      }));
    }
  }
  handleProceed() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("InviteModal.handleProceed");
      //console.log("this.state.user");
      //console.log(this.state.user);
    }

    // Check inputs
    let { proceed, errors } = this.canProceed();

    // Proceed or not?
    /*if (errors !== [] && process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("this.state.user errors");
      console.log(errors);
    }*/
    // Post or publish
    if (proceed === true) {
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
        snack: { uid: random_id(), id: "generic-snack-error", details: errors },
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
