import { createSlice, configureStore } from "@reduxjs/toolkit";

// Services
import { random_id } from "../shared/services/toolkit.js";

const sliceConfirmModal = createSlice({
  name: "sliceConfirmModal",
  initialState: {
    confirmData: {
      uid: undefined,
      title: "",
      content: "",
      callToActions: [],
    },
  },
  reducers: {
    open: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceConfirmModal.open");
      }
      state.confirmData.uid = random_id();
      if (action.payload !== undefined) {
        if (action.payload.title !== undefined) {
          state.confirmData.title = action.payload.title;
        } else {
          state.confirmData.title = "";
        }
        if (action.payload.content !== undefined) {
          state.confirmData.content = action.payload.content;
        } else {
          state.confirmData.content = "";
        }
        if (action.payload.callToActions !== undefined) {
          state.confirmData.callToActions = action.payload.callToActions;
        } else {
          state.confirmData.callToActions = [];
        }
      }
    },
  },
});

export default sliceConfirmModal.reducer;
