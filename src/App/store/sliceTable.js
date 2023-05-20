import { createSlice, configureStore } from "@reduxjs/toolkit";

const sliceTable = createSlice({
  name: "sliceTable",
  initialState: {
    open: false,
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
        console.log("sliceTable.new");
      }
      state.open = true;
      state.inputs = {
        name: "",
        players: [],
      };
      state.errors = {
        login: false,
        password: false,
      };
    },
    open: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTable.open");
      }
      state.open = true;
      state.errors = {
        login: false,
        password: false,
      };
    },
    close: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTable.close");
      }
      state.open = false;
      state.errors = {
        login: false,
        password: false,
      };
      state.disabled = false;
      state.loading = false;
    },
    actionSignInStateChanges: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTable.actionSignInStateChanges");
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
    actionSignInLock: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTable.actionSignInLock");
        //console.log(action.payload);
      }
      state.disabled = true;
      state.loading = true;
    },
  },
});

export default sliceTable.reducer;
