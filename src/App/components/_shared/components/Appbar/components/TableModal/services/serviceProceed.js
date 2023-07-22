// Services
import apiTableSave from "./apiTableSave.js";
import serviceProceedCheck from "./serviceProceedCheck.js";
// Shared
import { random_id } from "../../../../../../../services/_shared/toolkit.js";
import serviceGetTableDetails from "../../../../../../Table/services/serviceGetTableDetails.js"
// Reducers
import appStore from "../../../../../../../store/appStore.js";

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
      tableInputs.users = tableInputs.players.filter((player) => player.status !== "guest");
      // Lighten payload
      delete tableInputs.players

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
          return { type: "success" };
          break;
        case "table.save.success.modified":
          appStore.dispatch({
            type: "sliceTableModal/change",
            payload: {
              open: false,
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
          // Update table
          serviceGetTableDetails().then(() => {
            appStore.dispatch({
              type: "sliceTableStats/unload",
            });
            appStore.dispatch({
              type: "sliceTableHistory/unload",
            });
          });
          return { type: "success" };
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
          return { type: "error" };
          break;
        case "table.save.error.emptyid":
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
          return { type: "error" };
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
          return { type: "error" };
      }
    } else {
      appStore.dispatch({
        type: "sliceTableModal/change",
        payload: {
          disabled: false,
          loading: false,
        },
      });
      if (proceedCheckOutcome.errors.length > 0) {
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.withdetails",
            details: proceedCheckOutcome.errors,
          },
        });
        return { type: "error" };
      }
      if (proceedCheckOutcome.confirmation.required) {
        return { type: "confirmDelete" };
      }
      return { type: "error" };
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
    return { type: "error" };
  }
}

export default serviceProceed;
