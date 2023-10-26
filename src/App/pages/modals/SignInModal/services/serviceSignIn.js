import Cookies from "js-cookie";
import { AES } from "crypto-js";

// Services
import apiSignIn from "./apiSignIn.js";
// Shared
import { random_id } from "../../../../services/_miscelaneous/toolkit.js";
import serviceAccessGrant from "../../../services/Auth/serviceAccessGrant.js";
// Reducers
import appStore from "../../../../store/appStore.js";

async function serviceSignIn(signInInputs) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceSignIn");
  }

  try {
    let stateChanges = {};
    let errors = [];

    // Encryption
    if (process.env.NODE_ENV === "_production") {
      signInInputs.password = AES.encrypt(
        signInInputs.password,
        process.env.REACT_APP_ENCRYPTION,
      ).toString();
      signInInputs.login = AES.encrypt(
        signInInputs.login,
        process.env.REACT_APP_ENCRYPTION,
      ).toString();
      signInInputs.encryption = true;
    } else {
      signInInputs.encryption = false;
    }

    // API call
    const data = await apiSignIn(signInInputs);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "auth.signin.success":
        serviceAccessGrant(data.data.token).then((proceedOutcome) => {
          if (proceedOutcome.errors.length > 0) {
            if (process.env.REACT_APP_DEBUG === "TRUE") {
              console.log("proceedOutcome errors", proceedOutcome.errors);
            }
            stateChanges.signInStatus = "error";
            errors = proceedOutcome.errors;
            appStore.dispatch({
              type: "sliceSnack/change",
              payload: {
                uid: random_id(),
                id: "generic.snack.error.withdetails",
                details: proceedOutcome.errors,
              },
            });
          } else {
            // Signed in!
            Cookies.set("cowhist19_token", data.data.token);
            appStore.dispatch({
              type: "sliceModals/close",
              payload: "SignIn",
            });
            if (window.location.href.search("activation")) {
              window.location = "/";
            }
          }
        });
        break;
      case "auth.signin.error.onfind":
      case "auth.signin.error.notfound":
        stateChanges.loginError = true;
        stateChanges.signInStatus = "notfound";
        break;
      case "auth.signin.error.invalidpassword":
      case "auth.signin.error.onpasswordcompare":
        stateChanges.passwordError = true;
        stateChanges.signInStatus = "denied";
        break;
      case "auth.signin.error.statussignedup":
      case "auth.signin.error.statusunknown":
        stateChanges.signInStatus = "inactivated";
        break;
      default:
        stateChanges.signInStatus = "error";
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.api.unmanagedtype",
            details: data.type,
          },
        });
    }

    // Response
    return {
      stateChanges: stateChanges,
      errors: errors,
    };
  } catch (err) {
    console.error("serviceSignIn", err);
    // Snack
    appStore.dispatch({
      type: "sliceSnack/change",
      payload: {
        uid: random_id(),
        id: "generic.snack.api.errornetwork",
      },
    });
    return {
      stateChanges: {
        signInStatus: "error",
      },
      errors: err,
    };
  }
}

export default serviceSignIn;
