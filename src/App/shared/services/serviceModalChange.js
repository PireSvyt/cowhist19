function serviceModalChange(target, previousValue) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceModalChange");
  }
  let newValue = previousValue;
  let errors = [];
  let stateChanges = {};

  switch (target.name) {
    case "name":
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("change name : " + target.value);
      }
      stateChanges.nameError = false;
      newValue.name = target.value;
      break;
    case "pseudo":
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("change pseudo : " + target.value);
      }
      stateChanges.pseudoError = false;
      newValue.pseudo = target.value;
      break;
    case "login":
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("change login : " + target.value);
      }
      stateChanges.loginError = false;
      newValue.login = target.value;
      break;
    case "password":
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("change password : " + target.value);
      }
      stateChanges.passwordError = false;
      newValue.password = target.value;
      break;
    case "repeatpassword":
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("change repeatpassword : " + target.value);
      }
      stateChanges.repeatpasswordError = false;
      newValue.repeatpassword = target.value;
      break;
    case "acknowledgement":
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("change acknowledgement : " + target.checked);
      }
      stateChanges.acknowledgementError = false;
      newValue.acknowledgement = target.checked;
      break;
    default:
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("/!\\ no match : " + target.name);
      }
      errors.push("generic-error-invalidchange");
  }

  return {
    stateChanges: stateChanges,
    newValue: newValue,
    errors: errors,
  };
}

export default serviceModalChange;
