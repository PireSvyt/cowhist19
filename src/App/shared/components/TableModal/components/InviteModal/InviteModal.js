import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
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
import serviceProceed from "./services/serviceProceed.js";
// Reducers
import appStore from "../../../../../store/appStore.js";

export default function InviteModal() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("InviteModal");
  }
  // i18n
  const { t } = useTranslation();

  // Selects
  const select = {
    open: useSelector((state) => state.sliceInviteModal.open),
    inputs: useSelector((state) => state.sliceInviteModal.inputs),
    errors: useSelector((state) => state.sliceInviteModal.errors),
    disabled: useSelector((state) => state.sliceInviteModal.disabled),
    loading: useSelector((state) => state.sliceInviteModal.loading),
  };

  // Changes
  const changes = {
    pseudo: (e) => {
      appStore.dispatch({
        type: "sliceInviteModal/change",
        payload: {
          inputs: { pseudo: e.target.value },
          errors: { pseudo: false },
        },
      });
    },
    login: (e) => {
      appStore.dispatch({
        type: "sliceInviteModal/change",
        payload: {
          inputs: { login: e.target.value },
          errors: { login: false },
        },
      });
    },
    acknowledgement: (e) => {
      appStore.dispatch({
        type: "sliceInviteModal/change",
        payload: {
          inputs: { acknowledgement: e.target.checked },
          errors: { acknowledgement: false },
        },
      });
    },
  };

  // Constants
  const componentHeight = window.innerHeight - 115;

  return (
    <Box>
      <Dialog
        id="dialog_invite"
        open={open}
        onClose={() => {
          appStore.dispatch({ type: "sliceInviteModal/close" });
        }}
        fullWidth={true}
      >
        <DialogTitle>{t("invite.label.title")}</DialogTitle>
        <DialogContent
          sx={{
            height: componentHeight,
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
              label={t("generic.input.pseudo")}
              variant="standard"
              value={select.inputs.pseudo || ""}
              onChange={changes.pseudo}
              autoComplete="off"
              sx={{ mb: 1 }}
              required
              error={select.errors.pseudo}
            />
            <TextField
              name="login"
              label={t("generic.input.email")}
              variant="standard"
              value={select.inputs.login || ""}
              onChange={changes.login}
              autoComplete="off"
              sx={{ mb: 1 }}
              required
              error={select.errors.login}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="acknowledgement"
                  checked={select.inputs.acknowledgement}
                  onChange={changes.acknowledgement}
                  required
                />
              }
              label={t("invite.input.acknowledgement")}
              error={select.errors.acknowledgement}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              appStore.dispatch({ type: "sliceInviteModal/close" });
            }}
          >
            {t("generic.button.cancel")}
          </Button>
          <LoadingButton
            variant="contained"
            onClick={serviceProceed}
            disabled={select.disabled}
            loading={select.loading}
          >
            {t("invite.button.invite")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

/*
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
    let proceedCheckOutcome = serviceProceedCheck(this.state.user);
    if (proceedCheckOutcome.errors.length !== 0) {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("proceedCheckOutcome errors");
        console.log(proceedCheckOutcome.errors);
      }
    }
    this.setState((prevState, props) => proceedCheckOutcome.stateChanges);

    // Proceed or not?
    if (proceedCheckOutcome.proceed === true) {
      this.setState((prevState, props) => ({
        disabled: true,
        loading: true,
      }));

      serviceProceed(this.state.user).then((proceedOutcome) => {
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
      });
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
}

export default withTranslation()(InviteModal);
*/
