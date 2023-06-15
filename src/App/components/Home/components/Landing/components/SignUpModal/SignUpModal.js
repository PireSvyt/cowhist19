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
  Link,
  Paper
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

// Services
import serviceProceed from "./services/serviceProceed.js";
// Shared
import serviceExistingPseudo from "../../../../../../shared/services/serviceExistingPseudo.js";
import { debounce } from "../../../../../../shared/services/toolkit.js";
// Reducers
import appStore from "../../../../../../store/appStore.js";

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
    open: useSelector((state) => state.sliceSignUpModal.open),
    inputs: useSelector((state) => state.sliceSignUpModal.inputs),
    errors: useSelector((state) => state.sliceSignUpModal.errors),
    disabled: useSelector((state) => state.sliceSignUpModal.disabled),
    loading: useSelector((state) => state.sliceSignUpModal.loading),
    snackData: useSelector((state) => state.sliceSignUpModal.snackData),
  };  

  // Debouncing
  const debouncedExistingPseudo = debounce((e) => serviceExistingPseudo({ pseudo : e.target.value}), 300)

  // Changes
  const changes = {
    pseudo: (e) => {
      appStore.dispatch({
        type: "sliceSignUpModal/change",
        payload: {
          inputs: { pseudo: e.target.value },
          errors: { pseudo: false },
        },
      });
      // Check pseudo existance
      debouncedExistingPseudo(e)
      
    },
    login: (e) => {
      appStore.dispatch({
        type: "sliceSignUpModal/change",
        payload: {
          inputs: { login: e.target.value },
          errors: { 
            login: false,
            existinglogin: false
          },
        },
      });
    },
    password: (e) => {
      appStore.dispatch({
        type: "sliceSignUpModal/change",
        payload: {
          inputs: { password: e.target.value },
          errors: { password: false },
        },
      });
    },
    repeatpassword: (e) => {
      appStore.dispatch({
        type: "sliceSignUpModal/change",
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
          appStore.dispatch({ type: "sliceSignUpModal/close" });
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
              error={select.errors.pseudo || select.errors.existingpseudo}
              helperText={ select.errors.existingpseudo ? (t("signup.error.existingpseudo")) : (null) }
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
              error={select.errors.login || select.errors.existinglogin}
              helperText={ select.errors.existinglogin ? (t("signup.error.existinglogin")) : (null) }
            />
            {select.errors.existinglogin ? (
              <Paper sx={{
              m:2, 
              p:1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              verticalAlign: "middle" }} >
                <Link 
                sx={{ typography: "body2", "& > :not(style) + :not(style)": { ml: 2 }, }} 
                href={""} 
                target="_blank" rel="noreferrer">
                  {t("signup.error.resetpassword")}
                </Link>
              </Paper>
            ) : (null)}
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
              appStore.dispatch({ type: "sliceSignUpModal/close" });
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
