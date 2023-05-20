// Services
import apiTableDetails from "../../../shared/services/apiTableDetails.js";

// Reducers
import appStore from "../../../store/appStore.js";

async function serviceTableDetails() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableDetails");
  }

  try {
    let callbacks = [];
    let errors = [];
    let stateChanges = {};

    // Initialize
    let id = window.location.href.split("/table/")[1];

    // API call
    const data = await serviceTableDetails(id);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "table.details.success":
        appStore.dispatch({
          type: "tableDetails/set",
          payload: data.data.table,
        });
        break;
      case "table.details.error.onaggregate":
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "generic.snack.error",
        };
        break;
      case "table.details.error.onfind":
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "generic.snack.error",
        };
        break;
      default:
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "generic.snack.api.unmanagedtype",
          details: data.type,
        };
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

export default serviceTableDetails;
