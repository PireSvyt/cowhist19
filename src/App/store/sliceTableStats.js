import { createSlice } from "@reduxjs/toolkit";

const sliceTableStats = createSlice({
  name: "sliceTableStats",
  initialState: {
    loaded: false,
    stats: {
      ranking: [],
      graph: []
    },
    state: "available",
    view: "ranking"
  },
  reducers: {
    set: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableStats.set");
        //console.log(action.payload);
      }
      state.loaded = true;
      if (action.payload.ranking !== undefined) {
        state.stats.ranking = action.payload.ranking;
      }
      if (action.payload.graph !== undefined) {
        state.stats.graph = action.payload.graph;
      }
      state.state = "available";
    },
    lock: (state) => {
      state.state = "busy";
    },
    unload: (state) => {
      state.loaded = false;
    },
    view: (state, action) => {
      state.view = action.payload.view;
    },
  },
});

export default sliceTableStats.reducer;
