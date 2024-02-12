import { createSlice } from '@reduxjs/toolkit'
// Services
import { random_id } from '../../../_shared/_services/toolkit.js'

/**
 * TO COME INTO PLAY FOR MULTI CONTRACT GAMES
 */

let newContract = {
    inputs: {
        contract: '',
        players: [],
        outcome: 0,
    },
    errors: {
        contract: false,
        attack: false,
        defense: false,
        outcome: false,
    },
    focuses: {
        contract: true,
        attack: false,
        defense: false,
        outcome: false,
    },
    requirements: {
        attack: '',
        defense: '',
        outcome: '',
    },
}

const gameModalSlice = createSlice({
    name: 'gameModalSlice',
    initialState: {
        open: false,
        disabled: false,
        loading: false,
        gameid: '',
        contracts: [],
    },
    reducers: {
        new: (state) => {
            // Open the modal with only a new contract
            state.open = true
            state.disabled = false
            state.loading = false
            state.gameid = ''
            state.contracts = [newContract]
        },
        contractAdd: (state) => {
            // Adds a new contract
            state.contracts.push(newContract)
        },
        contractRemove: (state, action) => {
            // Removes a new contract
            delete state.contracts[action.payload.contractposition]
        },
        addplayer: (state, action) => {
            state.contracts[
                action.payload.contractposition
            ].inputs.players.push(action.payload.player)
            // Errors
            if (action.payload.errors !== undefined) {
                if (action.payload.errors.attack !== undefined) {
                    state.contracts[
                        action.payload.contractposition
                    ].errors.attack = action.payload.errors.attack
                }
                if (action.payload.errors.defense !== undefined) {
                    state.contracts[
                        action.payload.contractposition
                    ].errors.defense = action.payload.errors.defense
                }
            }
        },
        removeplayer: (state, action) => {
            state.contracts[action.payload.contractposition].inputs.players =
                state.contracts[
                    action.payload.contractposition
                ].inputs.players.filter(
                    (player) => player.userid !== action.payload.player
                )
            // Errors
            if (action.payload.errors !== undefined) {
                if (action.payload.errors.attack !== undefined) {
                    state.contracts[
                        action.payload.contractposition
                    ].errors.attack = action.payload.errors.attack
                }
                if (action.payload.errors.defense !== undefined) {
                    state.contracts[
                        action.payload.contractposition
                    ].errors.defense = action.payload.errors.defense
                }
            }
        },
        close: (state) => {
            // Close the modal and replace all stored values
            state.open = false
            state.disabled = false
            state.loading = false
            state.gameid = ''
            state.contracts = {}
        },
        change: (state, action) => {
            if (action.payload.open !== undefined) {
                state.open = action.payload.open
            }
            // Contract related actions
            if (action.payload.contractposition !== undefined) {
                // Inputs
                if (action.payload.inputs !== undefined) {
                    if (action.payload.inputs.contract !== undefined) {
                        state.contracts[
                            action.payload.contractposition
                        ].inputs.contract = action.payload.inputs.contract
                    }
                    if (action.payload.inputs.players !== undefined) {
                        state.contracts[
                            action.payload.contractposition
                        ].inputs.players = action.payload.inputs.players
                    }
                    if (action.payload.inputs.outcome !== undefined) {
                        state.contracts[
                            action.payload.contractposition
                        ].inputs.outcome = action.payload.inputs.outcome
                    }
                }
                // Errors
                if (action.payload.errors !== undefined) {
                    if (action.payload.errors.contract !== undefined) {
                        state.contracts[
                            action.payload.contractposition
                        ].errors.contract = action.payload.errors.contract
                    }
                    if (action.payload.errors.attack !== undefined) {
                        state.contracts[
                            action.payload.contractposition
                        ].errors.attack = action.payload.errors.attack
                    }
                    if (action.payload.errors.defense !== undefined) {
                        state.contracts[
                            action.payload.contractposition
                        ].errors.defense = action.payload.errors.defense
                    }
                    if (action.payload.errors.outcome !== undefined) {
                        state.contracts[
                            action.payload.contractposition
                        ].errors.outcome = action.payload.errors.outcome
                    }
                }
                // Requirements
                if (action.payload.requirements !== undefined) {
                    if (action.payload.requirements.attack !== undefined) {
                        state.contracts[
                            action.payload.contractposition
                        ].requirements.attack =
                            action.payload.requirements.attack
                    }
                    if (action.payload.requirements.defense !== undefined) {
                        state.contracts[
                            action.payload.contractposition
                        ].requirements.defense =
                            action.payload.requirements.defense
                    }
                    if (action.payload.requirements.outcome !== undefined) {
                        state.contracts[
                            action.payload.contractposition
                        ].requirements.outcome =
                            action.payload.requirements.outcome
                    }
                }
            } else {
                // Errors
                if (action.payload.errors !== undefined) {
                    Object.keys(action.payload.errors).forEach((key) => {
                        if (key.includes('#')) {
                            let contractposition = key.split('#')[1]
                            let erroneousfield = key.split('#')[0]
                            if ('contract' === erroneousfield) {
                                state.contracts[
                                    contractposition
                                ].errors.contract = action.payload.errors[key]
                            }
                            if ('attack' === erroneousfield) {
                                state.contracts[
                                    contractposition
                                ].errors.attack = action.payload.errors[key]
                            }
                            if ('defense' === erroneousfield) {
                                state.contracts[
                                    contractposition
                                ].errors.defense = action.payload.errors[key]
                            }
                            if ('outcome' === erroneousfield) {
                                state.contracts[
                                    contractposition
                                ].errors.outcome = action.payload.errors[key]
                            }
                        }
                    })
                }
            }

            // Lock
            if (action.payload.disabled !== undefined) {
                state.disabled = action.payload.disabled
            }
            if (action.payload.loading !== undefined) {
                state.loading = action.payload.loading
            }
        },
        lock: (state, action) => {
            // Locks the modal for longer actions
            state.disabled = true
            state.loading = true
        },
        openMenu: (state, action) => {
            if (process.env.REACT_APP_DEBUG === 'TRUE') {
                console.log('gameModalSlice.openMenu')
                //console.log(action.payload);
            }
            if (action.payload.menu === 'contract') {
                state.contracts[
                    action.payload.contractposition
                ].focuses.contract = true
            } else {
                state.contracts[
                    action.payload.contractposition
                ].focuses.contract = false
            }
            if (action.payload.menu === 'attack') {
                state.contracts[
                    action.payload.contractposition
                ].focuses.attack = true
            } else {
                state.contracts[
                    action.payload.contractposition
                ].focuses.attack = false
            }
            if (action.payload.menu === 'defense') {
                state.contracts[
                    action.payload.contractposition
                ].focuses.defense = true
            } else {
                state.contracts[
                    action.payload.contractposition
                ].focuses.defense = false
            }
            if (action.payload.menu === 'outcome') {
                state.contracts[
                    action.payload.contractposition
                ].focuses.outcome = true
            } else {
                state.contracts[
                    action.payload.contractposition
                ].focuses.outcome = false
            }
        },
        closeMenu: (state, action) => {
            if (process.env.REACT_APP_DEBUG === 'TRUE') {
                console.log('gameModalSlice.closeMenu')
                //console.log(action.payload);
            }
            state.contracts[action.payload.contractposition].focuses[
                action.payload.menu
            ] = false
        },
    },
})

export default gameModalSlice.reducer
