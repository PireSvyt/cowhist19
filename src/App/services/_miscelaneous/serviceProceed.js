// Services
import serviceProceedCheck from "./serviceProceedCheck.js";
// Shared
import { random_id } from "./toolkit.js";
// Reducers
import appStore from "../../store/appStore.js";

async function serviceProceed(serviceProceedInputs, log = []) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceProceed");
  }

  try {
    // Lock UI
    if (serviceProceedInputs.lockuifunction !== undefined) {
      serviceProceedInputs.lockuifunction(log);
    }

    // Inputs management
    let serviceInputs = undefined;
    if (serviceProceedInputs.getinputsfunction !== undefined) {
      serviceInputs = serviceProceedInputs.getinputsfunction(log);
    }
    if (serviceProceedInputs.repackagingfunction !== undefined) {
      if (serviceProceedInputs.repackagingfunction !== undefined) {
        serviceInputs = serviceProceedInputs.repackagingfunction(
          serviceInputs,
          log,
        );
      }
    }

    // Inputs checks
    let proceedCheckOutcome = undefined;
    if (serviceProceedInputs.sercivechecks !== undefined) {
      proceedCheckOutcome = serviceProceedCheck(
        serviceInputs,
        serviceProceedInputs.sercivechecks,
      );
    }
    if (serviceProceedInputs.getcheckoutcomedispatchfunction !== undefined) {
      if (proceedCheckOutcome.stateChanges !== undefined) {
        appStore.dispatch({
          type: serviceProceedInputs.getcheckoutcomedispatchfunction(log),
          payload: proceedCheckOutcome.stateChanges,
        });
      }
    } else {
      proceedCheckOutcome = { proceed: true };
    }
    if (proceedCheckOutcome.proceed === true) {
      // Prep

      // API call
      let proceedResponse = await serviceProceedInputs.apicall(
        serviceInputs.inputs,
        log,
      );

      // Response management
      let manageresponsefunction =
        serviceProceedInputs.getmanageresponsefunction(
          proceedResponse.type,
          log,
        );
      //console.log("manageresponsefunction",manageresponsefunction)
      if (manageresponsefunction !== undefined) {
        manageresponsefunction(log);
      } else {
        if (serviceProceedInputs.unlockuifunction !== undefined) {
          serviceProceedInputs.unlockuifunction(log);
        }
        // Generic snack for unsupported api response type
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.api.unmanagedtype",
          },
        });
      }
      return;
    } else {
      // When proceed outcome is false
      if (proceedCheckOutcome.errors.length > 0) {
        if (serviceProceedInputs.unlockuifunction !== undefined) {
          serviceProceedInputs.unlockuifunction(log);
        }
        // Generic snack with details
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.withdetails",
            details: proceedCheckOutcome.errors,
          },
        });
      }
      // Manage confirmation
      if (proceedCheckOutcome.confirmation !== undefined) {
        serviceProceedInputs.manageconfirmation(
          proceedCheckOutcome.confirmation,
          log,
        );
      }
      return;
    }
  } catch (err) {
    // Generic error log
    log.push({
      date: new Date(),
      message: "serviceProceed caught error",
      error: err,
      tags: ["error"],
    });
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("service caught error");
      console.log(err);
    }
    console.log(log);
    // Post error command
    if (serviceProceedInputs.unlockuifunction !== undefined) {
      serviceProceedInputs.unlockuifunction(log);
    }
    // Generic error network snack
    appStore.dispatch({
      type: "sliceSnack/change",
      payload: {
        uid: random_id(),
        id: "generic.snack.api.errornetwork",
      },
    });
    return;
  }
}

export default serviceProceed;
