import React from "react";
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
  FormControl,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

// Services
import serviceProceed from "./services/serviceProceed.js";
// Shared
import serviceModalChange from "../../../../../../shared/services/serviceModalChange.js";
import { random_id } from "../../../../../../shared/services/toolkit.js";
// Reducers
import appStore from "../../../../../../store/appStore.js";
import sliceSignInModal from "../../../../../../store/sliceSignInModal.js";

export default function SignInModal() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("SignInModal");
  }
  // i18n
  const { t } = useTranslation();

  // Constants
  const componentHeight = window.innerHeight - 115;

  // Selects
  const select = {
    open: useSelector((state) => state.sliceSignInModal.open),
    inputs: useSelector((state) => state.sliceSignInModal.inputs),
    errors: useSelector((state) => state.sliceSignInModal.errors),
    disabled: useSelector((state) => state.sliceSignInModal.disabled),
    loading: useSelector((state) => state.sliceSignInModal.loading),
    snackData: useSelector((state) => state.sliceSignInModal.snackData),
  };
  // Changes
  const changes = {
    login: (e) => {
      appStore.dispatch({
        type: "sliceSignInModal/change",
        payload: {
          inputs: { login: e.target.value },
          errors: { login: false },
        },
      });
    },
    password: (e) => {
      appStore.dispatch({
        type: "sliceSignInModal/change",
        payload: {
          inputs: { password: e.target.value },
          errors: { password: false },
        },
      });
    },
  };

  // Render
  return (
    <Box>
      <Dialog
        data-testid="componentSignInModal"
        id="dialog_signin"
        open={select.open}
        onClose={() => {
          appStore.dispatch({ type: "sliceSignInModal/close" });
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
            <FormControl>
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
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            data-testid="buttonClose"
            onClick={() => {
              appStore.dispatch({ type: "sliceSignInModal/close" });
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
