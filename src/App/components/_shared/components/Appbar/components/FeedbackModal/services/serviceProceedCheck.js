function serviceProceedCheck(feedback) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("serviceProceedCheck");
    }
    let proceed = true;
    let errors = [];
    let stateChanges = {};
  
    // Checks
  
    // Is source missing?
    if (
        feedback.source === undefined ||
        feedback.source === ""
    ) {
      proceed = false;
      errors.push("feedback.error.missingsource");
    }
    // Is tag missing?
    if (
        feedback.tag === undefined ||
        feedback.tag === ""
    ) {
    proceed = false;
    errors.push("feedback.error.missingtag");
    }
    // Is userid missing?
    if (
        feedback.userid === undefined ||
        feedback.userid === ""
    ) {
    proceed = false;
    errors.push("feedback.error.missinguserid");
    }
    
    
    // Is text missing?
    if (
        (feedback.text === undefined ||
        feedback.text === "") 
        && feedback.source === "open"
    ) {
        proceed = false;
        errors.push("feedback.error.missingmessage");
        if (stateChanges.errors === undefined) {
            stateChanges.errors = {};
        }
        stateChanges.errors.text = true;
    }
    // Is consent missing?
    if (
        feedback.consent === undefined ||
        feedback.consent === false
    ) {
        proceed = false;
        errors.push("feedback.error.missingconsent");
        if (stateChanges.errors === undefined) {
            stateChanges.errors = {};
        }
        stateChanges.errors.consent = true;
    }
  
    // Outcome
    return {
      stateChanges: stateChanges,
      proceed: proceed,
      errors: errors,
    };
  }
  
  export default serviceProceedCheck;
  