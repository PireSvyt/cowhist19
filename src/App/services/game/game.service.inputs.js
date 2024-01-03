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
              fieldsinerror: [],
              checkfunction: (serviceInputs) => {
                console.log('BEG gameCreateInputs.sercivechecks')
                let contractsCheckOutcome = {
                  proceed: true,
                  errors: [],
                  stateChanges: {
                    errors: {}
                  },
                  confirmation: undefined
                }
                for (let c = 0; c < serviceInputs.inputs.contracts.length; c++) {
                  console.log('>> Check contract is correct :', serviceInputs.inputs.contracts[c])
                  let contractChecks = [
                    {
                      field: "inputs",
                      error: "game.error.missinginputs",
                      subchecks: [
                        {
                          // Check contract is available
                          field: "contract",
                          error: "game.error.missingcontract",
                          fieldsinerror: ["contract#"+c],
                          subchecks: [
                            {
                              // Check that contract is among supported contracts
                              error: "game.error.notfoundcontract",
                              fieldsinerror: ["contract#"+c],
                              checkfunction: (serviceInputs) => {
                                console.log("*** serviceInputs.tableContracts", serviceInputs.tableContracts)
                                console.log("*** serviceInputs.inputs.contract", serviceInputs.inputs.contract)
                                let contractList =  Object.values(serviceInputs.tableContracts).filter(
                                  (contract) => {
                                    return contract.key === serviceInputs.inputs.contract
                                  }
                                )
                                console.log("*** contractList", contractList)
                                let fullContract = Object.values(serviceInputs.tableContracts).filter(
                                  (contract) => { contract.key === serviceInputs.inputs.contract}
                                )[0];
                                console.log("*** fullContract", fullContract)
                                if (fullContract !== undefined) {
                                    let field = "contract#"+c
                                    let errors = {}
                                    errors[field] = true
                                    return { 
                                    errors: ["game.error.notfoundcontract"],
                                    stateChanges: {
                                      errors: errors
                                    },
                                    proceed: false 
                                  };
                                } else {
                                  return { proceed: true };
                                }
                              },
                            },
                          ],
                        },
                        {
                          // Checking players is a non empty list
                          field: "players",
                          error: "game.error.missingplayers",
                          fieldsinerror: ["attack#"+c, "defense#"+c],
                          subchecks: [
                            {
                              // Checking attack is well formed
                              error: "game.error.attackmissmatch",
                              fieldsinerror: ["attack#"+c],
                              checkfunction: (serviceInputs) => {
                                let fullContract = Object.values(serviceInputs.tableContracts).filter(
                                  (contract) => { contract.key === serviceInputs.inputs.contract}
                                )[0];
                                if (fullContract !== undefined) {
                                  if (
                                    serviceInputs.inputs.contracts[c].inputs.players.filter(
                                      (player) => player.role === "attack",
                                    ).length !== fullContract.attack
                                  ) {
                                    let field = "attack#"+c
                                    let errors = {}
                                    errors[field] = true
                                    return { 
                                      errors: ["game.error.attackmissmatch"],
                                      stateChanges: {
                                        errors: errors
                                      },
                                      proceed: false 
                                    };
                                  } else {
                                    return { proceed: true };
                                  }
                                } else {
                                  return { proceed: true };
                                }
                              },
                            },
                            {
                              // Checking defense is well formed
                              error: "game.error.defensemissmatch",
                              fieldsinerror: ["defense#"+c],
                              checkfunction: (serviceInputs) => {
                                let fullContract = Object.values(serviceInputs.tableContracts).filter(
                                  (contract) => { contract.key === serviceInputs.inputs.contract}
                                )[0];
                                if (fullContract !== undefined) {
                                  if (
                                    serviceInputs.inputs.contracts[c].inputs.players.filter(
                                      (player) => player.role === "defense",
                                    ).length !== fullContract.defense
                                  ) {
                                    let field = "defense#"+c
                                    let errors = {}
                                    errors[field] = true
                                    return { 
                                      errors: ["game.error.defensemissmatch"],
                                      stateChanges: {
                                        errors: errors
                                      },
                                      proceed: false 
                                    };
                                  } else {
                                    return { proceed: true };
                                  }
                                } else {
                                  return { proceed: true };
                                }
                              },
                            },
                          ],
                        },
                        {
                          // Checking outcome is consistent
                          field: "outcome",
                          error: "game.error.outcomemissmatch",
                          fieldsinerror: ["outcome#"+c],
                          checkfunction: (serviceInputs) => {
                            let fullContract = Object.values(serviceInputs.tableContracts).filter(
                              (contract) => { contract.key === serviceInputs.inputs.contract}
                            )[0];
                            if (fullContract !== undefined) {
                              if (serviceInputs.inputs.contracts[c].inputs.outcome + fullContract.folds > 13) {
                                let field = "outcome#"+c
                                let errors = {}
                                errors[field] = true
                                return { 
                                  errors: ["game.error.outcomemissmatch"],
                                  stateChanges: {
                                    errors: errors
                                  },
                                  proceed: false 
                                };
                              } else {
                                return { proceed: true };
                              }
                            } else {
                              return { proceed: true };
                            }
                          },
                        },
                      ]
                    },
                  ]
                  // TODO : capitalize changes of all subchecks 
                  // first into contractCheckOutcome
                  // then into contractCheckOutcome
                  let contractCheckOutcome = serviceProceedCheck({
                    inputs: serviceInputs.inputs.contracts[c].inputs,
                    tableContracts: serviceInputs.tableContracts
                  }, contractChecks)
                  console.log('>> Check outcome :', contractCheckOutcome)
                  if (contractCheckOutcome.proceed === false) {
                    contractsCheckOutcome.proceed = false;
                  }
                  contractCheckOutcome.errors.forEach(err => {
                    console.log(">> > contractCheckOutcome.errors", err)
                    contractsCheckOutcome.errors.push(err)
                  })
                  Object.keys(contractCheckOutcome.stateChanges).forEach(key => {
                    console.log(">> > contractCheckOutcome.stateChanges", key)
                    contractsCheckOutcome.stateChanges[key] = contractCheckOutcome.stateChanges[key]
                  })
                  console.log('   gameCreateInputs.sercivechecks contractCheckOutcome', contractCheckOutcome)
                }
                console.log('END gameCreateInputs.sercivechecks contractsCheckOutcome', contractsCheckOutcome)
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

export const gameDeleteInputs = {
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: "serviceGameDelete.getinputsfunction",
      tags: ["function"],
    });
    return {
      inputs: {
        gameid: directInputs.gameid,        
        tableid: appStore.getState().tableSlice.tableid,
      },
    };
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: "inputs",
      error: "game.error.missinginputs",
      subchecks: [
        {
          // Check tableid is available
          field: "tableid",
          error: "game.error.missingtableid",
        },
        {
          // Check gameid is available
          field: "gameid",
          error: "game.error.missinggameid",
        },
      ],
    },
  ],
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: "serviceGameDelete.apicall",
      inputs: inputs,
      tags: ["function"],
    });
    try {
      return await apiGameDelete(inputs, appStore.getState().authSlice.token);
    } catch (err) {
      return err;
    } 
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: "serviceGameDelete.getmanageresponsefunction",
      response: response,
      tags: ["function"],
    });
    let responses = {
     "game.delete.success": () => {
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "game.snack.deleted",
            },
          });
        },
      "game.delete.errorondelete": () => {
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
      }
    };
    return responses[response]();
  },
};