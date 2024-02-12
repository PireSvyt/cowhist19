import { createSlice } from '@reduxjs/toolkit'

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState: {
        state: {},
        stats: {
            tablesbyplayers: [],
            tablesbygames: [],
            usersbystatus: [],
        },
        state: false,
    },
    reducers: {
        deny: (state) => {
            state.denied = true
        },
        allow: (state) => {
            state.denied = false
        },
        lock: (state) => {
            state.state[action.payload.scope] = 'locked'
        },
        set: (state, action) => {
            if (process.env.REACT_APP_DEBUG === 'TRUE') {
                console.log('adminSlice.set')
            }
            if (action.payload.tablesbyplayers !== undefined) {
                state.state.tablesbyplayers = 'available'
                state.stats.tablesbyplayers = action.payload.tablesbyplayers
            }
            if (action.payload.tablesbygames !== undefined) {
                state.state.tablesbygames = 'available'
                state.stats.tablesbygames = action.payload.tablesbygames
            }
            if (action.payload.usersbystatus !== undefined) {
                state.state.usersbystatus = 'available'
                state.stats.usersbystatus = action.payload.usersbystatus
            }
        },
        unload: (state) => {
            console.log('adminSlice.unload')
            delete state.state.tablesbyplayers
            delete state.state.tablesbygames
            delete state.state.usersbystatus
        },
    },
})

export default adminSlice.reducer
