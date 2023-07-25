// Services
import apiActivate from "./apiActivate";

import { random_id } from "../toolkit.js"

import appStore from "../../store/appStore";

async function serviceActivate(activationInputs) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceActivate");
  }

  try {
    
    let stateChanges = {};
    let errors = [];

    // API call
    let data = await apiActivate(activationInputs);
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

export default serviceActivate;
