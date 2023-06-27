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
    graph: {
      dates: [],
      series: {}
    }
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
    setdates: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableStats.setdates");
      }
      state.graph.dates = action.payload.dates;
    },
    setserie: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableStats.setserie");
        //console.log(action.payload);
      }
      state.graph.series[action.payload._id] = action.payload.serie;
    },
  },
});

export default sliceTableStats.reducer;
