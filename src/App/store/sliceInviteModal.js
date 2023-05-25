import { createSlice, configureStore } from "@reduxjs/toolkit";

const sliceInviteModal = createSlice({
  name: "sliceInviteModal",
  initialState: {
    open: false,
    inputs: {
      pseudo: "",
      login: "",
      acknowledgement: false,
    },
    errors: {
      pseudo: false,
      login: false,
      acknowledgement: false,
    },
    disabled: false,
    loading: false,
  },
  reducers: {
    open: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceInviteModal.open");
      }
      state.open = true;
      state.inputs = {
        pseudo: "",
        login: "",
        acknowledgement: false,
      };
      state.errors = {
        pseudo: false,
        login: false,
      };
    },
    close: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceInviteModal.close");
      }
      state.open = false;
      state.inputs = {
        pseudo: "",
        login: "",
        acknowledgement: false,
      };
      state.errors = {
        pseudo: false,
        login: false,
      };
      state.disabled = false;
      state.loading = false;
    },
    change: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceInviteModal.change");
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
        if (action.payload.inputs.acknowledgement !== undefined) {
          state.inputs.acknowledgement = action.payload.inputs.acknowledgement;
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
        if (action.payload.errors.acknowledgement !== undefined) {
          state.errors.acknowledgement = action.payload.errors.acknowledgement;
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
        console.log("sliceInviteModal.lock");
        //console.log(action.payload);
      }
      state.disabled = true;
      state.loading = true;
    },
  },
});

export default sliceInviteModal.reducer;
