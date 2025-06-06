import { createSlice } from '@reduxjs/toolkit'

const tableModalSlice = createSlice({
    name: 'tableModalSlice',
    initialState: {
        open: false,
        disabled: false,
        loading: false,
        tableid: '',
        inputs: {
            name: '',
            guests: 0,
            statsGameNumber: 20,
            players: [],
        },
        errors: {
            name: false,
            guests: false,
            statsGameNumber: false,
            players: false,
        },
        deleteConfirm: false,
    },
    reducers: {
        new: (state, action) => {
            state.open = true
            state.tableid = ''
            state.inputs = {
                name: '',
                guests: 0,
                statsGameNumber: 20,
                players: [action.payload],
            }
            state.errors = {
                name: false,
                guests: false,
                statsGameNumber: false,
                players: false,
            }
        },
        open: (state, action) => {
            state.open = true
            state.tableid = action.payload.tableid
            state.inputs = {
                name: action.payload.name,
                guests: action.payload.guests,
                statsGameNumber: action.payload.statsGameNumber,
                players: action.payload.players,
            }
            state.errors = {
                name: false,
                guests: false,
                statsGameNumber: false,
                players: false,
            }
        },
        close: (state) => {
            state.open = false
            state.errors = {
                name: false,
                guests: false,
                statsGameNumber: false,
                players: false,
            }
            state.disabled = false
            state.loading = false
        },
        change: (state, action) => {
            if (action.payload.open !== undefined) {
                state.open = action.payload.open
            }
            // Inputs
            if (action.payload.inputs !== undefined) {
                if (action.payload.inputs.name !== undefined) {
                    state.inputs.name = action.payload.inputs.name
                }
                if (action.payload.inputs.guests !== undefined) {
                    state.inputs.guests = action.payload.inputs.guests
                }
                if (action.payload.inputs.statsGameNumber !== undefined) {
                    state.inputs.statsGameNumber =
                        action.payload.inputs.statsGameNumber
                }
                if (action.payload.inputs.players !== undefined) {
                    state.inputs.players = action.payload.inputs.players
                }
            }
            // Errors
            if (action.payload.errors !== undefined) {
                if (action.payload.errors.name !== undefined) {
                    state.errors.name = action.payload.errors.name
                }
                if (action.payload.errors.guests !== undefined) {
                    state.errors.guests = action.payload.errors.guests
                }
                if (action.payload.errors.statsGameNumber !== undefined) {
                    state.errors.statsGameNumber =
                        action.payload.errors.statsGameNumber
                }
                if (action.payload.errors.players !== undefined) {
                    state.errors.players = action.payload.errors.players
                }
            }
            // Lock
            if (action.payload.disabled !== undefined) {
                state.disabled = action.payload.disabled
            }
            if (action.payload.loading !== undefined) {
                state.loading = action.payload.loading
            }
            // Confirm
            if (action.payload.deleteConfirm !== undefined) {
                state.deleteConfirm = action.payload.deleteConfirm
            }
        },
        adduser: (state, action) => {
            if (
                state.inputs.players.some(
                    (player) => player.userid === action.payload.userid
                )
            ) {
                // Not to be added
            } else {
                state.inputs.players.push(action.payload)
                state.errors.players = false
            }
        },
        removeuser: (state, action) => {
            state.inputs.players = state.inputs.players.filter(
                (player) => player.userid !== action.payload
            )
        },
        lock: (state) => {
            state.disabled = true
            state.loading = true
        },
    },
})

export default tableModalSlice.reducer
