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
        contracts: {},
    },
    reducers: {
        new: (state) => {
            // Open the modal with only a new contract
            state.open = true;
            state.disabled = false;
            state.loading = false;
            state.contracts[random_id()] = newContract
        },
        contractAdd: (state) => {
            // Adds a new contract
            state.contracts[random_id()] = newContract
        },
        contractRemove: (state, action) => {
            // Removes a new contract
            delete state.contracts[action.payload.id]
        },
        close: (state) => {
            // Close the modal and replace all stored values
            state.open = false;
            state.disabled = false;
            state.loading = false;
            state.contracts = {}
        },
        change: (state, action) => {
            if (action.payload.open !== undefined) {
                state.open = action.payload.open;
            }
            // Contract related actions
            if (action.payload.contracts !== undefined) {
                Object.keys(action.payload.contracts).forEach(c => {
                    // Inputs
                    if (action.payload.contracts[c] !== undefined) {
                        if (action.payload.contracts[c].inputs.contract !== undefined) {
                            state.contracts[c].inputs.contract = action.payload.contracts[c].contract;
                        }
                        if (action.payload.contracts[c].players !== undefined) {
                            state.contracts[c].inputs.players = action.payload.contracts[c].players;
                        }
                        if (action.payload.contracts[c].outcome !== undefined) {
                            state.contracts[c].inputs.outcome = action.payload.contracts[c].outcome;
                        }
                    }
                    // Errors
                    if (action.payload.errors !== undefined) {
                        if (action.payload.contracts[c].errors.contract !== undefined) {
                            state.contracts[c].errors.contract = action.payload.contracts[c].errors.contract;
                        }
                        if (action.payload.contracts[c].errors.attack !== undefined) {
                            state.contracts[c].errors.attack = action.payload.contracts[c].errors.attack;
                        }
                        if (action.payload.contracts[c].errors.defense !== undefined) {
                            state.contracts[c].errors.defense = action.payload.contracts[c].errors.defense;
                        }
                        if (action.payload.contracts[c].errors.outcome !== undefined) {
                            state.contracts[c].errors.outcome = action.payload.contracts[c].errors.outcome;
                        }
                    }
                    // Requirements
                    if (action.payload.requirements !== undefined) {
                        if (action.payload.contracts[c].requirements.attack !== undefined) {
                            state.contracts[c].requirements.attack = action.payload.contracts[c].requirements.attack;
                        }
                        if (action.payload.contracts[c].requirements.defense !== undefined) {
                            state.contracts[c].requirements.defense = action.payload.contracts[c].requirements.defense;
                        }
                        if (action.payload.contracts[c].requirements.outcome !== undefined) {
                            state.contracts[c].requirements.outcome = action.payload.contracts[c].requirements.outcome;
                        }
                    }
                })
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

export const selectGameModal_open = state => state.open
export const selectGameModal_disabled = state => state.disabled
export const selectGameModal_loading = state => state.loading
export const selectGameModal_contracts = state => state.contracts

export default gameModalSlice.reducer;
