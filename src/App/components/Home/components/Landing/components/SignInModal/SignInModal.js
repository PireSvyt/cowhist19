import React from "react";
import { useTranslation } from "react-i18next";
import { Provider, useSelector, useDispatch } from "react-redux";
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

// Resources
import emptySignin from "../../../../../../shared/resources/emptySignIn";
// Services
import serviceSignInCheck from "./services/serviceSignInCheck.js";
import serviceSignIn from "./services/serviceSignIn.js";
// Shared
import serviceModalChange from "../../../../../../shared/services/serviceModalChange.js";
import Snack from "../../../../../../shared/components/Snack/Snack2.js";
import { random_id } from "../../../../../../shared/services/toolkit.js";
// Reducers
import storeSignIn from "./store/storeSignIn.js";
import sliceSignIn from "./store/sliceSignIn.js";

export default function SignInModal(props) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("SignInModal");
  }
  // i18n
  const { t } = useTranslation();

  // Constants
  const componentHeight = window.innerHeight - 115;

  // Selects
  const selectSignInOpen = useSelector((state) => state.sliceSignIn.open);
  const selectSignInInputs = useSelector((state) => state.sliceSignIn.inputs);
  const selectSignInLoginError = useSelector(
    (state) => state.sliceSignIn.loginError
  );
  const selectSignInPasswordError = useSelector(
    (state) => state.sliceSignIn.passwordError
  );
  const selectSignInDisabled = useSelector(
    (state) => state.sliceSignIn.disabled
  );
  const selectSignInLoading = useSelector((state) => state.sliceSignIn.loading);
  const selectSignInSnackData = useSelector(
    (state) => state.sliceSignIn.snackData
  );

  // actions
  function actionSignInClose() {
    storeSignIn.dispatch({ type: "sliceSignIn/actionSignInClose" });
  }

  // Changes
  const onLoginChanged = (e) => {
    storeSignIn.dispatch({
      type: "sliceSignIn/actionSignInStateChanges",
      payload: {
        login: e.target.value,
      },
    });
  };
  const onPasswordChanged = (e) => {
    storeSignIn.dispatch({
      type: "sliceSignIn/actionSignInStateChanges",
      payload: {
        password: e.target.value,
      },
    });
  };

  // Handles
  function handleProceed() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("SignInModal.handleProceed");
    }

    // Check inputs
    let proceedCheckOutcome = serviceSignInCheck(
      storeSignIn.getState().sliceSignIn.inputs
    );
    storeSignIn.dispatch({
      type: "sliceSignIn/actionSignInStateChanges",
      payload: proceedCheckOutcome.stateChanges,
    });

    // Post or publish
    if (proceedCheckOutcome.proceed === true) {
      storeSignIn.dispatch({ type: "sliceSignIn/actionSignInLock" });

      serviceSignIn({ ...storeSignIn.getState().signIn.inputs }).then(
        (proceedOutcome) => {
          storeSignIn.dispatch({
            type: "sliceSignIn/actionSignInStateChanges",
            payload: proceedOutcome.stateChanges,
          });
          /*
          proceedOutcome.callbacks.forEach((callback) => {
            if (callback.option === undefined) {
              this.props.callback(callback.key);
            } else {
              this.props.callback(callback.key, callback.option);
            }
          });
          */
        }
      );
    } else {
      // Snack
      if (proceedCheckOutcome.errors.length > 0) {
        storeSignIn.dispatch({
          type: "sliceSignIn/actionSignInSnack",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.withdetails",
            details: proceedCheckOutcome.errors,
          },
        });
      }
    }
  }

  // Render
  return (
    <Box>
      <Dialog
        data-testid="componentSignInModal"
        id="dialog_signin"
        open={selectSignInOpen === true}
        onClose={actionSignInClose}
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
                value={selectSignInInputs.login}
                onChange={onLoginChanged}
                autoComplete="off"
                type="email"
                error={selectSignInLoginError}
              />
              <TextField
                data-testid="fieldPassword"
                name="password"
                required
                label={t("generic.input.password")}
                variant="standard"
                value={selectSignInInputs.password}
                onChange={onPasswordChanged}
                autoComplete="off"
                type="password"
                error={selectSignInPasswordError}
              />
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            data-testid="buttonClose"
            onClick={() => {
              actionSignInClose();
            }}
          >
            {t("generic.button.cancel")}
          </Button>
          <LoadingButton
            data-testid="buttonProceed"
            variant="contained"
            onClick={handleProceed}
            disabled={selectSignInDisabled}
            loading={selectSignInLoading}
          >
            {t("generic.button.proceed")}
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Snack data-testid="componentSnack" data={selectSignInSnackData} />
    </Box>
  );
}
