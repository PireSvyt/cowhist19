import { createSlice } from "@reduxjs/toolkit";

const sliceTests = createSlice({
  name: "sliceTests",
  initialState: {
    log: {},
  },
  reducers: {
    log: (state, action) => {
      console.log("sliceTests.log ", action);
      state.log[new Date()] = action.payload;
    },
    trash: (state) => {
      console.log("sliceTests.trash ");
      state.log = {};
    },
  },
});

export default sliceTests.reducer;
