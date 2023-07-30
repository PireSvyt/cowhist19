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
import serviceProceed from "./Invite.service.js";
// Shared
//import serviceExistingPseudo 
// Reducers
import appStore from "../../../store/appStore.js";

export default function Invite() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("Invite");
  }
  // i18n
  const { t } = useTranslation();

  // Selects
  const select = {
    open: useSelector((state) => state.sliceInvite.open),
    inputs: useSelector((state) => state.sliceInvite.inputs),
    errors: useSelector((state) => state.sliceInvite.errors),
    disabled: useSelector((state) => state.sliceInvite.disabled),
    loading: useSelector((state) => state.sliceInvite.loading),
  };

  // Changes
  const changes = {
    pseudo: (e) => {
      appStore.dispatch({
        type: "sliceInvite/change",
        payload: {
          inputs: { pseudo: e.target.value },
          errors: { pseudo: false },
        },
      });
      // Check pseudo existance
      // serviceExistingPseudo({ pseudo : e.target.value})
      // TODO error on create but not typing
    },
    login: (e) => {
      appStore.dispatch({
        type: "sliceInvite/change",
        payload: {
          inputs: { login: e.target.value },
          errors: { login: false },
        },
      });
    },
    acknowledgement: (e) => {
      appStore.dispatch({
        type: "sliceInvite/change",
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
        open={select.open}
        onClose={() => {
          appStore.dispatch({ type: "sliceInvite/close" });
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
              error={select.errors.pseudo || select.errors.existingpseudo}              
              helperText={ select.errors.existingpseudo ? (t("signup.error.existingpseudo")) : (null) }
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
              error={select.errors.acknowledgement ? "error" : null}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              appStore.dispatch({ type: "sliceInvite/close" });
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
