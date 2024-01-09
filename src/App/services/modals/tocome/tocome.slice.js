import { createSlice } from "@reduxjs/toolkit";

// Services
import { random_id } from "../../../services/_miscelaneous/toolkit.js";

const tocomeModalSlice = createSlice({
  name: "tocomeModalSlice",
  initialState: {
    tocomeData: { 
      uid: undefined, 
      flags: []
    },
  },
  reducers: {
    open: (state, action) => {
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

export const selectTocomeModal_tocomeData = state => state.tocomeData

export default tocomeModalSlice.reducer;
