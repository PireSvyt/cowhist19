// Services
import apiActivate from "./apiActivate";

async function serviceActivate() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceActivate");
  }

  try {
    let callbacks = [];
    let errors = [];
    let stateChanges = {};

    // Prep
    let regToken = window.location.href.split("/activation/")[1];

    // API call
    let data = await apiActivate(regToken);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "auth.activate.success.activated":
        stateChanges.outcome = "activated";
        break;
      case "auth.activate.success.alreadyctivated":
        stateChanges.outcome = "activated";
        break;
      case "auth.activate.error.notfound":
        stateChanges.outcome = "error";
        break;
      case "auth.activate.error.onsave":
        stateChanges.outcome = "error";
        break;
      default:
        stateChanges.outcome = "error";
    }

    // Response
    return {
      stateChanges: stateChanges,
      callbacks: callbacks,
      errors: errors,
    };
  } catch (err) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("service caught error");
      console.log(err);
    }
    // Error network
    return {
      stateChanges: {
        disabled: false,
        loading: false,
        openSnack: true,
        snack: {
          uid: random_id(),
          id: "generic-snack-api-errornetwork",
        },
      },
      callbacks: [],
      errors: [],
    };
  }
}

export default serviceActivate;
