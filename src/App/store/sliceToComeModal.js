import { createSlice } from "@reduxjs/toolkit";

// Services
import { random_id } from "../services/_miscelaneous/toolkit.js";

const sliceToComeModal = createSlice({
  name: "sliceToComeModal",
  initialState: {
    tocomeData: { uid: undefined, flags: [] },
  },
  reducers: {
    open: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceToComeModal.open");
      }
      state.tocomeData.uid = random_id();
      if (action.payload !== undefined) {
        if (action.payload.flags !== undefined) {
          state.tocomeData.flags = action.payload.flags;
        } else {
          state.tocomeData.flags = [];
        }
      } else {
        state.tocomeData.flags = [];
      }
    },
  },
});

export default sliceToComeModal.reducer;
