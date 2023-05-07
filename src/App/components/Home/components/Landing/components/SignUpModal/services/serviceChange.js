function serviceChange(target, previousValue) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceChange");
  }
  let newValue = previousValue;
  let errors = [];
  let stateChanges = {};

  switch (target.name) {
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
    case "password1":
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("change password1 : " + target.value);
      }
      stateChanges.passwordError = false;
      newValue.password1 = target.value;
      break;
    case "password2":
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("change password2 : " + target.value);
      }
      stateChanges.repeatPasswordError = false;
      newValue.password2 = target.value;
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

export default serviceChange;
