import { createSlice } from "@reduxjs/toolkit";
// Services
import { random_id } from "../../_miscelaneous/toolkit.js";

/**
 * TO COME INTO PLAY FOR MULTI CONTRACT GAMES
 */

let newContract = {
    inputs:{
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
}

const gameModalSlice = createSlice({
    name: "gameModalSlice",
    initialState: {
        open: false,
        disabled: false,
        loading: false,
        gameid: "",
        contracts: [],
    },
    reducers: {
        new: (state) => {
            // Open the modal with only a new contract
            state.open = true;
            state.disabled = false;
            state.loading = false;
            state.gameid = "";
            state.contracts = [ newContract ]
        },
        contractAdd: (state) => {
            // Adds a new contract
            state.contracts.push(newContract)
        },
        contractRemove: (state, action) => {
            // Removes a new contract
            delete state.contracts[action.payload.contractposition]
        },
        close: (state) => {
            // Close the modal and replace all stored values
            state.open = false;
            state.disabled = false;
            state.loading = false;
            state.gameid = "";
            state.contracts = {}
        },
        change: (state, action) => {
            if (action.payload.open !== undefined) {
                state.open = action.payload.open;
            }
            console.log("gameModalSlice.change", action.payload)
            // Contract related actions
            if (action.payload.contractid !== undefined) {
                // Inputs
                if (action.payload.inputs !== undefined) {
                    if (action.payload.inputs.contract !== undefined) {
                        state.contracts[action.payload.contractid].inputs.contract = action.payload.inputs.contract;
                    }
                    if (action.payload.inputs.players !== undefined) {
                        state.contracts[action.payload.contractid].inputs.players = action.payload.inputs.players;
                    }
                    if (action.payload.inputs.outcome !== undefined) {
                        state.contracts[action.payload.contractid].inputs.outcome = action.payload.inputs.outcome;
                    }
                }
                // Errors
                if (action.payload.errors !== undefined) {
                    if (action.payload.errors.contract !== undefined) {
                        state.contracts[action.payload.contractid].errors.contract = action.payload.errors.contract;
                    }
                    if (action.payload.errors.attack !== undefined) {
                        state.contracts[action.payload.contractid].errors.attack = action.payload.errors.attack;
                    }
                    if (action.payload.errors.defense !== undefined) {
                        state.contracts[action.payload.contractid].errors.defense = action.payload.errors.defense;
                    }
                    if (action.payload.errors.outcome !== undefined) {
                        state.contracts[action.payload.contractid].errors.outcome = action.payload.errors.outcome;
                    }
                }
                // Requirements
                if (action.payload.requirements !== undefined) {
                    if (action.payload.requirements.attack !== undefined) {
                        state.contracts[action.payload.contractid].requirements.attack = action.payload.requirements.attack;
                    }
                    if (action.payload.requirements.defense !== undefined) {
                        state.contracts[action.payload.contractid].requirements.defense = action.payload.requirements.defense;
                    }
                    if (action.payload.requirements.outcome !== undefined) {
                        state.contracts[action.payload.contractid].requirements.outcome = action.payload.requirements.outcome;
                    }
                }
            }
            // Lock
            if (action.payload.disabled !== undefined) {
                state.disabled = action.payload.disabled;
            }
            if (action.payload.loading !== undefined) {
                state.loading = action.payload.loading;
            }
        },
        lock: (state, action) => {
            // Locks the modal for longer actions
            state.disabled = true;
            state.loading = true;
        },
    },
});

export default gameModalSlice.reducer;
