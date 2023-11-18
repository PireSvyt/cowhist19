import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "tableSlice",
  initialState: {
    state: [],
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
    setDetails: (state, action) => {
        state.tableid = action.payload.tableid;
        state.name = action.payload.name;
        state.players = action.payload.players;
        state.contracts = action.payload.contracts;
        state.state = ["details"];
        state.games = [],
        state.stats = {
            ranking: [],
        }
    },
    setHistory: (state, action) => {
        state.state.push("history");
        state.games = action.payload
    },
    setStats: (state, action) => {
        state.state.push("stats");
        state.stats = action.payload
    },
    deny: (state) => {
        state.state = ["denied"];
        state.denied = true;
        state.name = "A table";
    },
  },
});

export const selectTable_state = state => state.state
export const selectTable_denied = state => state.denied
export const selectTable_tableid = state => state.tableid
export const selectTable_name = state => state.name
export const selectTable_players = state => state.players
export const selectTable_contracts = state => state.contracts
export const selectTable_games = state => state.games
export const selectTable_stats = state => state.stats

export default tableSlice.reducer;
