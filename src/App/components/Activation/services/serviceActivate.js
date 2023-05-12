import axios from "axios";

async function serviceActivate() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceActivate");
  }

  try {
    let stateChanges = {};

    // Prep
    let regToken = window.location.href.split("/activation/")[1];

    // API call
    let res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/auth/v1/activate/" + regToken
    );
    switch (res.data.type) {
      case "auth.activate.success.activated":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("serviceActivate account activated");
        }
        stateChanges.outcome = "activated";
        break;
      case "auth.activate.success.alreadyctivated":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("serviceActivate account already activated");
        }
        stateChanges.outcome = "activated";
        break;
      case "auth.activate.error.notfound":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("serviceActivate error not found");
        }
        stateChanges.outcome = "error";
        break;
      case "auth.activate.error.onsave":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("serviceActivate error on save");
        }
        stateChanges.outcome = "error";
        break;
      default:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("serviceActivate error unknown");
        }
        stateChanges.outcome = "error";
    }

    // Response
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("serviceActivate return");
    }
    return {
      stateChanges: stateChanges,
    };
  } catch (err) {
    return {
      stateChanges: { outcome: "error" },
    };
  }
}

export default serviceActivate;
