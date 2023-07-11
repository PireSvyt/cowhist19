import { createSlice } from "@reduxjs/toolkit";

const sliceChangePasswordModal = createSlice({
  name: "sliceChangePasswordModal",
  initialState: {
    open: false,
    inputs: {
      current: "",
      new: "",
      repeat: "",
    },
    errors: {
      current: false,
      new: false,
      repeat: false,
    },
    disabled: false,
    loading: false,
  },
  reducers: {
    open: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceChangePasswordModal.open");
      }
      state.open = true;
      state.inputs = {
        current: "",
        new: "",
        repeat: "",
      };
      state.errors = {
        current: false,
        new: false,
        repeat: false,
      };
      state.disabled = false;
      state.loading = false;
    },
    close: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceChangePasswordModal.close");
      }
      state.open = false;
      state.inputs = {
        current: "",
        new: "",
        repeat: "",
      };
      state.errors = {
        current: false,
        new: false,
        repeat: false,
      };
      state.disabled = false;
      state.loading = false;
    },
    change: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceChangePasswordModal.change");
        //console.log(action.payload);
      }
      if (action.payload.open !== undefined) {
        state.open = action.payload.open;
      }
      // Inputs
      if (action.payload.inputs !== undefined) {
        if (action.payload.inputs.current !== undefined) {
          state.inputs.current = action.payload.inputs.current;
        }
        if (action.payload.inputs.new !== undefined) {
          state.inputs.new = action.payload.inputs.new;
        }
        if (action.payload.inputs.repeat !== undefined) {
          state.inputs.repeat = action.payload.inputs.repeat;
        }
      }
      // Errors
      if (action.payload.errors !== undefined) {
        if (action.payload.errors.current !== undefined) {
          state.errors.current = action.payload.errors.current;
        }
        if (action.payload.errors.new !== undefined) {
          state.errors.new = action.payload.errors.new;
        }
        if (action.payload.errors.repeat !== undefined) {
          state.errors.repeat = action.payload.errors.repeat;
        }
      }
      // Lock
      if (action.payload.disabled !== undefined) {
        state.disabled = action.payload.disabled;
      }
      if (action.payload.loading !== undefined) {
        state.loading = action.payload.loading;
      }
    },
    lock: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceChangePasswordModal.lock");
        //console.log(action.payload);
      }
      state.disabled = true;
      state.loading = true;
    },
  },
});

export default sliceChangePasswordModal.reducer;
