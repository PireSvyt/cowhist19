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
      state.inputs.name = action.payload.name;
      state.inputs.players = action.payload.players;
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
        if (action.payload.inputs.name !== undefined) {
          state.inputs.name = action.payload.inputs.name;
        }
        if (action.payload.inputs.players !== undefined) {
          state.inputs.players = action.payload.inputs.players;
        }
      }
      // Errors
      if (action.payload.errors !== undefined) {
        if (action.payload.errors.name !== undefined) {
          state.errors.name = action.payload.errors.name;
        }
        if (action.payload.errors.players !== undefined) {
          state.errors.players = action.payload.errors.players;
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
    removeuser: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableModal.removeuser");
        //console.log(action.payload);
      }
      state.inputs.players = state.inputs.players.filter(
        (player) => player._id !== action.payload
      );
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
