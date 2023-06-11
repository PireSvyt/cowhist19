// Services
import apiGameSave from "./apiGameSave.js";
import serviceProceedCheck from "./serviceProceedCheck.js";
// Shared
import { random_id } from "../../../../../shared/services/toolkit.js";
// Reducers
import appStore from "../../../../../store/appStore.js";

async function serviceProceed() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceProceed");
  }

  try {
    // Lock UI
    appStore.dispatch({ type: "sliceGameModal/lock" });
    let gameInputs = { ...appStore.getState().sliceGameModal.inputs };
    const gameId = appStore.getState().sliceGameModal.id;
    const tableId = appStore.getState().sliceTableDetails.id;
    gameInputs._id = gameId;
    gameInputs.table = tableId;

    // Check inputs
    let proceedCheckOutcome = serviceProceedCheck(
      gameInputs,
      appStore.getState().sliceTableDetails.contracts
    );
    appStore.dispatch({
      type: "sliceGameModal/change",
      payload: proceedCheckOutcome.stateChanges,
    });

    if (proceedCheckOutcome.proceed === true) {
      // Prep
      // Store guest users as nonuser : guest
      gameInputs.players.forEach(player => {
        if (player.status === "guest") {
          player.nonuser = "guest"
        }
        // Lighten paylod
        delete player.pseudo
        delete player.status
      });

      // API call
      const data = await apiGameSave(gameInputs);
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("data.type : " + data.type);
      }

      // Response management
      switch (data.type) {
        case "game.save.success.created":
          appStore.dispatch({
            type: "sliceGameModal/change",
            payload: {
              open: false,
              disabled: false,
              loading: false,
              inputs: {
                contract: "",
                players: [],
                outcome: 0,
              },
              errors: {
                contract: false,
                attack: false,
                defense: false,
                outcome: false,
              },
              requirements: {
                attack: "",
                defense: "",
                outcome: "",
              },
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "game.snack.saved",
            },
          });
          appStore.dispatch({
            type: "sliceTableStats/unload",
          });
          appStore.dispatch({
            type: "sliceTableHistory/unload",
          });
          break;
        case "game.save.success.modified":
          appStore.dispatch({
            type: "sliceGameModal/change",
            payload: {
              disabled: false,
              loading: false,
              inputs: {
                contract: "",
                players: [],
                outcome: 0,
              },
              errors: {
                contract: false,
                attack: false,
                defense: false,
                outcome: false,
              },
              requirements: {
                attack: "",
                defense: "",
                outcome: "",
              },
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "game.snack.saved",
            },
          });
          break;

        //callbacks.push({ key: "updategames" });

        case "game.save.error.oncreate":
          appStore.dispatch({
            type: "sliceGameModal/change",
            payload: {
              disabled: false,
              loading: false,
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "generic.snack.error.wip",
            },
          });
          break;
        case "game.save.error.onmodify":
          appStore.dispatch({
            type: "sliceGameModal/change",
            payload: {
              disabled: false,
              loading: false,
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "generic.snack.error.wip",
            },
          });
          break;
        default:
          appStore.dispatch({
            type: "sliceGameModal/change",
            payload: {
              disabled: false,
              loading: false,
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "generic.snack.api.unmanagedtype",
            },
          });
      }
    } else {
      if (proceedCheckOutcome.errors.length > 0) {
        appStore.dispatch({
          type: "sliceGameModal/change",
          payload: {
            disabled: false,
            loading: false,
          },
        });
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.withdetails",
            details: proceedCheckOutcome.errors,
          },
        });
      }
    }
  } catch (err) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("service caught error");
      console.log(err);
    }
    // Error network
    appStore.dispatch({
      type: "sliceGameModal/change",
      payload: {
        disabled: false,
        loading: false,
      },
    });
    appStore.dispatch({
      type: "sliceSnack/change",
      payload: {
        uid: random_id(),
        id: "generic.snack.api.errornetwork",
      },
    });
  }
}

export default serviceProceed;
