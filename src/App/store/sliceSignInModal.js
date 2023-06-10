import { createSlice } from "@reduxjs/toolkit";

const sliceSignInModal = createSlice({
  name: "sliceSignInModal",
  initialState: {
    open: false,
    inputs: {
      login: "",
      password: "",
    },
    errors: {
      login: false,
      password: false,
    },
    disabled: false,
    loading: false,
  },
  reducers: {
    open: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceSignInModal.open");
      }
      state.open = true;
      state.inputs = {
        login: "",
        password: "",
      };
      state.errors = {
        login: false,
        password: false,
      };
    },
    close: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceSignInModal.close");
      }
      state.open = false;
      state.inputs = {
        login: "",
        password: "",
      };
      state.errors = {
        login: false,
        password: false,
      };
      state.disabled = false;
      state.loading = false;
    },
    change: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceSignInModal.change");
        //console.log(action.payload);
      }
      if (action.payload.open !== undefined) {
        state.open = action.payload.open;
      }
      // Inputs
      if (action.payload.inputs !== undefined) {
        if (action.payload.inputs.login !== undefined) {
          state.inputs.login = action.payload.inputs.login;
        }
        if (action.payload.inputs.password !== undefined) {
          state.inputs.password = action.payload.inputs.password;
        }
      }
      // Errors
      if (action.payload.errors !== undefined) {
        if (action.payload.errors.login !== undefined) {
          state.errors.login = action.payload.errors.login;
        }
        if (action.payload.errors.password !== undefined) {
          state.errors.password = action.payload.errors.password;
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
        console.log("sliceSignInModal.lock");
        //console.log(action.payload);
      }
      state.disabled = true;
      state.loading = true;
    },
  },
});

export default sliceSignInModal.reducer;
