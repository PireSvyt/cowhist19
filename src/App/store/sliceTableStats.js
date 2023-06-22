import { createSlice } from "@reduxjs/toolkit";

const sliceTableStats = createSlice({
  name: "sliceTableStats",
  initialState: {
    loaded: false,
    stats: {
      ranking: []
    },
    state: "available",
    view: "ranking",
    curves: {}
  },
  reducers: {
    set: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableStats.set");
        //console.log(action.payload);
      }
      state.loaded = true;
      state.stats.ranking = action.payload.ranking;
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
    setcurve: (state, action) => {
      state.curves[action.payload._id] = action.payload.curve;
    },
  },
});

export default sliceTableStats.reducer;
