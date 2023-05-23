// Services
import serviceTableDelete from "./serviceTableDelete.js";

function serviceProceedCheck(table, callback) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceProceedCheck");
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

  // Empty use list at create?
  if (table.players.length === 0) {
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

  // Outcome
  return {
    stateChanges: stateChanges,
    proceed: proceed,
    errors: errors,
    confirmation: confirmation,
  };
}

export default serviceProceedCheck;
