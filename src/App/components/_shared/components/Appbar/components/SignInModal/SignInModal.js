import React, { useState } from "react";
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
import serviceSignIn from "./services/serviceSignIn.js";
import serviceSignInCheck from "./services/serviceSignInCheck.js";
import serviceSendActivation from "../../../../../../services/Activation/serviceSendActivation.js";
import serviceSendActivationCheck from "../../../../../../services/Activation/serviceSendActivationCheck.js";
import serviceSendPassword from "./services/serviceSendPassword.js";
import serviceSendPasswordCheck from "./services/serviceSendPasswordCheck.js";
// Reducers
import appStore from "../../../../../../store/appStore.js";

export default function SignInModal() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    //console.log("SignInModal");
  }
  // i18n
  const { t } = useTranslation();

  // Constants
  const componentHeight = window.innerHeight - 115;

  // Selects
  const select = {
    open: useSelector((state) => state.sliceModals.openSignInModal),
  };
  
  // States
  const [signInStatus, setSignInStatus] = useState("onhold")
  const [loadingSignIn, setLoadingSignIn] = useState(false)
  const [loadingSendActivation, setLoadingSendActivation] = useState(false)
  const [loadingPasswordReset, setLoadingPasswordReset] = useState(false)
  const [loginValue, setLoginValue] = useState("")
  const [loginError, setLoginError] = useState(false)
  const [passwordValue, setPasswordValue] = useState("")
  const [passwordError, setPasswordError] = useState(false)

  function setStates (stateChanges) {
    Object.keys(stateChanges).forEach(change => {
      switch (change) {
        case "signInStatus" :
          setSignInStatus(stateChanges[change])
          break
        case "loadingSignIn" :
          setLoadingSignIn(stateChanges[change])
          break
        case "loadingPasswordReset" :
          setLoadingPasswordReset(stateChanges[change])
          break
        case "loadingSendActivation" :
          setLoadingSendActivation(stateChanges[change])
          break
        case "loginValue" :
          setLoginValue(stateChanges[change])
          break
        case "loginError" :
          setLoginError(stateChanges[change])
          break
        case "passwordValue" :
          setPasswordValue(stateChanges[change])
          break
        case "passwordError" :
          setPasswordError(stateChanges[change])
          break
        default :
          console.error("SignInModal.setStates unknown change ", change, stateChanges[change])
      }
    })
  }

  // Changes
  const changes = {
    close: () => {
      appStore.dispatch({ 
        type: "sliceModals/close",
        payload: "SignIn" 
      });
    },
    login: (e) => {
      setStates({
        loginValue: e.target.value,
        loginError: false
      })
    },
    password: (e) => {
      setStates({
        passwordValue: e.target.value,
        passwordError: false
      })
    },
    signin: () => {
      console.log("SignInModal.signin")
      setStates({loadingSignIn: true})
      let inputs = {
        login: loginValue,
        password: passwordValue
      }
      serviceSignInCheck(inputs)
      .then(checkOutcome => {
        setStates(checkOutcome.stateChanges)
        if (checkOutcome.proceed) {
          serviceSignIn(inputs)
          .then(outcome => {
            console.log("outcome", outcome)
            setStates(outcome.stateChanges)
            setStates({loadingSignIn: false})
          })
        } else {
          setStates({loadingSignIn: false})
        }
      })
    },
    gotosignup: () => {
      appStore.dispatch({
        type: "sliceModals/open",
        payload: "SignUp"
      });
      changes.close()
    },
    sendactivation: () => {
      console.log("SignInModal.sendactivation")
      setStates({loadingSendActivation: true})
      let inputs = {
        login: loginValue,
      }
      serviceSendActivationCheck(inputs)
      .then(checkOutcome => {
        setStates(checkOutcome.stateChanges)
        if (checkOutcome.proceed) {
          serviceSendActivation(inputs)
          .then(outcome => {
            setStates(outcome.stateChanges)
            setStates({loadingSendActivation: false})
          })
        } else {
          setStates({loadingSendActivation: false})
        }
      })
    },
    resetpassword: () => {
      console.log("SignInModal.resetpassword")
      setStates({loadingPasswordReset: true})
      let inputs = {
        login: loginValue,
      }
      serviceSendPasswordCheck(inputs)
      .then(checkOutcome => {
        setStates(checkOutcome.stateChanges)
        if (checkOutcome.proceed) {
          serviceSendPassword(inputs)
          .then(outcome => {
            setStates(outcome.stateChanges)
            setStates({loadingPasswordReset: false})
          })
        } else {
          setStates({loadingPasswordReset: false})
        }
      })
    }
  };

  // Render
  return (
    <Box>
      <Dialog
        data-testid="componentSignInModal"
        id="dialog_signin"
        open={select.open}
        onClose={changes.close}
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
                value={loginValue}
                onChange={changes.login}
                autoComplete="off"
                type="email"
                error={loginError}
              />
              <TextField
                data-testid="fieldPassword"
                name="password"
                required
                label={t("generic.input.password")}
                variant="standard"
                value={passwordValue}
                onChange={changes.password}
                autoComplete="off"
                type="password"
                error={passwordError}
              />
              <LoadingButton
                variant="outlined"
                onClick={changes.resetpassword}
                sx={{mt:2,mb:1}}
                disabled={loadingPasswordReset}
                loading={loadingPasswordReset}
              >
                {t("signin.button.resetpassword")}
              </LoadingButton>

              {signInStatus === "notfound" ? (
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

              {signInStatus === "inactivated" ? (
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
                      onClick={changes.sendactivation}
                      disabled={loadingSendActivation}
                      loading={loadingSendActivation}
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
            onClick={changes.close}
          >
            {t("generic.button.cancel")}
          </Button>
          <LoadingButton
            data-testid="buttonProceed"
            variant="contained"
            onClick={changes.signin}
            disabled={loadingSignIn || signInStatus === "inactivated"}
            loading={loadingSignIn}
          >
            {t("generic.button.proceed")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
