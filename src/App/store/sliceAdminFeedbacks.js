import { createSlice } from "@reduxjs/toolkit";

const sliceAdminFeedbacks = createSlice({
  name: "sliceAdminFeedbacks",
  initialState: {
    state: "available",
    denied: false,
    loaded: false,
    feedbacks: [],
  },
  reducers: {
    set: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceAdminFeedbacks.set");
        //console.log(action.payload);
      }
      if (action.payload.feedbacks !== undefined) {
        state.loaded = true;
        state.feedbacks = action.payload.feedbacks;
        state.state = "available";
      }
    },
    deny: (state) => {
      state.denied = true;
    },
    lock: (state) => {
      state.state = "busy";
    },
    unload: (state) => {
      state.loaded = false;
    },
  },
});

export default sliceAdminFeedbacks.reducer;
