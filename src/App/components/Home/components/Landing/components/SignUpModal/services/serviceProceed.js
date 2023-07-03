import axios from "axios";
import bcrypt from "bcryptjs-react";
// BCRYPT https://www.makeuseof.com/nodejs-bcrypt-hash-verify-salt-password/
// Services
import apiSignUp from "./apiSignUp.js";
import serviceProceedCheck from "./serviceProceedCheck.js";
// Shared
import { random_id } from "../../../../../../../services/_shared/toolkit.js";
// Reducers
import appStore from "../../../../../../../store/appStore.js";

async function serviceProceed() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceProceed");
  }

  try {
    // Lock UI
    appStore.dispatch({ type: "sliceSignUpModal/lock" });
    const signUpInputs = { ...appStore.getState().sliceSignUpModal.inputs };

    // Check inputs
    let proceedCheckOutcome = serviceProceedCheck(signUpInputs);
    appStore.dispatch({
      type: "sliceSignUpModal/change",
      payload: proceedCheckOutcome.stateChanges,
    });

    if (proceedCheckOutcome.proceed === true) {
      // Prep
      const hash = bcrypt.hashSync(signUpInputs.password);
      signUpInputs.password = hash;
      delete signUpInputs.repeatpassword;

      // API call
      const data = await apiSignUp(signUpInputs);
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("data.type : " + data.type);
      }

      // Response management
      switch (data.type) {
        case "auth.signup.success.signedup":
          appStore.dispatch({
            type: "sliceSignUpModal/change",
            payload: {
              open: false,
              inputs: {
                pseudo: "",
                login: "",
                password: "",
                repeatpassword: "",
              },
              disabled: false,
              loading: false,
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "signup.snack.signedup",
            },
          });
          // Open signin modal
          appStore.dispatch({
            type: "sliceSignInModal/open",
          });
          break;
        case "auth.signup.success.alreadysignedup":
          appStore.dispatch({
            type: "sliceSignUpModal/change",
            payload: {
              disabled: false,
              loading: false,
              errors: {
                existinglogin: true
              }
            },
          });
          break;
        case "auth.signup.error.savingoncreate":
          appStore.dispatch({
            type: "sliceSignUpModal/change",
            payload: {
              disabled: false,
              loading: false,
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "generic.snack.error.wip",
            },
          });
          break;
        case "auth.signup.error.savingfrominvited":
          appStore.dispatch({
            type: "sliceSignUpModal/change",
            payload: {
              disabled: false,
              loading: false,
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "generic.snack.error.wip",
            },
          });
          break;
        case "auth.signup.error.notfound":
          appStore.dispatch({
            type: "sliceSignUpModal/change",
            payload: {
              disabled: false,
              loading: false,
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "generic.snack.error.wip",
            },
          });
          break;
        default:
          appStore.dispatch({
            type: "sliceSignUpModal/change",
            payload: {
              disabled: false,
              loading: false,
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "generic.snack.api.unmanagedtype",
            },
          });
      }
    } else {
      if (proceedCheckOutcome.errors.length > 0) {
        appStore.dispatch({
          type: "sliceSignUpModal/change",
          payload: {
            disabled: false,
            loading: false,
          },
        });
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.withdetails",
            details: proceedCheckOutcome.errors,
          },
        });
      }
    }
  } catch (err) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("service caught error");
      console.log(err);
    }
    // Error network
    appStore.dispatch({
      type: "sliceSignUpModal/change",
      payload: {
        disabled: false,
        loading: false,
      },
    });
    appStore.dispatch({
      type: "sliceSnack/change",
      payload: {
        uid: random_id(),
        id: "generic.snack.api.errornetwork",
      },
    });
  }
}

export default serviceProceed;
