import { createSlice, configureStore } from "@reduxjs/toolkit";

const sliceTableHistory = createSlice({
  name: "sliceTableHistory",
  initialState: {
    games: [],
    state: "available",
  },
  reducers: {
    set: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableHistory.set");
        //console.log(action.payload);
      }
      state.games = action.payload;
      state.state = "available";
    },
    lock: (state) => {
      state.state = "busy";
    },
  },
});

export default sliceTableHistory.reducer;
