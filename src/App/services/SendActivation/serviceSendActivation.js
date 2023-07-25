import { AES } from "crypto-js";

// Services
import apiSendActivation from "./apiSendActivation.js";
// Shared
import { random_id } from "../toolkit.js";
// Reducers
import appStore from "../../store/appStore.js";

async function serviceSendActivation(sendActivationInputs) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceSendActivation");
  }

  try {

    let stateChanges = {};
    let errors = [];
    
    // Encryption
    if (process.env.NODE_ENV === "_production") {
      sendActivationInputs.login = AES.encrypt(
          sendActivationInputs.login,
        process.env.REACT_APP_ENCRYPTION
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
        stateChanges.sendActivationStatus = "sent"
        break;

      case "auth.sendactivation.error.onfind":
      case "auth.sendactivation.error.accountnotfound":
      case "auth.sendactivation.error.updatingtoken":
        stateChanges.sendActivationStatus = "error"
        break

      default:
        stateChanges.sendActivationStatus = "error"
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
    console.error("serviceSendActivation", err);
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

export default serviceSendActivation;
