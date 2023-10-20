// APIs
import {apiTableSave} from "../api/table.api"
import {apiGameSave} from "../api/game.api"
// Services
import serviceGetTableDetails from "../../App/components/Table/services/serviceGetTableDetails.js"
// Shared
import { random_id } from "../shared/services/toolkit.js";
// Reducers
import appStore from "../store/appStore.js";

let serviceProceedInputs = {
    test: {
        lockuifunction: (log) => {
            log.push({
                date: new Date (),
                message: "serviceProceed.lockuifunction",
                tags: ["function"]
            })
        },
        unlockuifunction: (log) => {
            log.push({
                date: new Date (),
                message: "serviceProceed.unlockuifunction",
                tags: ["function"]
            })
        },
        getinputsfunction: (log) => {
            log.push({
                date: new Date (),
                message: "serviceProceed.getinputsfunction",
                tags: ["function"]
            })
            return {
                inputs: {
                    fieldA: "A",                
                    field1: 1,
                    fieldList: [1,2,3]
                }
            }
        },
        repackagingfunction: (serviceInputs, log) => {
            let repackagedServiceInputs = serviceInputs
            repackagedServiceInputs.field1A = ""+ serviceInputs.field1 + serviceInputs.fieldA
            log.push({
                date: new Date (),
                message: "serviceProceed.repackagingfunction",
                tags: ["function"],
                repackagedServiceInputs: repackagedServiceInputs
            })
            return repackagedServiceInputs
        },
        sercivechecks: [
            {
                // Check input root is available
                field: "inputs",
                error: "test.error.inputs",
                subchecks: [
                    {
                        // Check field A is available
                        field: "fieldA",
                        error: "test.error.fieldA"
                    },
                    {
                        // Check field 1 is available
                        field: "field1",
                        error: "test.error.field1"
                    },
                    {
                        // Check fieldList is available
                        field: "fieldList",
                        error: "test.error.fieldList"
                    },]
            }
        ],
        getcheckoutcomedispatchfunction: (log) => {
            log.push({
                date: new Date (),
                message: "serviceProceed.getcheckoutcomedispatchfunction",
                tags: ["function"]
            })
            return "dummyslice/command"
        },
        apicall: async (serviceInputs, log) => {
            log.push({
                date: new Date (),
                message: "serviceProceed.apicall",
                tags: ["function"]
            })
            return {
                type: "test.success",
                serviceInputs: serviceInputs
            }
        },
        getmanageresponsefunction: (response, log) => {
            log.push({
                date: new Date (),
                message: "serviceProceed.getmanageresponsefunction",
                tags: ["function"]
            })
            let responses = {
                "test.success": (log) => {
                    log.push({
                        date: new Date (),
                        message: "serviceProceed.manageresponse.success",
                        tags: ["function"]
                    })
                },
                "test.failure": (log) => {
                    log.push({
                        date: new Date (),
                        message: "serviceProceed.manageresponse.failure",
                        tags: ["function"]
                    })
                },
            }
            return responses[response]
        }
    },
    tableSave: {
        lockuifunction: (log) => {
            log.push({
                date: new Date (),
                message: "serviceProceed.lockuifunction",
                tags: ["function"]
            })
            appStore.dispatch({ type: "sliceTableModal/lock" });
        },
        unlockuifunction: (log) => {
            log.push({
                date: new Date (),
                message: "serviceProceed.unlockuifunction",
                tags: ["function"]
            })
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
                date: new Date (),
                message: "serviceProceed.getinputsfunction",
                tags: ["function"]
            })
            return {
                inputs: { ...appStore.getState().sliceTableModal.inputs }
            }
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
                        confirmation: "delete table confirmation"
                    }
                ]
            }
        ],
        getcheckoutcomedispatchfunction: (log) => {
            log.push({
                date: new Date (),
                message: "serviceProceed.getcheckoutcomedispatchfunction",
                tags: ["function"]
            })
            return "sliceTableModal/change"
        },
        apicall: (inputs, log) => {
            log.push({
                date: new Date (),
                message: "serviceProceed.apicall",
                inputs: inputs,
                tags: ["function"]
            })
            apiTableSave(inputs, appStore.getState().sliceUserAuth.token)
        },
        getmanageresponsefunction: (response, log) => {
            log.push({
                date: new Date (),
                message: "serviceProceed.getmanageresponsefunction",
                response: response,
                tags: ["function"]
            })
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
                }
            }
            return responses[response]
        },
        manageconfirmation: (confirmation, log) => {
            log.push({
                date: new Date (),
                message: "serviceProceed.manageconfirmation",
                confirmation: confirmation,
                tags: ["function"]
            })
            if (confirmation === "delete table confirmation") {
                appStore.dispatch({
                    type: "sliceTableModal/change",
                    payload: {
                        deleteConfirmOpen: true,
                    },
                });

            }
        }
    },
    gameCreate: {
        lockuifunction: (log) => {
            log.push({
                date: new Date (),
                message: "serviceProceed.lockuifunction",
                tags: ["function"]
            })
            appStore.dispatch({ type: "sliceGameModal/lock" });
        },
        unlockuifunction: (log) => {
            log.push({
                date: new Date (),
                message: "serviceProceed.unlockuifunction",
                tags: ["function"]
            })
            appStore.dispatch({
                type: "sliceGameModal/change",
                payload: {
                disabled: false,
                loading: false,
                },
            });
        },
        getinputsfunction: (log) => {
            log.push({
                date: new Date (),
                message: "serviceProceed.getinputsfunction",
                tags: ["function"]
            })
            return {
                inputs: { ...appStore.getState().sliceGameModal.inputs },
                gameid: { ...appStore.getState().sliceGameModal.gameid },
                tableid: { ...appStore.getState().sliceTableDetails.tableid },
                contracts: { ...appStore.getState().sliceTableDetails.contracts }
            }
        },
        repackagingfunction: (inputs, log) => {
            log.push({
                date: new Date (),
                message: "serviceProceed.repackagingfunction",
                inputs: inputs,
                tags: ["function"]
            })
            let rapackagedInputs = inputs
            rapackagedInputs.inputs.gameid = inputs.gameid
            rapackagedInputs.inputs.tableid = inputs.tableid
            return rapackagedInputs
        },
        sercivechecks: [
            {
                // Check contracts root is available
                field: "contracts",
                error: "game.error.missingcontracts"
            },
            {
                // Check inputs root is available
                field: "inputs",
                error: "game.error.missinginputs",
                subchecks: [
                    {
                        // Check contract is available
                        field: "contract",
                        error: "game.error.missingcontract",
                        fieldsinerror: ["contract"],
                        subchecks:[
                            {
                                // Check that contract is among supported contracts
                                checkfunction: (serviceInputs) => {
                                    let fullContract = serviceInputs.contracts.filter((c) => c.key === serviceInputs.inputs.contract)[0]
                                    if  (fullContract !== undefined) {
                                        return "fail"
                                    } else {
                                        return "pass"
                                    }
                                },
                                error: "game.error.notfoundcontract",
                                fieldsinerror: ["contract"],
                            }
                        ]
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
                                    let fullContract = serviceInputs.contracts.filter((c) => c.key === serviceInputs.gameSave.inputs.contract)[0]
                                    if (fullContract !== undefined) {
                                        if (serviceInputs.inputs.players.filter((player) => player.role === "attack").length !== fullContract.attack) {
                                            return "fail"
                                        } else {
                                            return "pass"
                                        }
                                    } else {
                                        return "pass"
                                    }
                                },
                                error: "game.error.attackmissmatch",
                                fieldsinerror: ["attack"],
                            },
                            {
                                // Checking defense is well formed
                                checkfunction: (serviceInputs) => {
                                    let fullContract = serviceInputs.contracts.filter((c) => c.key === serviceInputs.gameSave.inputs.contract)[0]
                                    if (fullContract !== undefined) {
                                        if (serviceInputs.inputs.players.filter((player) => player.role === "defense").length !== fullContract.defense) {
                                            return "fail"
                                        } else {
                                            return "pass"
                                        }
                                    } else {
                                        return "pass"
                                    }
                                },
                                error: "game.error.defensemissmatch",
                                fieldsinerror: ["defense"],
                            }
                        ]
                    },
                    {
                        // Checking outcome is consistent
                        checkfunction: (serviceInputs) => {
                            let fullContract = serviceInputs.contracts.filter((c) => c.key === serviceInputs.gameSave.inputs.contract)[0]
                            if (fullContract !== undefined) {
                                if (serviceInputs.inputs.outcome + fullContract.folds > 13) {
                                    return "fail"
                                } else {
                                    return "pass"
                                }
                            } else {
                                return "pass"
                            }
                        },
                        error: "game.error.outcomemissmatch",
                        fieldsinerror: ["outcome"],
                    }
                ]
            }
        ],
        getcheckoutcomedispatchfunction: (log) => {
            log.push({
                date: new Date (),
                message: "serviceProceed.getcheckoutcomedispatchfunction",
                tags: ["function"]
            })
            return "sliceGameModal/change"
        },
        apicall: (inputs, log) => {
            log.push({
                date: new Date (),
                message: "serviceProceed.apicall",
                inputs: inputs,
                tags: ["function"]
            })
            gameCreate(inputs, appStore.getState().sliceUserAuth.token)
        },
        getmanageresponsefunction: (response, log) => {
            log.push({
                date: new Date (),
                message: "serviceProceed.getmanageresponsefunction",
                response: response,
                tags: ["function"]
            })
            let responses = {
                "game.save.success.created": () => {
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
                },
                "game.save.success.modified": () => {
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
                },
                "game.save.error.oncreate": () => {
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
                },
                "game.save.error.onmodify": () => {
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
                }
            }
            return responses[response]
        }
    }
}

export default serviceProceedInputs;