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
  },
  reducers: {
    set: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableStats.set");
        //console.log(action.payload);
      }
      state.loaded = true;
      if (action.payload.ranking !== undefined) {
        state.stats = action.payload.ranking;
      }
      if (action.payload.graph !== undefined) {
        state.graph = action.payload.graph;
      }
      state.state = "available";
    },
    lock: (state) => {
      state.state = "busy";
    },
    unload: (state) => {
      state.loaded = false;
    },
  },
});

export default sliceTableStats.reducer;
