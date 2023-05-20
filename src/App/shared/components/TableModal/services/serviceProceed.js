// Services
import apiTableSave from "./apiTableSave.js";
import serviceProceedCheck from "./serviceProceedCheck.js";
// Shared
import { random_id } from "../../../services/toolkit.js";
// Reducers
import appStore from "../../../../store/appStore.js";

async function serviceProceed(table) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceProceed");
  }

  try {
    // Lock UI
    appStore.dispatch({ type: "sliceTableModal/lock" });
    let tableInputs = { ...appStore.getState().sliceTableModal.inputs };

    // Check inputs
    let proceedCheckOutcome = serviceProceedCheck(tableInputs);
    appStore.dispatch({
      type: "sliceTableModal/change",
      payload: proceedCheckOutcome.stateChanges,
    });

    if (proceedCheckOutcome.proceed === true) {
      // Prep
      tableInputs.users = tableInputs.players;

      // API call
      const data = await apiTableSave(tableInputs);
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("data.type : " + data.type);
      }

      // Response management
      switch (data.type) {
        case "table.save.success.created":
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "table.snack.saved",
            },
          });
          window.location = "/table/" + data.data.id;
          break;
        case "table.save.success.modified":
          appStore.dispatch({
            type: "sliceTableModal/change",
            payload: {
              disabled: false,
              loading: false,
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "table.snack.saved",
            },
          });

          //callbacks.push({ key: "updatetable" });
          break;
        case "table.save.error.oncreate":
          appStore.dispatch({
            type: "sliceTableModal/change",
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
            type: "sliceTableModal/change",
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
          type: "sliceTableModal/change",
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
      type: "sliceTableModal/change",
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
