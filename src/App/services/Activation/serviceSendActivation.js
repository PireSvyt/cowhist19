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
          appStore.dispatch({
            type: "sliceSignInModal/change",
            payload: {
              sendingmail: false
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "signin.snack.successresendingactivation"
            },
          });
          break;
      case "auth.sendactivation.error.onfind":
      case "auth.sendactivation.error.accountnotfound":
      case "auth.sendactivation.error.updatingtoken":
        appStore.dispatch({
          type: "sliceSignInModal/change",
          payload: {
            sendingmail: false
          },
        });
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "signin.snack.errorresendingactivation",
          },
        });
        break;
      default:
        appStore.dispatch({
          type: "sliceSignInModal/change",
          payload: {
            sendingmail: false,
          },
        });
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.api.unmanagedtype",
            details: [data.type],
          },
        });
    }
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
        status: "error",
      },
      errors: err,
    };
  }
}

export default serviceSendActivation;
