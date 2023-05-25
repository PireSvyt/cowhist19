function serviceModalChange(target, previousValue, complement) {
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
      stateChanges.errors.name = false;
      break;
    case "pseudo":
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("change pseudo : " + target.value);
      }
      stateChanges.pseudoError = false;
      newValue.pseudo = target.value;
      stateChanges.errors.pseudo = false;
      break;
    case "login":
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("change login : " + target.value);
      }
      stateChanges.loginError = false;
      stateChanges.login = target.value;
      stateChanges.errors.login = false;
      newValue.login = target.value;
      break;
    case "password":
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("change password : " + target.value);
      }
      stateChanges.passwordError = false;
      stateChanges.password = target.value;
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
    case "contract":
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("change contract : " + target.value);
      }
      newValue.contract = target.value;
      // Adjust requirements
      let contract = complement.contracts.filter(
        (c) => c.key === newValue.contract
      )[0];
      stateChanges.contractError = false;
      stateChanges.attackRequirement = "(" + contract.attack + ")";
      stateChanges.defenseRequirement = "(" + contract.defense + ")";
      break;
    case "attack":
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("change attack : ");
        console.log(target.value);
      }
      let currentDefense = newValue.players.filter(
        (player) => player.role === "defense"
      );
      target.value.forEach((attackant) => {
        currentDefense.push({
          _id: attackant._id,
          pseudo: attackant.pseudo,
          role: "attack",
        });
      });
      newValue.players = currentDefense;
      stateChanges.attackError = false;
      break;
    case "defense":
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("change defense : ");
        console.log(target.value);
      }
      let currentAttack = newValue.players.filter(
        (player) => player.role === "attack"
      );
      target.value.forEach((defenser) => {
        currentAttack.push({
          _id: defenser._id,
          pseudo: defenser.pseudo,
          role: "defense",
        });
      });
      newValue.players = currentAttack;
      stateChanges.defenseError = false;
      break;
    case "outcome":
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("change outcome : " + target.value);
      }
      newValue.outcome = target.value;
      stateChanges.outcomeError = false;
      break;
    default:
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("/!\\ no match : " + target.name);
      }
      errors.push("generic.error.invalidchange");
  }

  return {
    stateChanges: stateChanges,
    newValue: newValue,
    errors: errors,
  };
}

export default serviceModalChange;
