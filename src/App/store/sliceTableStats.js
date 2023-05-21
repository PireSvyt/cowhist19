import { createSlice, configureStore } from "@reduxjs/toolkit";

const sliceTableStats = createSlice({
  name: "sliceTableStats",
  initialState: {
    stats: {
      ranking: [],
    },
    state: "available",
  },
  reducers: {
    set: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableStats.set");
        //console.log(action.payload);
      }
      state.stats = action.payload;
      state.state = "available";
    },
    lock: (state) => {
      state.state = "busy";
    },
  },
});

export default sliceTableStats.reducer;
