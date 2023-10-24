// APIs
import {
  apiTableCreate,
  apiTableSave,
  apiTableGetDetails,
  apiTableGetHistory,
  apiTableGetStats,
  apiTableDelete,
} from "../../api/table.api";
// Services
import { random_id } from "../_miscelaneous/toolkit.js";
// Reducers
import appStore from "../../../../store/appStore.js";

export async function serviceTableCreate() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableCreate");
  }
}

export async function serviceTableUpdate() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableUpdate");
  }

  let tableUpdateInputs = {
    lockuifunction: (log) => {
      log.push({
        date: new Date(),
        message: "serviceProceed.lockuifunction",
        tags: ["function"],
      });
      appStore.dispatch({ type: "sliceTableModal/lock" });
    },
    unlockuifunction: (log) => {
      log.push({
        date: new Date(),
        message: "serviceProceed.unlockuifunction",
        tags: ["function"],
      });
      appStore.dispatch({
        type: "sliceTableModal/change",
        payload: {
          disabled: false,
          loading: false,
        },
      });
    },
    getinputsfunction: (log) => {
      log.push({
        date: new Date(),
        message: "serviceProceed.getinputsfunction",
        tags: ["function"],
      });
      return {
        inputs: { ...appStore.getState().sliceTableModal.inputs },
      };
    },
    sercivechecks: [
      {
        // Check inputs root is available
        field: "inputs",
        error: "table.error.missinginputs",
        subchecks: [
          {
            // Check contract is available
            field: "name",
            error: "table.error.missingname",
            fieldsinerror: ["name"],
          },
          {
            // Checking players is a non empty list
            field: "players",
            error: "table.error.missingplayers",
            fieldsinerror: ["players"],
            confirmation: "delete table confirmation",
          },
        ],
      },
    ],
    getcheckoutcomedispatchfunction: (log) => {
      log.push({
        date: new Date(),
        message: "serviceProceed.getcheckoutcomedispatchfunction",
        tags: ["function"],
      });
      return "sliceTableModal/change";
    },
    apicall: (inputs, log) => {
      log.push({
        date: new Date(),
        message: "serviceProceed.apicall",
        inputs: inputs,
        tags: ["function"],
      });
      apiTableSave(inputs, appStore.getState().sliceUserAuth.token);
    },
    getmanageresponsefunction: (response, log) => {
      log.push({
        date: new Date(),
        message: "serviceProceed.getmanageresponsefunction",
        response: response,
        tags: ["function"],
      });
      let responses = {
        "table.save.success.created": () => {
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "table.snack.saved",
            },
          });
          window.location = "/table/" + data.data.id;
        },
        "table.save.success.modified": () => {
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
        },
        "table.save.error.oncreate": () => {
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
        },
      };
      return responses[response];
    },
    manageconfirmation: (confirmation, log) => {
      log.push({
        date: new Date(),
        message: "serviceProceed.manageconfirmation",
        confirmation: confirmation,
        tags: ["function"],
      });
      if (confirmation === "delete table confirmation") {
        appStore.dispatch({
          type: "sliceTableModal/change",
          payload: {
            deleteConfirmOpen: true,
          },
        });
      }
    },
  };
}

export async function serviceTableGetDetails() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableGetDetails");
  }

  try {
    // Lock UI
    appStore.dispatch({ type: "sliceTableDetails/lock" });

    // Initialize
    let id = window.location.href.split("/table/")[1];

    // API call
    const data = await apiTableGetDetails(id);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "table.details.success":
        appStore.dispatch({
          type: "sliceTableDetails/set",
          payload: data.data.table,
        });
        break;
      case "table.details.error.onaggregate":
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
        break;
      case "table.details.error.onfind":
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
        break;
      case "table.details.error.deniedaccess":
        appStore.dispatch({
          type: "sliceTableDetails/deny",
        });
        break;
      default:
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.api.unmanagedtype",
          },
        });
    }
  } catch (err) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("service caught error");
      console.log(err);
    }
    appStore.dispatch({
      type: "sliceSnack/change",
      payload: {
        uid: random_id(),
        id: "generic.snack.error.unknown",
      },
    });
  }
}

export async function serviceTableGetHistory() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableGetHistory");
  }

  try {
    // Lock UI
    appStore.dispatch({ type: "sliceTableHistory/lock" });

    // Initialize
    let id = window.location.href.split("/table/")[1];
    let parameters = {
      need: "list",
      games: {
        index: 0,
        number: 20,
      },
    };

    // API call
    const data = await apiTableGetHistory(id, parameters);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "table.history.success":
        appStore.dispatch({
          type: "sliceTableHistory/set",
          payload: data.data.games,
        });
        break;
      case "table.history.accessdenied.noneed":
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
        break;
      case "table.history.accessdenied.needmissmatch":
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
        break;
      case "table.history.error.findinggames":
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
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.api.unmanagedtype",
          },
        });
    }
  } catch (err) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("service caught error");
      console.log(err);
    }
    appStore.dispatch({
      type: "sliceSnack/change",
      payload: {
        uid: random_id(),
        id: "generic.snack.error.unknown",
      },
    });
  }
}

export async function serviceTableGetStats() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableGetStats");
  }

  try {
    // Lock UI
    appStore.dispatch({ type: "sliceTableStats/lock" });

    // Initialize
    let id = window.location.href.split("/table/")[1];
    let parameters = {
      need: "ranking",
    };

    // API call
    const data = await apiTableGetStats(id, parameters);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "table.stats.success":
        let stats = data.data.stats;
        let playerids = appStore
          .getState()
          .sliceTableDetails.players.map((p) => p._id);
        stats.ranking = stats.ranking.filter((rank) =>
          playerids.includes(rank._id),
        );
        // Outcome
        appStore.dispatch({
          type: "sliceTableStats/set",
          payload: stats,
        });
        break;
      case "table.stats.error":
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
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.api.unmanagedtype",
          },
        });
    }
  } catch (err) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("service caught error");
      console.log(err);
    }
    appStore.dispatch({
      type: "sliceSnack/change",
      payload: {
        uid: random_id(),
        id: "generic.snack.error.unknown",
      },
    });
  }
}

export async function serviceTableDelete(tableid) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableDelete");
  }

  try {
    // API call
    let data = await apiTableDelete(tableid);
    switch (data.type) {
      case "table.delete.success":
        /*appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "table.snack.deleted",
            },
          });*/
        window.location = "/";
        break;
      case "table.delete.errorondelete":
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
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.api.unmanagedtype",
          },
        });
    }
  } catch (err) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("service caught error");
      console.log(err);
    }
    // Error network
    appStore.dispatch({
      type: "sliceSnack/change",
      payload: {
        uid: random_id(),
        id: "generic.snack.api.errornetwork",
      },
    });
  }
}
