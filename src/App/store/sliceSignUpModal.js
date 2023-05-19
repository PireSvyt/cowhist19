import { createSlice, configureStore } from "@reduxjs/toolkit";

const sliceSignUpModal = createSlice({
  name: "signUpModal",
  initialState: {
    open: false,
  },
  reducers: {
    open: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceSignUpModal.open");
      }
      state.open = true;
    },
    close: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceSignUpModal.close");
      }
      state.open = false;
    },
  },
});

export default sliceSignUpModal.reducer;
