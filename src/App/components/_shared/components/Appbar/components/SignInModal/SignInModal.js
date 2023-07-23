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
  Paper,
  Typography
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

// Services
import serviceProceed from "./services/serviceProceed.js";
import serviceResendActivation from "./services/serviceResendActivation.js";
// Reducers
import appStore from "../../../../../../store/appStore.js";

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
    sendingmail : useSelector((state) => state.sliceSignInModal.sendingmail),
    snackData: useSelector((state) => state.sliceSignInModal.snackData),
  };

  // Changes
  const changes = {
    closemodal: () => {
      appStore.dispatch({ 
        type: "sliceSignInModal/close" 
      });
    },
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
    gotosignup: () => {
      // Open sign up modal
      appStore.dispatch({
        type: "sliceSignUpModal/open"
      });
      appStore.dispatch({
        type: "sliceSignUpModal/change",
        payload: {
          inputs: { login: select.inputs.login }
        },
      });
      // Close sign in modal
      appStore.dispatch({
        type: "sliceSignInModal/close"
      });
    },
    resetpassword: () => {

    }
  };

  // Render
  return (
    <Box>
      <Dialog
        data-testid="componentSignInModal"
        id="dialog_signin"
        open={select.open}
        onClose={changes.closemodal}
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
              <Button
                variant="outlined"
                onClick={changes.resetpassword}
                sx={{mt:2,mb:1}}
                disabled
              >
                {t("signin.button.resetpassword")}
              </Button>

              {select.errors.notfound ? (
                <Paper 
                  sx={{
                    mt:1, 
                    mb:1, 
                    p:1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    verticalAlign: "middle" 
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Typography variant="body1" gutterBottom sx={{ whiteSpace: "pre-line" }}>
                      {t("signin.label.notfoundaccount")}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={changes.gotosignup}
                    >
                      {t("signin.button.gotosignup")}
                    </Button>
                  </Box>
                </Paper>
              ) : (null)}

              {select.errors.inactivated ? (
                <Paper 
                  sx={{
                    mt:1, 
                    mb:1, 
                    p:1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    verticalAlign: "middle" 
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Typography variant="body1" gutterBottom sx={{ whiteSpace: "pre-line" }}>
                      {t("signin.label.inactiveaccount")}
                    </Typography>
                    <LoadingButton
                      variant="contained"
                      onClick={serviceResendActivation}
                      disabled={select.sendingmail}
                      loading={select.sendingmail}
                    >
                      {t("signin.button.resendactivationemail")}
                    </LoadingButton>
                  </Box>
                </Paper>
              ) : (null)}

            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            data-testid="buttonClose"
            onClick={changes.closemodal}
          >
            {t("generic.button.cancel")}
          </Button>
          <LoadingButton
            data-testid="buttonProceed"
            variant="contained"
            onClick={serviceProceed}
            disabled={select.disabled || select.errors.inactivated}
            loading={select.loading}
          >
            {t("generic.button.proceed")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
