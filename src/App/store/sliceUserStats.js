import { createSlice } from "@reduxjs/toolkit";

const sliceUserStats = createSlice({
  name: "sliceUserStats",
  initialState: {
    loaded: false,
    stats: {
      games: null,      
      rateattack: null,      
      ratevictory: null
    },
    state: "available"
  },
  reducers: {
    set: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceUserStats.set");
        //console.log(action.payload);
      }
      state.loaded = true;
      state.stats = action.payload;
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

export default sliceUserStats.reducer;
