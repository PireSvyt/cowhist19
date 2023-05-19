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
  },
  reducers: {
    actionSignInOpen: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceSignIn.actionSignInOpen");
        //console.log(action.payload);
      }
      return {
        ...state,
        open: true,
      };
    },
    actionSignInChange: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceSignIn.actionSignInChange");
        //console.log(action.payload);
      }
      if (action.payload.inputs !== undefined) {
        state.inputs = action.payload.inputs;
      }
      if (action.payload.loginError !== undefined) {
        state.loginError = action.payload.loginError;
      }
      if (action.payload.passwordError !== undefined) {
        state.passwordError = action.payload.passwordError;
      }
    },
    actionSignInClose: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceSignIn.actionSignInClose");
        //console.log(action.payload);
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
  },
});

export default sliceSignIn.reducer;

export const selectSignInOpen = (state) => state.signIn.open;
export const selectSignInInputs = (state) => state.signIn.inputs;
export const selectSignInLoginError = (state) => state.signIn.loginError;
export const selectSignInPasswordError = (state) => state.signIn.passwordError;
export const selectSignInDisabled = (state) => state.signIn.disabled;
export const selectSignInLoading = (state) => state.signIn.loading;

export const { actionSignInOpen, actionSignInClose, actionSignInChange } =
  sliceSignIn.actions;
