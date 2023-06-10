import { createSlice } from "@reduxjs/toolkit";

const sliceSnack = createSlice({
  name: "sliceSnack",
  initialState: {
    open: false,
    snackData: {
      id: "",
      uid: undefined,
      details: [],
    },
  },
  reducers: {
    open: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceSnack.open");
      }
      state.open = true;
    },
    close: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceSnack.close");
      }
      state.open = false;
    },
    change: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceSnack.change");
        //console.log(action.payload);
      }
      state.snackData.id = action.payload.id;
      state.snackData.uid = action.payload.uid;
      if (action.payload.details !== undefined) {
        state.snackData.details = action.payload.details;
      } else {
        state.snackData.details = [];
      }
    },
  },
});

export default sliceSnack.reducer;
