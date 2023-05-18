import { createSlice, configureStore } from "@reduxjs/toolkit";

const sliceTableHistory = createSlice({
  name: "tableHistory",
  initialState: {
    games: [],
  },
  reducers: {
    set: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableHistory.set");
        //console.log(action.payload);
      }
      state.games = action.payload;
    },
  },
});

export default sliceTableHistory.reducer;
