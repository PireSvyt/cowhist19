// Services
import apiTableSave from "./apiTableSave.js";
import serviceProceedCheck from "./serviceProceedCheck.js";
// Shared
import { random_id } from "../../../services/toolkit.js";

async function serviceProceed( table) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceProceed");
  }

  try {
    let callbacks = [];
    let errors = [];
    let stateChanges = {};

    // Prep
    let tableToSave = table;
    tableToSave.users = table.players;

    // API call
    const data = await apiTableSave( tableToSave);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "table.save.success.created":
        callbacks.push({ key: "totable", option: data.data.id });
        break;
      case "table.save.success.modified":
        stateChanges.disabled = false;
        stateChanges.loading = false;
        callbacks.push({ key: "updatetable" });
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "table.snack.saved",
        };
        break;
      case "table.save.error.oncreate":
        stateChanges.disabled = false;
        stateChanges.loading = false;
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "generic.snack.error.wip",
        };
        break;
      default:
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "generic.snack.api.unmanagedtype",
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
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
          id: "generic.snack.api.errornetwork",
        },
      },
      callbacks: [],
      errors: [],
    };
  }
}

export default serviceProceed;
