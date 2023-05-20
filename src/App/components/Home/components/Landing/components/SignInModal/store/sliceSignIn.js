import { createSlice, configureStore } from "@reduxjs/toolkit";

const sliceSignIn = createSlice({
  name: "sliceSignIn",
  initialState: {
    open: false,
    inputs: {
      login: "",
      password: "",
    },
    loginError: false,
    passwordError: false,
    disabled: false,
    loading: false,
    snackOpen: false,
    snackData: { id: undefined },
  },
  reducers: {
    actionSignInOpen: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceSignIn.actionSignInOpen");
      }
      state.open = true;
      state.inputs = {
        login: "",
        password: "",
      };
      state.loginError = false;
      state.passwordError = false;
    },
    actionSignInClose: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceSignIn.actionSignInClose");
      }
      state.open = false;
      state.inputs = {
        login: "",
        password: "",
      };
      state.loginError = false;
      state.passwordError = false;
      state.disabled = false;
      state.loading = false;
    },
    actionSignInStateChanges: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceSignIn.actionSignInStateChanges");
        //console.log(action.payload);
      }
      if (action.payload.open !== undefined) {
        state.open = action.payload.open;
      }
      // Inputs
      if (action.payload.login !== undefined) {
        state.inputs.login = action.payload.login;
      }
      if (action.payload.password !== undefined) {
        state.inputs.password = action.payload.password;
      }
      // Errors
      if (action.payload.loginError !== undefined) {
        state.loginError = action.payload.loginError;
      }
      if (action.payload.passwordError !== undefined) {
        state.passwordError = action.payload.passwordError;
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
        console.log("sliceSignIn.actionSignInLock");
        //console.log(action.payload);
      }
      state.disabled = true;
      state.loading = true;
    },
    actionSignInSnack: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceSignIn.actionSignInStateChanges");
        //console.log(action.payload);
      }
      //state.snackOpen = true;
      state.snackData = action.payload;
    },
  },
});

export default sliceSignIn.reducer;
