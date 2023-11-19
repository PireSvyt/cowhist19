// APIs
import {
  apiTableCreate,
  apiTableSave,
  apiTableGetDetails,
  apiTableGetHistory,
  apiTableGetStats,
  apiTableDelete,
} from "./table.api.js";
// Services
import { random_id } from "../_miscelaneous/toolkit.js";
// Reducers
import { setupStore } from "../../store/appStore.js";
let appStore = setupStore()

export const tableCreateInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "serviceTableCreate.lockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({ type: "sliceTableModal/lock" });
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "serviceTableCreate.unlockuifunction",
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
      message: "serviceTableCreate.getinputsfunction",
      tags: ["function"],
    });
    return {
      inputs: { ...appStore.getState().sliceTableModal.inputs },
      userid: appStore.getState().sliceUserDetails.id,
    };
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: "inputs",
      error: "table.error.missinginputs",
      subchecks: [
        {
          // Check name is available
          field: "name",
          error: "table.error.missingname",
          fieldsinerror: ["name"],
        },
        {
          // Check guests is available
          field: "guests",
          error: "table.error.missingguests",
          fieldsinerror: ["guests"],
        },
        {
          // Checking players is a non empty list
          field: "players",
          error: "table.error.missingplayers",
          fieldsinerror: ["players"],
          subchecks: [
            {
              // Check that players list is not empty
              checkfunction: (serviceInputs) => {
                if (serviceInputs.inputs.players.length === 0) {
                  return "fail";
                } else {
                  return "pass";
                }
              },
              error: "table.error.creationwithoutplayers",
              fieldsinerror: ["players"],
              subchecks: [
                {
                  // Check that players list is not empty
                  checkfunction: (serviceInputs) => {
                    if (
                      serviceInputs.inputs.players.filter((p) => {
                        return p._id === serviceInputs.userid;
                      }).length === 0
                    ) {
                      return "fail";
                    } else {
                      return "pass";
                    }
                  },
                  error: "table.error.creationwithoutuser",
                  fieldsinerror: ["players"],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  getcheckoutcomedispatchfunction: (log) => {
    log.push({
      date: new Date(),
      message: "serviceTableCreate.getcheckoutcomedispatchfunction",
      tags: ["function"],
    });
    return "sliceTableModal/change";
  },
  apicall: (inputs, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableCreate.apicall",
      inputs: inputs,
      tags: ["function"],
    });
    apiTableCreate(inputs, appStore.getState().sliceUserAuth.token);
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableCreate.getmanageresponsefunction",
      response: response,
      tags: ["function"],
    });
    let responses = {
      "table.create.success.created": () => {
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
        serviceTableGetDetails().then(() => {
          appStore.dispatch({
            type: "sliceTableStats/unload",
          });
          appStore.dispatch({
            type: "sliceTableHistory/unload",
          });
        });
      },
      "table.create.error.idprovided": () => {
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
      "table.create.error.oncreate": () => {
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
    return responses[response]();
  },
};

export const tableSaveInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "serviceTableSave.lockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({ type: "sliceTableModal/lock" });
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "serviceTableSave.unlockuifunction",
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
      message: "serviceTableSave.getinputsfunction",
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
          // Check name is available
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
      message: "serviceTableSave.getcheckoutcomedispatchfunction",
      tags: ["function"],
    });
    return "sliceTableModal/change";
  },
  apicall: (inputs, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableSave.apicall",
      inputs: inputs,
      tags: ["function"],
    });
    apiTableSave(inputs, appStore.getState().sliceUserAuth.token);
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableSave.getmanageresponsefunction",
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
    return responses[response]();
  },
  manageconfirmation: (confirmation, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableSave.manageconfirmation",
      confirmation: confirmation,
      tags: ["function"],
    });
    if (confirmation === "delete table confirmation") {
      appStore.dispatch({
        type: "tableModalSlice/change",
        payload: {
          deleteConfirm: true,
        },
      });
    }
  },
};

export const tableGetDetailsInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetDetails.lockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({ type: "sliceTableDetails/lock" });
  },
  getinputsfunction: (log) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetDetails.getinputsfunction",
      tags: ["function"],
    });
    return {
      inputs: {
        tableid: window.location.href.split("/table/")[1],
      },
    };
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: "inputs",
      error: "table.error.missinginputs",
      subchecks: [
        {
          // Check tableid is available
          field: "tableid",
          error: "table.error.missingtableid",
        },
      ],
    },
  ],
  apicall: (inputs, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetDetails.apicall",
      inputs: inputs,
      tags: ["function"],
    });
    apiTableGetDetails(inputs.tableid, appStore.getState().sliceUserAuth.token);
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetDetails.getmanageresponsefunction",
      response: response,
      tags: ["function"],
    });
    let responses = {
      "table.details.success": () => {
        appStore.dispatch({
          type: "sliceTableDetails/set",
          payload: data.data.table,
        });
      },
      "table.details.error.onaggregate": () => {
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
      },
      "table.details.error.onfind": () => {
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
      },
      "table.details.error.deniedaccess": () => {
        appStore.dispatch({
          type: "sliceTableDetails/deny",
        });
      },
    };
    return responses[response]();
  },
};

export const tableGetHistoryInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetHistory.lockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({ type: "sliceTableHistory/lock" });
  },
  getinputsfunction: (log) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetHistory.getinputsfunction",
      tags: ["function"],
    });
    return {
      inputs: {
        tableid: window.location.href.split("/table/")[1],
        parameters: {
          need: "list",
          games: {
            index: 0,
            number: 20,
          },
        },
      },
    };
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: "inputs",
      error: "table.error.missinginputs",
      subchecks: [
        {
          // Check tableid is available
          field: "tableid",
          error: "table.error.missingtableid",
        },
        {
          // Checking parameters is available
          field: "parameters",
          error: "table.error.missingparameters",
          subchecks: [
            {
              // Check need is available
              field: "need",
              error: "table.error.missingneed",
            },
            {
              // Check games is available
              field: "games",
              error: "table.error.missinggames",
              subchecks: [
                {
                  // Check index is available
                  field: "index",
                  error: "table.error.missingindex",
                },
                {
                  // Check number is available
                  field: "number",
                  error: "table.error.missingnumber",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  apicall: (inputs, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetHistory.apicall",
      inputs: inputs,
      tags: ["function"],
    });
    apiTableGetHistory(
      inputs.tableid,
      inputs.parameters,
      appStore.getState().sliceUserAuth.token,
    );
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetHistory.getmanageresponsefunction",
      response: response,
      tags: ["function"],
    });
    let responses = {
      "table.history.success": () => {
        appStore.dispatch({
          type: "sliceTableHistory/set",
          payload: data.data.games,
        });
      },
      "table.history.accessdenied.noneed": () => {
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
      },
      "table.history.accessdenied.needmissmatch": () => {
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
      },
      "table.history.error.findinggames": () => {
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
      },
    };
    return responses[response]();
  },
};

export const tableGetStatsInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetStats.lockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({ type: "sliceTableStats/lock" });
  },
  getinputsfunction: (log) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetStats.getinputsfunction",
      tags: ["function"],
    });
    return {
      inputs: {
        tableid: window.location.href.split("/table/")[1],
        parameters: {
          need: "ranking",
        },
      },
    };
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: "inputs",
      error: "table.error.missinginputs",
      subchecks: [
        {
          // Check tableid is available
          field: "tableid",
          error: "table.error.missingtableid",
        },
        {
          // Checking parameters is available
          field: "parameters",
          error: "table.error.missingparameters",
          subchecks: [
            {
              // Check need is available
              field: "need",
              error: "table.error.missingneed",
            },
          ],
        },
      ],
    },
  ],
  apicall: (inputs, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetStats.apicall",
      inputs: inputs,
      tags: ["function"],
    });
    apiTableGetStats(
      inputs.tableid,
      inputs.parameters,
      appStore.getState().sliceUserAuth.token,
    );
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetStats.getmanageresponsefunction",
      response: response,
      tags: ["function"],
    });
    let responses = {
      "table.stats.success": () => {
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
      },
      "table.stats.error": () => {
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
      },
    };
    return responses[response]();
  },
};

export const tableDeleteInputs = {
  getinputsfunction: (log) => {
    log.push({
      date: new Date(),
      message: "serviceTableDelete.getinputsfunction",
      tags: ["function"],
    });
    return {
      inputs: {
        tableid: appStore.getState().sliceTableModal.inputs.tableid,
      },
    };
  },
  sercivechecks: [],
  apicall: (inputs, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableDelete.apicall",
      inputs: inputs,
      tags: ["function"],
    });
    apiTableDelete(inputs.tableid, appStore.getState().sliceUserAuth.token);
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableDelete.getmanageresponsefunction",
      response: response,
      tags: ["function"],
    });
    let responses = {
      "table.delete.success": () => {
        window.location = "/";
      },
      "table.delete.errorondelete": () => {
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
      },
    };
    return responses[response]();
  },
};
