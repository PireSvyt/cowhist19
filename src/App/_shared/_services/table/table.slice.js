import { createSlice } from '@reduxjs/toolkit'

const tableSlice = createSlice({
    name: 'tableSlice',
    initialState: {
        state: {
            stats: 'ok',
        },
        denied: false,
        tableid: '',
        name: '',
        guests: 0,
        players: [],
        contracts: [],
        games: [],
        view: 'ranking',
        ranking: [],
        oldest: null,
        graph: {
            raw: [],
            dates: [],
            series: {},
            focus: '',
        },
        datafocus: 'averagepoints',
        dataperiod: 'sliding',
    },
    reducers: {
        lock: (state, action) => {
            state.state[action.payload.scope] = 'locked'
        },
        unload: (state, action) => {
            console.log('tableSlice.unload')
            delete state.state.stats
            delete state.state.history
        },
        setDetails: (state, action) => {
            console.log('tableSlice.setDetails', action.payload)
            state.tableid = action.payload.tableid
            state.name = action.payload.name
            state.guests = action.payload.guests
            state.players = action.payload.players
            state.contracts = action.payload.contracts
            state.games = []
            state.ranking = []
            state.graph = {
                dates: [],
                series: {},
                focus: '',
            }
            state.state.details = 'available'
            delete state.state.history
            delete state.state.ranking
            delete state.state.graph
        },
        setHistory: (state, action) => {
            console.log('tableSlice.setHistory', action.payload)
            state.games = action.payload
            state.state.history = 'available'
        },
        setView: (state, action) => {
            state.view = action.payload.view
        },
        setOldest: (state, action) => {
            state.oldest = action.payload.year
            state.state.oldest = 'available'
        },
        setRanking: (state, action) => {
            console.log('tableSlice.setRanking', action.payload)
            state.ranking = action.payload
            state.state.ranking = 'available'
        },
        setGraph: (state, action) => {
            console.log('tableSlice.setGraph', action.payload)
            switch (action.payload.field) {
                case 'raw':
                    state.graph.raw = action.payload.value
                    break
                case 'dates':
                    state.graph.dates = action.payload.value
                    break
                case 'serie':
                    if (Object.keys(state.graph.series).length === 0) {
                        state.graph.series = {}
                    }
                    state.graph.series[action.payload.values.userid] =
                        action.payload.values.serie
                    state.state.graph = 'available'
                    break
                case 'focus':
                    if (state.graph.focus === action.payload.value) {
                        // Unfocus
                        state.graph.focus = ''
                        state.graph.series[action.payload.value].lineStyle = {
                            color: '#9E9E9E', // Grey
                            width: 1,
                        }
                    } else {
                        if (state.graph.focus !== '') {
                            // Remove previous focus
                            state.graph.series[state.graph.focus].lineStyle = {
                                color: '#9E9E9E', // Grey
                                width: 1,
                            }
                        }
                        // Focus
                        state.graph.focus = action.payload.value
                        state.graph.series[action.payload.value].lineStyle = {
                            color: '#7b1fa2',
                            width: 3,
                        }
                    }
                    break
                default:
                    console.error(
                        'tableSlice.setGraph unmatched field',
                        action.payload.field
                    )
            }
        },
        datafocus: (state, action) => {
            state.datafocus = action.payload.datafocus
        },
        dataperiod: (state, action) => {
            state.dataperiod = action.payload.dataperiod
        },
        deny: (state) => {
            state.denied = true
            state.name = 'A table'
        },
    },
})

export default tableSlice.reducer
