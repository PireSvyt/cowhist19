import { createSlice, configureStore } from "@reduxjs/toolkit";

const sliceSignUp = createSlice({
  name: "sliceSignUp",
  initialState: {
    open: false,
    inputs: {
      pseudo: "",
      login: "",
      password: "",
      repeatpassword: "",
    },
    errors: {
      pseudo: false,
      login: false,
      password: false,
      repeatpassword: false,
    },
    disabled: false,
    loading: false,
    snackData: { id: undefined },
  },
  reducers: {
    open: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceSignUp.open");
      }
      state.open = true;
      state.inputs = {
        pseudo: "",
        login: "",
        password: "",
        repeatpassword: "",
      };
      state.errors = {
        pseudo: false,
        login: false,
        password: false,
        repeatpassword: false,
      };
      state.disabled = false;
      state.loading = false;
    },
    close: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceSignUp.close");
      }
      state.open = false;
      state.inputs = {
        pseudo: "",
        login: "",
        password: "",
        repeatpassword: "",
      };
      state.errors = {
        pseudo: false,
        login: false,
        password: false,
        repeatpassword: false,
      };
      state.disabled = false;
      state.loading = false;
    },
    change: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceSignUp.change");
        //console.log(action.payload);
      }
      if (action.payload.open !== undefined) {
        state.open = action.payload.open;
      }
      // Inputs
      if (action.payload.inputs !== undefined) {
        if (action.payload.inputs.pseudo !== undefined) {
          state.inputs.pseudo = action.payload.inputs.pseudo;
        }
        if (action.payload.inputs.login !== undefined) {
          state.inputs.login = action.payload.inputs.login;
        }
        if (action.payload.inputs.password !== undefined) {
          state.inputs.password = action.payload.inputs.password;
        }
        if (action.payload.inputs.repeatpassword !== undefined) {
          state.inputs.repeatpassword = action.payload.inputs.repeatpassword;
        }
      }
      // Errors
      if (action.payload.errors !== undefined) {
        if (action.payload.errors.pseudo !== undefined) {
          state.errors.pseudo = action.payload.errors.pseudo;
        }
        if (action.payload.errors.login !== undefined) {
          state.errors.login = action.payload.errors.login;
        }
        if (action.payload.errors.password !== undefined) {
          state.errors.password = action.payload.errors.password;
        }
        if (action.payload.errors.repeatpassword !== undefined) {
          state.errors.repeatpassword = action.payload.errors.repeatpassword;
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
        console.log("sliceSignUp.lock");
        //console.log(action.payload);
      }
      state.disabled = true;
      state.loading = true;
    },
  },
});

export default sliceSignUp.reducer;
