import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { AES } from "crypto-js";
// APIs
import {
  apiAuthSignUp,
  apiAuthActivate,
  apiAuthSendActivation,
  apiAuthSignIn,
  apiAuthAssess,
  apiAuthSendPassword,
  apiAuthExistingPseudo,
} from "./auth.api.js";
// Services
import { random_id } from "../_miscelaneous/toolkit.js";
import { serviceUserGetDetails } from "../user/user.services.js";
// Reducers
import appStore from "../../store/appStore";

export async function serviceAuthSignUp() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceAuthSignUp");
  }
}

export async function serviceAuthActivate(activationInputs) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceAuthActivate");
  }

  try {
    let stateChanges = {};
    let errors = [];

    // API call
    let data = await apiAuthActivate(activationInputs);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "auth.activate.success.activated":
      case "auth.activate.success.alreadyctivated":
        stateChanges.activationStatus = "activated";
        break;
      case "auth.activate.error.notfound":
      case "auth.activate.error.onsave":
      default:
        stateChanges.activationStatus = "error";
    }

    // Response
    return {
      stateChanges: stateChanges,
      errors: errors,
    };
  } catch (err) {
    console.error("serviceActivate", err);
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
        activationStatus: "error",
      },
      errors: err,
    };
  }
}

export async function serviceAuthSendActivation(sendActivationInputs) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceAuthSendActivation");
  }

  try {
    let stateChanges = {};
    let errors = [];

    // Encryption
    if (process.env.NODE_ENV === "_production") {
      sendActivationInputs.login = AES.encrypt(
        sendActivationInputs.login,
        process.env.REACT_APP_ENCRYPTION,
      ).toString();
      sendActivationInputs.encryption = true;
    } else {
      sendActivationInputs.encryption = false;
    }

    // API call
    const data = await apiSendActivation(sendActivationInputs);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "auth.sendactivation.success":
        stateChanges.sendActivationStatus = "sent";
        break;

      case "auth.sendactivation.error.onfind":
      case "auth.sendactivation.error.accountnotfound":
      case "auth.sendactivation.error.updatingtoken":
        stateChanges.sendActivationStatus = "error";
        break;

      default:
        stateChanges.sendActivationStatus = "error";
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
    console.error("serviceAuthSendActivation", err);
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
        sendActivationStatus: "error",
      },
      errors: err,
    };
  }
}

export async function serviceAuthSignIn() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceAuthSignIn");
  }
}

export function serviceAuthAccessDeny() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceAuthAccessDeny");
  }
  let callbacks = [];
  let errors = [];
  let stateChanges = {};

  // State management
  appStore.dispatch({
    type: "sliceUserAuth/signout",
  });

  // Remove cookies
  Cookies.remove("cowhist19_token");

  return {
    stateChanges: stateChanges,
    callbacks: callbacks,
    errors: errors,
  };
}

export async function serviceGrantAccess(token) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceGrantAccess");
  }
  let callbacks = [];
  let errors = [];
  let stateChanges = {};

  if (token === null || token === "") {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("empty token");
    }
    errors.push("generic.error.emptytoken");
    serviceAuthAccessDeny();
  } else {
    let decodedtoken = jwt_decode(token);
    // User status tollgate
    if (
      decodedtoken.status === "registered" ||
      decodedtoken.status === "signedup"
    ) {
      // Then update variables to signed in
      appStore.dispatch({
        type: "sliceUserAuth/signin",
        payload: {
          token: token,
        },
      });
      serviceUserGetDetails();
    } else {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("invalid status");
      }
      errors.push("generic.error.invalidstatus");
      serviceAuthAccessDeny();
    }
  }

  return {
    stateChanges: stateChanges,
    callbacks: callbacks,
    errors: errors,
  };
}

export async function serviceAuthAssessCookie() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceAuthAssessCookie");
  }

  try {
    // Load token from cookies
    let token = Cookies.get("cowhist19_token");
    if (token === undefined) {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("serviceAuthAssessCookie no token from cookies");
      }
      serviceAuthAccessDeny();
    } else {
      // API call
      const data = await apiAuthAssess(token);

      // Response management
      switch (data.type) {
        case "auth.assess.success.validtoken":
          // Sign in token
          serviceAccessGrant(token).then((proceedOutcome) => {
            if (proceedOutcome.errors.length > 0) {
              if (process.env.REACT_APP_DEBUG === "TRUE") {
                console.log("proceedOutcome errors");
                console.log(proceedOutcome.errors);
              }
            }
          });
          break;
        default:
          serviceAuthAccessDeny();
          break;
      }
    }
  } catch (error) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("service caught error");
      console.log(error);
    }
    serviceAuthAccessDeny();
  }
}

export async function serviceAuthSendPassword() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceAuthSendPassword");
  }
}

export async function serviceAuthExistingPseudo() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceAuthExistingPseudo");
  }
}
