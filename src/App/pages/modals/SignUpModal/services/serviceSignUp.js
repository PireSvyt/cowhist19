import bcrypt from "bcryptjs-react";
// BCRYPT https://www.makeuseof.com/nodejs-bcrypt-hash-verify-salt-password/
// Services
import apiSignUp from "./apiSignUp.js";
// Shared
import { random_id } from "../../../../services/_miscelaneous/toolkit.js";
// Reducers
import appStore from "../../../../store/appStore.js";

async function serviceSignUp(signUpInputs) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceSignUp");
  }

  try {
    let stateChanges = {};
    let errors = [];

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
        stateChanges.signUpStatus = "signedup";
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "signup.snack.signedup",
          },
        });
        break;
      case "auth.signup.success.alreadysignedup":
        stateChanges.loginError = true;
        stateChanges.signUpStatus = "alreadysignedup";
        break;
      case "auth.signup.error.savingoncreate":
      case "auth.signup.error.savingfrominvited":
      case "auth.signup.error.notfound":
        stateChanges.signUpStatus = "error";
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
        break;
      default:
        stateChanges.signUpStatus = "error";
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
    console.error("serviceSignUp", err);
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
        signUpStatus: "error",
      },
      errors: err,
    };
  }
}

export default serviceSignUp;
