// Services
import apiGameSave from "./apiGameSave.js";
// Resources
import emptyGame from "../resources/emptyGame.js";
// Shared
import { random_id } from "../../../../../shared/services/toolkit.js";

async function serviceGameSave(token, game) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceGameSave");
  }

  try {
    let callbacks = [];
    let errors = [];
    let stateChanges = {};

    // Prep

    // API call
    const data = await apiGameSave(token, game);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "game.save.success.created":
        stateChanges.game = emptyGame;
        stateChanges.disabled = false;
        stateChanges.loading = false;
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "game.snack.saved",
        };
        callbacks.push({ key: "updategames" });
        break;
      case "game.save.success.modified":
        stateChanges.game = emptyGame;
        stateChanges.disabled = false;
        stateChanges.loading = false;
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "game.snack.saved",
        };
        callbacks.push({ key: "updategames" });
        break;
      case "game.save.error.oncreate":
        stateChanges.disabled = false;
        stateChanges.loading = false;
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "game.snack.error.wip",
        };
        break;
      case "game.save.error.onmodify":
        stateChanges.disabled = false;
        stateChanges.loading = false;
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "game.snack.error.wip",
        };
        break;
      default:
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "generic.snack.api.unmanagedtype",
          details: data.type,
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
    }

    // Response
    return {
      stateChanges: stateChanges,
      callbacks: callbacks,
      errors: errors,
    };
  } catch (err) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("service caught error");
      console.log(err);
    }
    // Error network
    return {
      stateChanges: {
        disabled: false,
        loading: false,
        openSnack: true,
        snack: {
          uid: random_id(),
          id: "generic.snack.api.errornetwork",
        },
      },
      callbacks: [],
      errors: [],
    };
  }
}

export default serviceGameSave;
