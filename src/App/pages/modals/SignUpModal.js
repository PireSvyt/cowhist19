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
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// Services
import { 
  serviceAuthSignUp, 
} from "../../services/auth/auth.services.js"
// Reducers
import appStore from "../../store/appStore.js";

export default function SignUpModal() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    //console.log("SignUpModal");
  }
  // i18n
  const { t } = useTranslation();

  // Constants
  const componentHeight = window.innerHeight - 115;

  // Selects
  const select = {
    open: useSelector((state) => state.signupModalSlice.open),
    status:  useSelector((state) => state.signupModalSlice.status),
    disabled:  useSelector((state) => state.signupModalSlice.disabled),
    loading:  useSelector((state) => state.signupModalSlice.loading),
    inputs:  useSelector((state) => state.signupModalSlice.inputs),
    errors:  useSelector((state) => state.signupModalSlice.errors),
  };

  // Changes
  const changes = {
    close: () => {
      appStore.dispatch({
        type: "signupModalSlice/close"
      });
    },
    pseudo: (e) => {
      appStore.dispatch({
        type: "signupModalSlice/change",
        payload: {
          inputs: {
            pseudo: e.target.value
          },
          errors: {
            pseudo: false
          },
        }
      });
    },
    login: (e) => {
      appStore.dispatch({
        type: "signupModalSlice/change",
        payload: {
          inputs: {
            login: e.target.value
          },
          errors: {
            login: false
          },
        }
      });
    },
    password: (e) => {
      appStore.dispatch({
        type: "signupModalSlice/change",
        payload: {
          inputs: {
            password: e.target.value
          },
          errors: {
            password: false
          },
        }
      });
    },
    passwordrepeat: (e) => {
      appStore.dispatch({
        type: "signupModalSlice/change",
        payload: {
          inputs: {
            passwordrepeat: e.target.value
          },
          errors: {
            passwordrepeat: false
          },
        }
      });
    },
    signup: () => {
      console.log("SignUpModal.signup");
      serviceAuthSignUp()
    },
    signin: () => {
      appStore.dispatch({
        type: "signinModalSlice/open",
      });
      changes.close()
    },
  };

  // Render
  return (
    <Box>
      <Dialog
        open={select.open === true}
        onClose={changes.close}
        fullWidth={true}
        data-testid="modal-sign up"
      >
        <DialogTitle>{t("signup.label.title")}</DialogTitle>
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
              data-testid="modal-sign up-input-pseudo" 
              name="pseudo"
              required
              label={t("generic.input.pseudo")}
              variant="standard"
              value={select.inputs.pseudo || ""}
              onChange={changes.pseudo}
              autoComplete="off"
              error={select.errors.pseudo || select.errors.existingpseudo}
              helperText={
                select.errors.existingpseudo ? t("signup.error.existingpseudo") : null
              }
            />
            <TextField
              data-testid="modal-sign up-input-login" 
              name="login"
              required
              label={t("generic.input.email")}
              variant="standard"
              value={select.inputs.login}
              onChange={changes.login}
              autoComplete="off"
              type="email"
              error={select.errors.login || select.errors.alreadysignedup}
            />
            <TextField
              data-testid="modal-sign up-input-password" 
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
              data-testid="modal-sign up-input-password repeat" 
              name="passwordrepeat"
              required
              label={t("signup.input.passwordrepeat")}
              variant="standard"
              value={select.inputs.passwordrepeat || ""}
              onChange={changes.passwordrepeat}
              autoComplete="off"
              type="password"
              error={select.errors.passwordrepeat}
            />

            {select.errors.alreadysignedup ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                data-testid="modal-sign up-box-error on signing up with existing login"
              >
                <Typography
                  sx={{ mt: 2, mb: 1, whiteSpace: "pre-line" }}
                  variant="body1"
                  component="span"
                  align="center"
                >
                  {t("signup.label.existinglogin")}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 1, width: "100%" }}
                  onClick={changes.signin}
                >
                  {t("generic.button.signin")}
                </Button>
              </Box>
            ) : null}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button 
            data-testid="modal-sign up-button-close" 
            onClick={changes.close}
          >{t("generic.button.cancel")}</Button>
          <LoadingButton
            variant="contained"
            onClick={changes.signup}
            disabled={select.disabled || select.errors.alreadysignedup}
            loading={select.loading}
            data-testid="modal-sign up-button-proceed"
          >
            {t("generic.button.proceed")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
