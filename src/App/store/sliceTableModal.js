import { createSlice, configureStore } from "@reduxjs/toolkit";

const sliceTableModal = createSlice({
  name: "sliceTableModal",
  initialState: {
    open: false,
    id: "",
    inputs: {
      name: "",
      players: [],
    },
    errors: {
      name: false,
      players: false,
    },
    disabled: false,
    loading: false,
    snackData: { id: undefined },
  },
  reducers: {
    new: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableModal.new");
      }
      state.open = true;
      state.id = "";
      state.inputs = {
        name: "",
        players: [],
      };
      state.errors = {
        name: false,
        players: false,
      };
    },
    open: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableModal.open");
      }
      state.open = true;
      state.id = action.payload.id;
      state.errors = {
        name: false,
        players: false,
      };
    },
    close: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableModal.close");
      }
      state.open = false;
      state.errors = {
        name: false,
        players: false,
      };
      state.disabled = false;
      state.loading = false;
    },
    change: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableModal.change");
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
        if (action.payload.errors.loginError !== undefined) {
          state.loginError = action.payload.errors.loginError;
        }
        if (action.payload.errors.passwordError !== undefined) {
          state.passwordError = action.payload.errors.passwordError;
        }
      }
      // Lock
      if (action.payload.disabled !== undefined) {
        state.disabled = action.payload.disabled;
      }
      if (action.payload.loading !== undefined) {
        state.loading = action.payload.loading;
      }
      // Snack
      if (action.payload.snackOpen !== undefined) {
        state.snackOpen = action.payload.snackOpen;
      }
      if (action.payload.snackData !== undefined) {
        state.snackData = action.payload.snackData;
      }
    },
    lock: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableModal.lock");
        //console.log(action.payload);
      }
      state.disabled = true;
      state.loading = true;
    },
  },
});

export default sliceTableModal.reducer;
