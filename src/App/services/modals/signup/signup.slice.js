import { createSlice } from "@reduxjs/toolkit";

const signupModalSlice = createSlice({
  name: "signupModalSlice",
  initialState: {
    open: false,
    disabled: false,
    loading: false,
    inputs: {
      pseudo: "",
      login: "",
      password: "",
      passwordrepeat: "",
    },
    errors: {
      pseudo: false,
      login: false,
      password: false,
      passwordrepeat: false,
      existingpseudo: false,
      alreadysignedup: false
    },
  },
  reducers: {
    open: (state) => {
      state.open = true;
      state.inputs = {
        pseudo: "",
        login: "",
        password: "",
        passwordrepeat: "",
      };
      state.errors = {
        pseudo: false,
        login: false,
        password: false,
        passwordrepeat: false,
        existingpseudo: false,
        alreadysignedup: false
      };
      state.disabled = false;
      state.loading = false;
    },
    close: (state) => {
      state.open = false;
    },
    change: (state, action) => {
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
        if (action.payload.inputs.passwordrepeat !== undefined) {
          state.inputs.passwordrepeat = action.payload.inputs.passwordrepeat;
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
        if (action.payload.errors.passwordrepeat !== undefined) {
          state.errors.passwordrepeat = action.payload.errors.passwordrepeat;
        }
        if (action.payload.errors.existingpseudo !== undefined) {
          state.errors.existingpseudo = action.payload.errors.existingpseudo;
        }
        if (action.payload.errors.alreadysignedup !== undefined) {
          state.errors.alreadysignedup = action.payload.errors.alreadysignedup;
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
    lock: (state) => {
      state.disabled = true;
      state.loading = true;
    },
  },
});

export default signupModalSlice.reducer;
