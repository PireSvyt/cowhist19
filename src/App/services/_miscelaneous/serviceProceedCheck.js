function serviceProceedCheck(serviceInputs, serciveChecks) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceProceedCheck");
  }
  let proceed = true;
  let errors = [];
  let stateChanges = {};
  let confirmation = undefined;
  stateChanges.errors = {};

  // Check functions
  function failedCheck(check) {
    proceed = false;
    errors.push(check.error);
    // Fields to flag in error
    check.fieldsinerror.forEach((error) => {
      stateChanges.errors[error] = true;
    });
    // Trigger confirmation
    if (check.confirmation !== undefined) {
      confirmation = check.confirmation;
    }
  }
  function checkField(field, check) {
    //console.log("serviceProceedCheck.checkField ", field, check)
    if (field === undefined || field === null) {
      failedCheck(check);
    } else {
      let fieldIsOK = true;
      //console.log("typeof field ", typeof field)
      switch (typeof field) {
        case "string":
          if (field === "") {
            failedCheck(check);
            fieldIsOK = false;
          }
          break;
        case "number":
          if (field === null) {
            failedCheck(check);
            fieldIsOK = false;
          }
          break;
        case "object":
          if (Object.keys(field).length === 0) {
            failedCheck(check);
            fieldIsOK = false;
          }
          break;
        case "boolean":
          console.log("serviceProceedCheck.checkField.boolean",check)
          if (field !== true & field !== false) {
            failedCheck(check);
            fieldIsOK = false;
          }
          break;
        default:
          console.log(
            "serviceProceedCheck unmanaged field type : ",
            typeof field,
            " of inputs ",
            field,
          );
          failedCheck(check);
          fieldIsOK = false;
      }
      // Custom checks
      if (check.checkfunction !== undefined) {
        if (check.checkfunction(serviceInputs) === "fail") {
          failedCheck(check);
          fieldIsOK = false;
        }
      }
      // Subsequent checks
      if (fieldIsOK && check.subchecks !== undefined) {
        check.subchecks.forEach((subcheck) => {
          if (subcheck.field === undefined) {
            checkField(field, subcheck);
          } else {
            checkField(field[subcheck.field], subcheck);
          }
        });
      }
    }
  }

  // Run checks
  //console.log("serviceInputs", serviceInputs)
  serciveChecks.forEach((check) => {
    checkField(serviceInputs[check.field], check);
  });

  // Outcome
  return {
    stateChanges: stateChanges,
    proceed: proceed,
    errors: errors,
    confirmation: confirmation,
  };
}

export default serviceProceedCheck;
