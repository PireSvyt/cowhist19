import { createSlice, configureStore } from "@reduxjs/toolkit";

const sliceTableStats = createSlice({
  name: "tableStats",
  initialState: {
    stats: {},
  },
  reducers: {
    set: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableStats.set");
        //console.log(action.payload);
      }
      state.stats = action.payload;
    },
  },
});

export default sliceTableStats.reducer;
