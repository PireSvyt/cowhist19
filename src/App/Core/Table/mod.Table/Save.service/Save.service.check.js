// Reducers
import appStore from "../../../../../../../store/appStore";

function SaveServiceCheck(table, callback) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("SaveServiceCheck");
  }
  let proceed = true;
  let errors = [];
  let stateChanges = {};
  let confirmation = {};

  // Checks

  // Missing name?
  if (table.name === undefined || table.name === "") {
    proceed = false;
    errors.push("table.error.missingname");
    if (stateChanges.errors === undefined) {
      stateChanges.errors = {};
    }
    stateChanges.errors.name = true;
  }

  // Missing guests?
  if (table.guests === undefined || table.guests === "") {
    proceed = false;
    errors.push("table.error.missingguests");
    if (stateChanges.errors === undefined) {
      stateChanges.errors = {};
    }
    stateChanges.errors.guests = true;
  }

  // Empty use list at create?
  if (table.players.filter(p => p.status !== "guest").length === 0) {
    proceed = false;
    if (table._id === "" || table._id === undefined) {
      errors.push("table.error.creationwithoutplayers");
      if (stateChanges.errors === undefined) {
        stateChanges.errors = {};
      }
      stateChanges.errors.players = true;
    } else {
      // Save confirm would delete table
      if (stateChanges.errors === undefined) {
        stateChanges.errors = {};
      }
      stateChanges.errors.players = true;
      confirmation.required = true;
    }
  }

  // Creation without user?
  if (table._id === "" && table.players.length > 0) {
    let userId = appStore.getState().sliceUserDetails.id;
    if (
      table.players.filter((player) => {
        return player._id === userId;
      }).length === 0
    ) {
      if (stateChanges.errors === undefined) {
        stateChanges.errors = {};
      }
      errors.push("table.error.creationwithoutuser");
      stateChanges.errors.players = true;
      proceed = false;
    }
  }

  // Outcome
  return {
    stateChanges: stateChanges,
    proceed: proceed,
    errors: errors,
    confirmation: confirmation,
  };
}

export default SaveServiceCheck;
