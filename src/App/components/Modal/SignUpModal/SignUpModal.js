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
  Paper,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// Services
import serviceSignUp from "./services/SignUp/serviceSignUp.js";
import serviceSignUpCheck from "./services/SignUp/serviceSignUpCheck.js";
// Reducers
import appStore from "../../../../../../store/appStore.js";

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
    open: useSelector((state) => state.sliceModals.openSignUpModal),
  };

  // States
  const [signUpStatus, setSignUpStatus] = useState("onhold");
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const [pseudoValue, setPseudoValue] = useState("");
  const [pseudoError, setPseudoError] = useState(false);
  const [existingPseudoError, setExistingPseudoError] = useState(false);
  const [loginValue, setLoginValue] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordRepeatValue, setPasswordRepeatValue] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState(false);

  function setStates(stateChanges) {
    Object.keys(stateChanges).forEach((change) => {
      switch (change) {
        case "signUpStatus":
          setSignUpStatus(stateChanges[change]);
          break;
        case "loadingSignUp":
          setLoadingSignUp(stateChanges[change]);
          break;
        case "pseudoValue":
          setPseudoValue(stateChanges[change]);
          break;
        case "existingPseudoError":
          setExistingPseudoError(stateChanges[change]);
          break;
        case "pseudoError":
          setPseudoError(stateChanges[change]);
          break;
        case "loginValue":
          setLoginValue(stateChanges[change]);
          break;
        case "loginError":
          setLoginError(stateChanges[change]);
          break;
        case "passwordValue":
          setPasswordValue(stateChanges[change]);
          break;
        case "passwordError":
          setPasswordError(stateChanges[change]);
          break;
        case "passwordRepeatValue":
          setPasswordRepeatValue(stateChanges[change]);
          break;
        case "passwordRepeatError":
          setPasswordRepeatError(stateChanges[change]);
          break;
        default:
          console.error(
            "SignUpModal.setStates unknown change ",
            change,
            stateChanges[change],
          );
      }
    });
  }

  // Changes
  const changes = {
    close: () => {
      appStore.dispatch({
        type: "sliceModals/close",
        payload: "SignUp",
      });
      // Clean
      setSignUpStatus("hold");
      setLoadingSignUp(false);
      setPseudoValue("");
      setPseudoError(false);
      setExistingPseudoError(false);
      setLoginValue("");
      setLoginError(false);
      setPasswordValue("");
      setPasswordError(false);
      setPasswordRepeatValue("");
      setPasswordRepeatError(false);
    },
    pseudo: (e) => {
      setStates({
        pseudoValue: e.target.value,
        pseudoError: false,
      });
    },
    login: (e) => {
      setStates({
        loginValue: e.target.value,
        loginError: false,
        signUpStatus: "hold",
      });
    },
    password: (e) => {
      setStates({
        passwordValue: e.target.value,
        passwordError: false,
      });
    },
    passwordRepeat: (e) => {
      setStates({
        passwordRepeatValue: e.target.value,
        passwordRepeatError: false,
      });
    },
    signup: () => {
      console.log("SignUpModal.signup");
      setStates({ loadingSignUp: true });
      let inputs = {
        pseudo: pseudoValue,
        login: loginValue,
        password: passwordValue,
        passwordRepeat: passwordRepeatValue,
      };
      serviceSignUpCheck(inputs).then((checkOutcome) => {
        setStates(checkOutcome.stateChanges);
        if (checkOutcome.proceed) {
          serviceSignUp(inputs).then((outcome) => {
            setStates(outcome.stateChanges);
            setStates({ loadingSignUp: false });
          });
        } else {
          setStates({ loadingSignUp: false });
        }
      });
    },
    signin: () => {
      appStore.dispatch({
        type: "sliceModals/open",
        payload: "SignIn",
      });
      appStore.dispatch({
        type: "sliceModals/close",
        payload: "SignUp",
      });
    },
  };

  // Render
  return (
    <Box>
      <Dialog
        open={select.open === true}
        onClose={changes.close}
        fullWidth={true}
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
              name="pseudo"
              required
              label={t("generic.input.pseudo")}
              variant="standard"
              value={pseudoValue || ""}
              onChange={changes.pseudo}
              autoComplete="off"
              error={pseudoError || existingPseudoError}
              helperText={
                existingPseudoError ? t("signup.error.existingpseudo") : null
              }
            />
            <TextField
              name="login"
              required
              label={t("generic.input.email")}
              variant="standard"
              value={loginValue}
              onChange={changes.login}
              autoComplete="off"
              type="email"
              error={loginError || signUpStatus === "alreadysignedup"}
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
            <TextField
              name="passwordRepeat"
              required
              label={t("signup.input.passwordrepeat")}
              variant="standard"
              value={passwordRepeatValue || ""}
              onChange={changes.passwordRepeat}
              autoComplete="off"
              type="password"
              error={passwordRepeatError}
            />

            {signUpStatus === "alreadysignedup" ? (
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
          <Button onClick={changes.close}>{t("generic.button.cancel")}</Button>
          <LoadingButton
            variant="contained"
            onClick={changes.signup}
            disabled={loadingSignUp || signUpStatus === "alreadysignedup"}
            loading={loadingSignUp}
          >
            {t("generic.button.proceed")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
