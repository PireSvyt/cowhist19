// Inputs
import serviceProceedInputs from "./serviceProceed.inputs.js";
// Services
import serviceProceedCheck from "./serviceProceedCheck.js";
// Shared
import { random_id } from "../shared/services/toolkit.js";
// Reducers
import appStore from "../store/appStore.js";

async function serviceProceed(scope, log=[]) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceProceed");
  }

  try {
    if (Object.keys(serviceProceedInputs).includes(scope)) {
        // Lock UI
        serviceProceedInputs[scope].lockuifunction(log)
        
        // Inputs management
        let serviceInputs = serviceProceedInputs[scope].getinputsfunction(log);
        if (serviceProceedInputs[scope].repackagingfunction !== undefined) {
            serviceInputs = serviceProceedInputs[scope].repackagingfunction(serviceInputs, log);
        }
        
        // Inputs checks
        let proceedCheckOutcome = serviceProceedCheck(serviceInputs, serviceProceedInputs[scope].sercivechecks);
        if (proceedCheckOutcome.stateChanges !== undefined) {
            appStore.dispatch({
                type: serviceProceedInputs[scope].getcheckoutcomedispatchfunction(log),
                payload: proceedCheckOutcome.stateChanges,
            });
        }
        if (proceedCheckOutcome.proceed === true) {
            // Prep
  
            // API call
            let  proceedResponse = await serviceProceedInputs[scope].apicall(serviceInputs.inputs, log);

            // Response management
            let manageresponsefunction = serviceProceedInputs[scope].getmanageresponsefunction(proceedResponse.type, log)
            //console.log("manageresponsefunction",manageresponsefunction)
            if (manageresponsefunction !== undefined) {
                manageresponsefunction(log)
            } else {
                serviceProceedInputs[scope].unlockuifunction(log)
                // Generic snack for unsupported api response type
                appStore.dispatch({
                    type: "sliceSnack/change",
                    payload: {
                    uid: random_id(),
                    id: "generic.snack.api.unmanagedtype",
                    },
                });
            }
            return
            
        } else {
            // When proceed outcome is false
            if (proceedCheckOutcome.errors.length > 0) {
                serviceProceedInputs[scope].unlockuifunction(log)
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
                serviceProceedInputs[scope].manageconfirmation(proceedCheckOutcome.confirmation, log)
            }
            return
        }
    } else {
        log.push({
            date: new Date (),
            message: "serviceProceed unrecognized scope : " + scope,
            tags: ["out of scope"]
        })
        if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("serviceProceed.scope not recognized : ", scope)
        }
        return
    }
  } catch (err) {
    // Generic error log
    log.push({
        date: new Date (),
        message: "serviceProceed caught error",
        error: err,
        tags: ["error"]
    })
    if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("service caught error");
        console.log(err);
    }
    // Post error command
    serviceProceedInputs[scope].unlockuifunction(log)
    // Generic error network snack
    appStore.dispatch({
        type: "sliceSnack/change",
        payload: {
            uid: random_id(),
            id: "generic.snack.api.errornetwork",
        },
    });
    return
  }
}

export default serviceProceed;
