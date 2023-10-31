import { jwtDecode } from "jwt-decode";

// Services
import serviceAccessDeny from "./serviceAccessDeny.js";
// Shared
import serviceGetUserDetails from "./serviceGetUserDetails.js";
// Reducers
import appStore from "../../store/appStore.js";

async function serviceGrantAccess(token) {
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
    serviceAccessDeny();
  } else {
    let decodedtoken = jwtDecode(token);
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
      serviceGetUserDetails();
    } else {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("invalid status");
      }
      errors.push("generic.error.invalidstatus");
      serviceAccessDeny();
    }
  }

  return {
    stateChanges: stateChanges,
    callbacks: callbacks,
    errors: errors,
  };
}

export default serviceGrantAccess;
