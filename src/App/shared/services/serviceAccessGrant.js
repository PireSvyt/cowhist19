import jwt_decode from "jwt-decode";

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
    let decodedtoken = jwt_decode(token);
    // User status tollgate
    if (
      decodedtoken.status === "registered" ||
      decodedtoken.status === "signedup"
    ) {
      // Then update variables to signed in
      appStore.dispatch({
        type: "sliceUser/signin",
        payload: {
          token: token,
          decodedtoken: decodedtoken,
        },
      });
      //
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
