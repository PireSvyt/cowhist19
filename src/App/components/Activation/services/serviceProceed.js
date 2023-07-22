// Services
import apiActivate from "./apiActivate";

import serviceProceedCheck from "./serviceProceedCheck";
import { random_id } from "../../../services/_shared/toolkit";

async function serviceProceed(activationInputs) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceProceed");
  }

  try {
    let callbacks = [];
    let errors = [];
    let stateChanges = {};

    // Check inputs
    let proceedCheckOutcome = serviceProceedCheck(activationInputs);
    if (proceedCheckOutcome.stateChanges.length > 0) {
      Object.keys(proceedCheckOutcome.stateChanges).forEach(c => {
        stateChanges[c] = proceedCheckOutcome.stateChanges[c]
      });
    }

    if (proceedCheckOutcome.proceed === true) {

      // API call
      let data = await apiActivate(activationInputs);
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("data.type : " + data.type);
      }

      // Response management
      switch (data.type) {
        case "auth.activate.success.activated":
        case "auth.activate.success.alreadyctivated":
          stateChanges.status = "activated";
          stateChanges.loading = false
          break;
        case "auth.activate.error.notfound":
        case "auth.activate.error.onsave":
        default:
          stateChanges.status = "error";
          stateChanges.loading = false
      }

      // Response
      return {
        stateChanges: stateChanges,
        callbacks: callbacks,
        errors: errors,
      };
      
    } else {
      if (proceedCheckOutcome.errors.length > 0) {
        return {
          stateChanges: {
            loading: false,
            status: "error",
            openSnack: true,
            snack: {
              uid: random_id(),
              id: "generic.snack.error.withdetails",
              details: proceedCheckOutcome.errors,
            },
          },
          callbacks: [],
          errors: proceedCheckOutcome.errors,
        };
      }
    }
  } catch (err) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("service caught error");
      console.log(err);
    }
    // Error network
    return {
      stateChanges: {
        loading: false,
        status: "error",
        openSnack: true,
        snack: {
          uid: random_id(),
          id: "generic.snack.api.errornetwork",
        },
      },
      callbacks: [],
      errors: [],
    };
  }
}

export default serviceProceed;
