import { createSlice } from "@reduxjs/toolkit";

const sliceTableHistory = createSlice({
  name: "sliceTableHistory",
  initialState: {
    loaded: false,
    games: [],
    state: "available",
  },
  reducers: {
    set: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableHistory.set");
        //console.log(action.payload);
      }
      state.loaded = true;
      state.games = action.payload;
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

export default sliceTableHistory.reducer;
