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
      series: {},
      focus: ""
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
    setfocus: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableStats.setfocus");
        //console.log(action.payload);
      }
      if (state.graph.focus === action.payload.focus) {
        // Unfocus
        state.graph.focus = ""
        state.graph.series[action.payload.focus].lineStyle = {
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
        state.graph.focus = action.payload.focus;
        state.graph.series[action.payload.focus].lineStyle = {
          color: '#9c27b0', // Secondary
          width: 3
        }
      }
    },
  },
});

export default sliceTableStats.reducer;
