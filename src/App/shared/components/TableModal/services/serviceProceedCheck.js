function serviceProceedCheck(table, callback) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceProceedCheck");
  }
  let proceed = true;
  let errors = [];
  let stateChanges = {};

  // Checks

  // Missing name?
  if (table.name === undefined || table.name === "") {
    proceed = false;
    errors.push("table.error.missingname");
    stateChanges.nameError = true;
  }

  // Empty use list at create?
  if (table.players.length === 0) {
    proceed = false;
    if (table._id === "" || table._id === undefined) {
      errors.push("table.error.creationwithoutplayers");
      stateChanges.playersError = true;
    } else {
      stateChanges.openConfirmModal = true;
      stateChanges.confirmModalTitle = "table.confirm.deletenoeusers.title";
      stateChanges.confirmModalContent = "table.confirm.deletenoeusers.content";
      stateChanges.confirmModalCTA = [
        {
          label: "generic.button.cancel",
          callback: () => callback("close"),
        },
        {
          label: "generic.button.proceed",
          callback: () => callback("delete"),
          variant: "contained",
          color: "error",
        },
      ];
    }
  }

  // Outcome
  return {
    stateChanges: stateChanges,
    proceed: proceed,
    errors: errors,
  };
}

export default serviceProceedCheck;
