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
import { random_string, random_id } from "../_miscelaneous/toolkit.js";
import { serviceTableProcessCurves, serviceTableGetDetails } from "./table.services.js"
// Reducers
import appStore from "../../store/appStore.js";

export const tableCreateInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "serviceTableCreate.lockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({ type: "tableModalSlice/lock" });
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "tableCreateInputs.unlockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({
      type: "tableModalSlice/change",
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
      inputs: { ...appStore.getState().tableModalSlice.inputs },
      userid: appStore.getState().userSlice.userid,
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
                  return { 
                    errors: ["table.error.creationwithoutplayers"],
                    stateChanges: {
                      errors: { players: true}
                    },
                    proceed: false 
                  };
                } else {
                  return { proceed: true };
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
                        return p.userid === serviceInputs.userid;
                      }).length === 0
                    ) {
                      return { 
                        errors: ["table.error.creationwithoutuser"],
                        stateChanges: {
                          errors: { players: true}
                        },
                        proceed: false 
                      };
                    } else {
                      return { proceed: true };
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
    return "tableModalSlice/change";
  },
  repackagingfunction: (inputs, log) => {
    log.push({
      date: new Date(),
      message: "serviceProceed.repackagingfunction",
      inputs: inputs,
      tags: ["function"],
    });
    let repackagedInputs = { ...inputs };
    console.log("table.serviceProceed.repackagingfunction")
    repackagedInputs.inputs.tableid = random_string();
    repackagedInputs.inputs.userids = []
    repackagedInputs.inputs.players.forEach(player => {
      repackagedInputs.inputs.userids.push(player.userid)
    });
    delete repackagedInputs.inputs.players
    console.log("repackagedInputs", repackagedInputs)
    return repackagedInputs;
  },
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableCreate.apicall",
      inputs: inputs,
      tags: ["function"],
    });
    try {
      return await apiTableCreate(inputs, appStore.getState().authSlice.token);
    } catch (err) {
      return err;
    }    
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableCreate.getmanageresponsefunction",
      response: response,
      tags: ["function"],
    });
    let responses = {
      "table.create.success": () => {
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "table.snack.saved",
          },
        });
        window.location = "/table/" + response.data.tableid;
      },
      "table.create.error.idprovided": () => {
        appStore.dispatch({
          type: "tableModalSlice/change",
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
          type: "tableModalSlice/change",
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
    return responses[response.type]();
  },
};

export const tableSaveInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "serviceTableSave.lockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({ type: "tableModalSlice/lock" });
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "serviceTableSave.unlockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({
      type: "tableModalSlice/change",
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
    let table = { ...appStore.getState().tableModalSlice.inputs }
    table.tableid = appStore.getState().tableModalSlice.tableid
    return {
      inputs: table,
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
    return "tableModalSlice/change";
  },
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableSave.apicall",
      inputs: inputs,
      tags: ["function"],
    });
    try {
      return await apiTableSave(inputs, appStore.getState().authSlice.token);
    } catch (err) {
      return err;
    } 
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableSave.getmanageresponsefunction",
      response: response,
      tags: ["function"],
    });
    let responses = {
      "table.save.success.modified": () => {
        console.log("tableSaveInputs table.save.success.modified")
        appStore.dispatch({
          type: "tableModalSlice/close",
        });
        console.log("tableSaveInputs dispatched tableModalSlice/close")
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "table.snack.saved",
          },
        });
        console.log("tableSaveInputs dispatched sliceSnack/change")
        // Update table
        serviceTableGetDetails().then(() => {
          console.log("tableSaveInputs serviceTableGetDetails")
          appStore.dispatch({
            type: "tableSlice/unload",
          });
          console.log("tableSaveInputs dispatched tableSlice/unload")
        });
      },
      "table.save.error.oncreate": () => {
        appStore.dispatch({
          type: "tableModalSlice/change",
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
    return responses[response.type]();
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
    console.log("tableGetDetailsInputs.lockuifunction")
    appStore.dispatch({ 
      type: "tableSlice/lock",
      payload: {scope: "details"},
   });
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
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetDetails.apicall",
      inputs: inputs,
      tags: ["function"],
    });
    try {
      return await apiTableGetDetails(inputs.tableid, appStore.getState().authSlice.token);
    } catch (err) {
      return err;
    } 
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetDetails.getmanageresponsefunction",
      response: response,
      tags: ["function"],
    });
    let responses = {
      "table.getdetails.success": () => {
        appStore.dispatch({
          type: "tableSlice/setDetails",
          payload: response.data.table,
        });
      },
      "table.getdetails.error.onaggregate": () => {
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
      },
      "table.getdetails.error.onfind": () => {
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
      },
      "table.getdetails.error.deniedaccess": () => {
        appStore.dispatch({
          type: "tableSlice/deny",
        });
      },
    };
    return responses[response.type]();
  },
};

export const tableGetHistoryInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetHistory.lockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({ 
      type: "tableSlice/lock",
      payload: {scope: "history"},
   });
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
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetHistory.apicall",
      inputs: inputs,
      tags: ["function"],
    });
    try {
      return await apiTableGetHistory(
        inputs.tableid,
        inputs.parameters,
        appStore.getState().authSlice.token,
      );
    } catch (err) {
      return err;
    } 
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetHistory.getmanageresponsefunction",
      response: response,
      tags: ["function"],
    });
    let responses = {
      "table.gethistory.success": () => {
        appStore.dispatch({
          type: "tableSlice/setHistory",
          payload: response.data.games,
        });
      },
      "table.gethistory.accessdenied.noneed": () => {
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
      },
      "table.gethistory.accessdenied.needmissmatch": () => {
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
      },
      "table.gethistory.error.findinggames": () => {
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
      },
    };
    return responses[response.type]();
  },
};

export const tableGetStatsInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetStats.lockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({ 
      type: "tableSlice/lock",
      payload: {scope: "stats"},
   });
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetStats.getinputsfunction",
      tags: ["function"],
    });
    return {
      inputs: {
        tableid: window.location.href.split("/table/")[1],
        parameters: {
          need: directInputs.need,     
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
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetStats.apicall",
      inputs: inputs,
      tags: ["function"],
    });
    try {
      return await apiTableGetStats(
        inputs.tableid,
        inputs.parameters,
        appStore.getState().authSlice.token,
      );
    } catch (err) {
      return err;
    } 
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableGetStats.getmanageresponsefunction",
      response: response,
      tags: ["function"],
    });
    let responses = {
      "table.getstats.success": () => {
        let stats = response.data.stats;
        let playerids = appStore
          .getState()
          .tableSlice.players.map((p) => p.userid);
        stats.ranking = stats.ranking.filter((rank) =>
          playerids.includes(rank.userid),
        );
        // Outcome
        if (stats.graph !== undefined) {
          serviceTableProcessCurves(stats.graph)
        }
        appStore.dispatch({
          type: "tableSlice/setRanking",
          payload: stats.ranking,
        });
      },
      "table.getstats.error": () => {
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
      },
    };
    return responses[response.type]();
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
        tableid: appStore.getState().tableModalSlice.tableid,
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
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: "serviceTableDelete.apicall",
      inputs: inputs,
      tags: ["function"],
    });
    try {
      return await apiTableDelete(inputs.tableid, appStore.getState().authSlice.token);
    } catch (err) {
      return err;
    } 
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
