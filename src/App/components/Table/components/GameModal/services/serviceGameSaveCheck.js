function serviceGameSaveCheck(game, contracts) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceGameSaveCheck");
  }
  let proceed = true;
  let errors = [];
  let stateChanges = {};

  // Checks

  // Is contract missing?
  if (
    game.contract === undefined ||
    game.contract === "" ||
    contracts.length === 0 ||
    contracts === undefined
  ) {
    proceed = false;
    errors.push("game-error-missingcontract");
    stateChanges.contractError = true;
  } else {
    // Contract behing defined, checking teams
    let contract = contracts.filter((c) => c.key === game.contract)[0];
    if (game.players === []) {
      proceed = false;
      errors.push(" Players empty");
    } else {
      // Is attack well formed?
      if (
        game.players.filter((player) => player.role === "attack").length !==
        contract.attack
      ) {
        proceed = false;
        errors.push("game-error-attackmissmatch");
        stateChanges.attackError = true;
      }

      // Is defense well formed?
      if (
        game.players.filter((player) => player.role === "defense").length !==
        contract.defense
      ) {
        proceed = false;
        errors.push("game-error-defensemissmatch");
        stateChanges.defenseError = true;
      }

      // Is outcome consistent?
      if (game.outcome + contract.folds > 13) {
        proceed = false;
        errors.push("game-error-outcomemissmatch");
        stateChanges.outcomeError = true;
      }
    }
  }

  // Outcome
  return {
    stateChanges: stateChanges,
    proceed: proceed,
    errors: errors,
  };
}

export default serviceGameSaveCheck;
