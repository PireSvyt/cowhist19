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
    console.log(">> failedCheck", check)
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
      console.log(">> >> serviceProceedCheck checkField", field)
    }
    let fieldIsOK = true;
    if (field === undefined || field === null) {
      console.log(">> >> serviceProceedCheck undefined field", field)
      failedCheck(check);
      fieldIsOK = false;
    } else {
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
          console.log(">> >> serviceProceedCheck checkfunction", check.checkfunction, serviceInputs)
        }
        let checkFunctionOutcome = check.checkfunction(serviceInputs)
        console.log(">> >> serviceProceedCheck.checkfunction ", check, checkFunctionOutcome)
        if (checkFunctionOutcome.proceed === false) {
          console.log(">> >> serviceProceedCheck.checkfunction proceed = false")
          failedCheck(check)
          console.log(">> >> serviceProceedCheck.checkfunction errors", checkFunctionOutcome.errors)
          checkFunctionOutcome.errors.forEach(err => {
            errors.push(err)
          })
          Object.keys(checkFunctionOutcome.stateChanges).forEach(key => {
            stateChanges[key] = checkFunctionOutcome.stateChanges[key]
          })
          fieldIsOK = false;
        }
        if (debugProceedCheck) {
          console.log(">> >> serviceProceedCheck checkfunction outcome", checkFunctionOutcome)
        }
      }
      if (debugProceedCheck) {
        console.log(">> >> serviceProceedCheck fieldIsOK", fieldIsOK)
      }
      // Subsequent checks
      if (fieldIsOK && check.subchecks !== undefined) {
        if (debugProceedCheck) {
          console.log(">> >> serviceProceedCheck >> subchecks *** BEGIN ***")
          console.log(">> >> >> check.subchecks", check.subchecks)
          console.log(">> >> >> field", field)
        }
        check.subchecks.forEach((subcheck) => {
          console.log(">> >> >> subcheck", subcheck)
          if (subcheck.field !== undefined) {
            console.log(">> >> >> subcheck subfield", field[subcheck.field])
            checkField(field[subcheck.field], subcheck);
          } else {
            console.log(">> >> >> subcheck field")
            checkField(field, subcheck);
          }
        });
        if (debugProceedCheck) {
          console.log(">> >> serviceProceedCheck >> subchecks *** END ***")
          console.log(">> >> serviceProceedCheck current outcome", {
            stateChanges: stateChanges,
            proceed: proceed,
            errors: errors,
            confirmation: confirmation,
          })
        }
      }
    }
  }

  // Run checks
  if (debugProceedCheck) {
    console.log(">> >> serviceProceedChecks ")
  }
  serciveChecks.forEach((check) => {
    if (debugProceedCheck) {
      console.log(">> >> serviceProceedCheck check ", check, serviceInputs[check.field])
    }
    checkField(serviceInputs[check.field], check);
  });
  if (debugProceedCheck) {
    console.log("*********** serviceProceedCheck.outcome ", {
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
