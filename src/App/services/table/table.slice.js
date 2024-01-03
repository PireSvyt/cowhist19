import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "tableSlice",
  initialState: {
    state: {},
    denied: false,
    tableid: "",
    name: "",
    players: [],
    contracts: [],
    games: [],
    view: "ranking",
    ranking: [],
    graph: {
      dates: [],
      series: {},
      focus: ""
    }
  },
  reducers: {
    lock: (state, action) => {
      state.state[action.payload.scope] = "locked";
    },
    unload: (state, action) => {
      console.log("tableSlice.unload")
      delete state.state.stats;
      delete state.state.history;
    },
    setDetails: (state, action) => {
      console.log("tableSlice.setDetails", action.payload)
      state.tableid = action.payload.tableid;
      state.name = action.payload.name;
      state.players = action.payload.players;
      state.contracts = action.payload.contracts;
      state.games = []
      state.ranking = []
      state.graph = {
        dates: [],
        series: {},
        focus: ""
      }      
      state.state.details = "available";
    },
    setHistory: (state, action) => {
      console.log("tableSlice.setHistory", action.payload)
      state.games = action.payload
      state.state.history = "available";
    },
    setView: (state, action) => {
      state.view = action.payload.view;
    },
    setRanking: (state, action) => {
      console.log("tableSlice.setRanking", action.payload)
      state.ranking = action.payload
      state.state.ranking = "available";
    },
    setGraph: (state, action) => {
      console.log("tableSlice.setGraph", action.payload)
      switch (action.payload.field) {
        case "dates":
          state.graph.dates = action.payload.value
          break;
        case "serie":
          if (Object.keys(state.graph.series).length === 0) {
            state.graph.series = {}
          }
          state.graph.series[action.payload.values.userid] = action.payload.values.serie
          state.state.graph = "available";
          break;
        case "focus":
          if (state.graph.focus === action.payload.value) {
            // Unfocus
            state.graph.focus = ""
            state.graph.series[action.payload.value].lineStyle = {
              color: '#9E9E9E',
              width: 1
            }
          } else {
            if (state.graph.focus !== "") {
              // Remove previous focus
              state.graph.series[state.graph.focus].lineStyle = {
                color: '#9E9E9E',
                width: 1
              }
            }
            // Focus
            state.graph.focus = action.payload.value;
            state.graph.series[action.payload.value].lineStyle = {
              //color: '#ef6c00', // Secondary
              color: '#2d7683', // Primary
              width: 3
            }
          }
          break;
        default: 
          console.error("tableSlice.setGraph unmatched field", action.payload.field)
      }
    },
    deny: (state) => {
      state.denied = true;
      state.name = "A table";
    },
  },
});

export default tableSlice.reducer;
