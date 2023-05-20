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
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

// Services
import serviceProceed from "./services/serviceProceed.js";
// Shared
import serviceModalChange from "../../../../../../shared/services/serviceModalChange.js";
import { random_id } from "../../../../../../shared/services/toolkit.js";
// Reducers
import appStore from "../../../../../../store/appStore.js";
import sliceSignUp from "../../../../../../store/sliceSignUp.js";

export default function SignUpModal() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("SignUpModal");
  }
  // i18n
  const { t } = useTranslation();

  // Constants
  const componentHeight = window.innerHeight - 115;

  // Selects
  const select = {
    open: useSelector((state) => state.sliceSignUp.open),
    inputs: useSelector((state) => state.sliceSignUp.inputs),
    errors: useSelector((state) => state.sliceSignUp.errors),
    disabled: useSelector((state) => state.sliceSignUp.disabled),
    loading: useSelector((state) => state.sliceSignUp.loading),
    snackData: useSelector((state) => state.sliceSignUp.snackData),
  };
  // Changes
  const changes = {
    pseudo: (e) => {
      appStore.dispatch({
        type: "sliceSignUp/change",
        payload: {
          inputs: { pseudo: e.target.value },
          errors: { pseudo: false },
        },
      });
    },
    login: (e) => {
      appStore.dispatch({
        type: "sliceSignUp/change",
        payload: {
          inputs: { login: e.target.value },
          errors: { login: false },
        },
      });
    },
    password: (e) => {
      appStore.dispatch({
        type: "sliceSignUp/change",
        payload: {
          inputs: { password: e.target.value },
          errors: { password: false },
        },
      });
    },
    repeatpassword: (e) => {
      appStore.dispatch({
        type: "sliceSignUp/change",
        payload: {
          inputs: { repeatpassword: e.target.value },
          errors: { repeatpassword: false },
        },
      });
    },
  };

  // Render
  return (
    <Box>
      <Dialog
        data-testid="componentSignUpModal"
        id="dialog_signup"
        open={select.open === true}
        onClose={() => {
          appStore.dispatch({ type: "sliceSignUp/close" });
        }}
        fullWidth={true}
      >
        <DialogTitle>{t("signin.label.title")}</DialogTitle>
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
              data-testid="fieldPseudo"
              name="pseudo"
              required
              label={t("generic.input.pseudo")}
              variant="standard"
              value={select.inputs.pseudo || ""}
              onChange={changes.pseudo}
              autoComplete="off"
              error={select.errors.pseudo}
            />
            <TextField
              data-testid="fieldLogin"
              name="login"
              required
              label={t("generic.input.email")}
              variant="standard"
              value={select.inputs.login}
              onChange={changes.login}
              autoComplete="off"
              type="email"
              error={select.errors.login}
            />
            <TextField
              data-testid="fieldPassword"
              name="password"
              required
              label={t("generic.input.password")}
              variant="standard"
              value={select.inputs.password}
              onChange={changes.password}
              autoComplete="off"
              type="password"
              error={select.errors.password}
            />
            <TextField
              data-testid="fieldRepeatPassword"
              name="repeatpassword"
              required
              label={t("signup.input.repeatpassword")}
              variant="standard"
              value={select.inputs.repeatpassword || ""}
              onChange={changes.repeatpassword}
              autoComplete="off"
              type="password"
              error={select.errors.repeatpassword}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            data-testid="buttonClose"
            onClick={() => {
              appStore.dispatch({ type: "sliceSignUp/close" });
            }}
          >
            {t("generic.button.cancel")}
          </Button>
          <LoadingButton
            data-testid="buttonProceed"
            variant="contained"
            onClick={serviceProceed}
            disabled={select.disabled}
            loading={select.loading}
          >
            {t("generic.button.proceed")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
