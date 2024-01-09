import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    state: {},
    userid: "",
    login: "",
    pseudo: "",
    status: "",
    priviledges: [],
    tables: [],
    stats: {
      games: null,      
      rateattack: null,      
      ratevictory: null
    }
  },
  reducers: {
    change : (state, action) => {
      if (action.payload.userid !== undefined) {
        state.userid = action.payload.userid;
      }
      if (action.payload.login !== undefined) {
        state.login = action.payload.login;
      }
      if (action.payload.pseudo !== undefined) {
        state.pseudo = action.payload.pseudo;
      }
      if (action.payload.status !== undefined) {
        state.status = action.payload.status;
      }
      if (action.payload.priviledges !== undefined) {
        state.priviledges = action.payload.priviledges;
      }
      if (action.payload.tables !== undefined) {
        state.tables = action.payload.tables;
      }
      if (action.payload.stats !== undefined) {
        if (action.payload.stats.games !== undefined) {
          state.stats.games = action.payload.stats.games;
        }
        if (action.payload.stats.rateattack !== undefined) {
          state.stats.rateattack = action.payload.stats.rateattack;
        }
        if (action.payload.stats.ratevictory !== undefined) {
          state.stats.ratevictory = action.payload.stats.ratevictory;
        }
      }
      // 
      if (action.payload.state !== undefined) {
        if (action.payload.state.details !== undefined) {
          state.state.details = action.payload.state.details;
        }
        if (action.payload.state.stats !== undefined) {
          state.state.stats = action.payload.state.stats;
        }
      }
    },
    setDetails: (state, action) => {
      state.userid = action.payload.userid;
      state.login = action.payload.login;
      state.pseudo = action.payload.pseudo;
      state.status = action.payload.status;
      state.priviledges = action.payload.priviledges;
      state.tables = action.payload.tables;
      state.state.details = "available";
      delete state.state.stats
    },
    setStats: (state, action) => {
      state.stats = action.payload.stats;
      state.state.stats = "available"
    },
    unload: (state) => {
      state.state = {}
      state.userid = ""
      state.login = ""
      state.pseudo = ""
      state.status = ""
      state.priviledges = []
      state.tables = []
      state.stats = {
        games: null,      
        rateattack: null,      
        ratevictory: null
      }
    },
  },
});

export default userSlice.reducer;
