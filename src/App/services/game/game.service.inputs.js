// APIs
import { apiGameCreate, apiGameDelete } from "./game.api.js";
// Services
import serviceProceedCheck from "../_miscelaneous/serviceProceedCheck.js"
import { random_id, random_string } from "../_miscelaneous/toolkit.js";
import appStore from "../../store/appStore.js";

export const gameCreateInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "serviceProceed.lockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({ type: "gameModalSlice/lock" });
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "serviceProceed.unlockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({
      type: "gameModalSlice/change",
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
      inputs: {
        contracts: appStore.getState().gameModalSlice.contracts,
        gameid: appStore.getState().gameModalSlice.gameid,
        tableid: appStore.getState().tableSlice.tableid,
      },
      tableContracts: { ...appStore.getState().tableSlice.contracts },
    };
  },
  sercivechecks: [
    {
      // Check contracts root is available
      field: "tableContracts",
      error: "game.error.missingtablecontracts",
    },
    {
      // Check inputs root is available
      field: "inputs",
      error: "game.error.missinginputs",
      subchecks: [
        {
          // Check contract list is available
          field: "contracts",
          error: "game.error.missingcontracts",
          subchecks: [
            {
              // Check contract is correct
              error: "game.error.erroneouscontract",
              checkfunction: (serviceInputs) => {
                console.log('gameCreateInputs.sercivechecks', serviceInputs)
                let contractsCheckOutcome = "pass"
                for (let c = 0; c < serviceInputs.inputs.contracts.length; c++) {
                  let contractChecks = [
                    {
                      // Check contract is available
                      field: "contract",
                      error: "game.error.missingcontract",
                      fieldsinerror: ["contract"],
                      subchecks: [
                        {
                          // Check that contract is among supported contracts
                          checkfunction: (serviceInputs) => {
                            let fullContract = serviceInputs.tableContracts.filter(
                              (c) => c.key === serviceInputs.inputs.contracts[c].inputs.contract,
                            )[0];
                            if (fullContract !== undefined) {
                              return "fail";
                            } else {
                              return "pass";
                            }
                          },
                          error: "game.error.notfoundcontract",
                          fieldsinerror: ["contract"],
                        },
                      ],
                    },
                    {
                      // Checking players is a non empty list
                      field: "players",
                      error: "game.error.missingplayers",
                      fieldsinerror: ["attack", "defense"],
                      subchecks: [
                        {
                          // Checking attack is well formed
                          checkfunction: (serviceInputs) => {
                            let fullContract = serviceInputs.tableContracts.filter(
                              (c) => c.key === serviceInputs.inputs.contracts[c].inputs.contract,
                            )[0];
                            if (fullContract !== undefined) {
                              if (
                                serviceInputs.inputs.contracts[c].inputs.players.filter(
                                  (player) => player.role === "attack",
                                ).length !== fullContract.attack
                              ) {
                                return "fail";
                              } else {
                                return "pass";
                              }
                            } else {
                              return "pass";
                            }
                          },
                          error: "game.error.attackmissmatch",
                          fieldsinerror: ["attack"],
                        },
                        {
                          // Checking defense is well formed
                          checkfunction: (serviceInputs) => {
                            let fullContract = serviceInputs.tableContracts.filter(
                              (c) => c.key === serviceInputs.inputs.contracts[c].inputs.contract,
                            )[0];
                            if (fullContract !== undefined) {
                              if (
                                serviceInputs.inputs.contracts[c].inputs.players.filter(
                                  (player) => player.role === "defense",
                                ).length !== fullContract.defense
                              ) {
                                return "fail";
                              } else {
                                return "pass";
                              }
                            } else {
                              return "pass";
                            }
                          },
                          error: "game.error.defensemissmatch",
                          fieldsinerror: ["defense"],
                        },
                      ],
                    },
                    {
                      // Checking outcome is consistent
                      checkfunction: (serviceInputs) => {
                        let fullContract = serviceInputs.tableContracts.filter(
                          (c) => c.key === serviceInputs.inputs.contracts[c].inputs.contract,
                        )[0];
                        if (fullContract !== undefined) {
                          if (serviceInputs.inputs.contracts[c].inputs.outcome + fullContract.folds > 13) {
                            return "fail";
                          } else {
                            return "pass";
                          }
                        } else {
                          return "pass";
                        }
                      },
                      error: "game.error.outcomemissmatch",
                      fieldsinerror: ["outcome"],
                    },
                  ]
                  console.log('gameCreateInputs.sercivechecks.serviceProceedCheck', serviceInputs.inputs.contracts[c], contractChecks)
                  let contractCheckOutcomes = serviceProceedCheck(serviceInputs.inputs.contracts[c], contractChecks)
                  console.log('gameCreateInputs.sercivechecks.contractCheckOutcomes', contractCheckOutcomes)
                  contractCheckOutcomes
                  if (!contractCheckOutcomes.proceed) {
                    contractsCheckOutcome = "fail";
                  }
                }
                return contractsCheckOutcome
              }
            }
          ]
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
    return "gameModalSlice/change";
  },
  repackagingfunction: (inputs, log) => {
    log.push({
      date: new Date(),
      message: "serviceProceed.repackagingfunction",
      inputs: inputs,
      tags: ["function"],
    });
    console.log("game.serviceProceed.repackagingfunction", inputs)
    let repackagedInputs = {};
    repackagedInputs.inputs = {};
    repackagedInputs.inputs.gameid = random_string();
    repackagedInputs.inputs.tableid = inputs.inputs.tableid
    repackagedInputs.inputs.contracts = []
    console.log("repackagedInputs", repackagedInputs)
    inputs.inputs.contracts.forEach(contract => {
      repackagedInputs.inputs.contracts.push(contract.inputs)
    });
    console.log("repackagedInputs", repackagedInputs)
    return repackagedInputs;
  },
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: "serviceProceed.apicall",
      inputs: inputs,
      tags: ["function"],
    });
    try {
      return await apiGameCreate(inputs, appStore.getState().authSlice.token);
    } catch (err) {
      return err;
    }    
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: "serviceProceed.getmanageresponsefunction",
      response: response,
      tags: ["function"],
    });
    let responses = {
      "game.create.success": () => {
        appStore.dispatch({
          type: "gameModalSlice/close"
        });
        appStore.dispatch({
          type: "tableSlice/unload",
        });
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "game.snack.saved",
          },
        });
      },
      "game.create.error": () => {
        appStore.dispatch({
          type: "gameModalSlice/change",
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
