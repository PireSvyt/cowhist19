let debugProceedCheck = true

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
    if (debugProceedCheck) {
      console.log("serviceProceedCheck.checkField ", field, check)
    }
    if (field === undefined || field === null) {
      failedCheck(check);
    } else {
      let fieldIsOK = true;
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
        if (debugProceedCheck) {
          console.log("serviceProceedCheck.checkField.checkfunction", check.checkfunction, serviceInputs)
        }
        if (check.checkfunction(serviceInputs) === "fail") {
          failedCheck(check);
          fieldIsOK = false;
        }
      }
      if (debugProceedCheck) {
        console.log("serviceProceedCheck.checkField fieldIsOK", fieldIsOK)
      }
      // Subsequent checks
      if (fieldIsOK && check.subchecks !== undefined) {
        if (debugProceedCheck) {
          console.log("serviceProceedCheck.checkField.subchecks")
        }
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
  if (debugProceedCheck) {
    console.log("serviceProceedCheck ", serviceInputs, serciveChecks)
  }
  serciveChecks.forEach((check) => {
    if (debugProceedCheck) {
      console.log("serviceProceedCheck.check ", check)
    }
    checkField(serviceInputs[check.field], check);
  });
  if (debugProceedCheck) {
    console.log("serviceProceedCheck.outcome ", {
      stateChanges: stateChanges,
      proceed: proceed,
      errors: errors,
      confirmation: confirmation,
    })
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
