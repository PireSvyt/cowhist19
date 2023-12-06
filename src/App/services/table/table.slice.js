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
    stats: {
        ranking: [],
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
      state.games = [],
      state.stats = {
          ranking: [],
      }
      state.state.details = "available";
    },
    setHistory: (state, action) => {
      console.log("tableSlice.setHistory", action.payload)
      state.games = action.payload
      state.state.history = "available";
    },
    setStats: (state, action) => {
      console.log("tableSlice.setStats", action.payload)
      state.stats = action.payload
      state.state.stats = "available";
    },
    deny: (state) => {
      state.denied = true;
      state.name = "A table";
    },
  },
});

export default tableSlice.reducer;
