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
import serviceSignIn from "./serviceSignIn.js"
import serviceSignInCheck from "./serviceSignInCheck.js";
import serviceSendActivation from "../Activation/SendActivation/serviceSendActivation.js";
import serviceSendActivationCheck from "../Activation/SendActivation/serviceSendActivationCheck.js";
import serviceSendPassword from "../PasswordReset/serviceSendPassword.js";
import serviceSendPasswordCheck from "../PasswordReset/serviceSendPasswordCheck.js";
// Reducers
import appStore from "../../store/appStore.js";

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
  const [sendActivationStatus, setSendActivationStatus] = useState("onhold")
  const [loadingSendActivation, setLoadingSendActivation] = useState(false)
  const [sendPasswordStatus, setSendPasswordStatus] = useState("onhold")
  const [loadingSendPassword, setLoadingSendPassword] = useState(false)
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
        case "sendPasswordStatus" :
          setSendPasswordStatus(stateChanges[change])
          break
        case "loadingSendPassword" :
          setLoadingSendPassword(stateChanges[change])
          break
        case "sendActivationStatus" :
          setSendActivationStatus(stateChanges[change])
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
      // Clean
      setSignInStatus("hold")
      setLoadingSignIn(false)
      setLoadingSendActivation(false)
      setSendPasswordStatus("hold")
      setLoadingSendPassword(false)
      setLoginValue("")
      setLoginError(false)
      setPasswordValue("")
      setPasswordError(false)
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
      setStates({
        sendPasswordStatus: "hold",
        loadingSendPassword: true
      })
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
            setStates({loadingSendPassword: false})
          })
        } else {
          setStates({loadingSendPassword: false})
        }
      })
    }
  };

  // Render
  return (
    <Box>
      <Dialog
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
                disabled={loadingSendPassword || sendPasswordStatus === "sent"}
                loading={loadingSendPassword}
              >
                {t("signin.button.resetpassword")}
              </LoadingButton>

              {signInStatus === "notfound" ? (                
                <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                >
                  <Typography
                    sx={{ mt: 2, mb: 1, whiteSpace: "pre-line" }}
                    variant="body1"
                    component="span"
                    align="center"
                  >
                    {t("signin.label.notfoundaccount")}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 1, width:"100%" }}
                    onClick={changes.gotosignup}
                  >
                    {t("generic.button.signin")}
                  </Button>
                </Box>
              ) : (null)}

              {sendPasswordStatus === "sent" ? (             
                <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                >
                  <Typography
                    sx={{ mt: 2, mb: 1, whiteSpace: "pre-line" }}
                    variant="body1"
                    component="span"
                    align="center"
                  >
                    {t("signin.label.successsendingpassword")}
                  </Typography>
                </Box>
              ) : (null)}

              {signInStatus === "inactivated" ? (             
                <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                >
                  <Typography
                    sx={{ mt: 2, mb: 1, whiteSpace: "pre-line" }}
                    variant="body1"
                    component="span"
                    align="center"
                  >
                    {t("signin.label.inactiveaccount")}
                  </Typography>
                  <LoadingButton
                    variant="contained"
                    sx={{ mt: 1, width:"100%" }}
                    onClick={changes.sendactivation}
                    disabled={loadingSendActivation || sendActivationStatus === "sent"}
                    loading={loadingSendActivation}
                  >
                    {t("signin.button.resendactivationemail")}
                  </LoadingButton>
                </Box>
              ) : (null)}

              {sendActivationStatus === "sent" ? (             
                <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                >
                  <Typography
                    sx={{ mt: 2, mb: 1, whiteSpace: "pre-line" }}
                    variant="body1"
                    component="span"
                    align="center"
                  >
                    {t("signin.label.successresendingactivation")}
                  </Typography>
                </Box>
              ) : (null)}

            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={changes.close}
          >
            {t("generic.button.cancel")}
          </Button>
          <LoadingButton
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
