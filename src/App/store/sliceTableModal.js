import { createSlice } from "@reduxjs/toolkit";

const sliceTableModal = createSlice({
  name: "sliceTableModal",
  initialState: {
    open: false,
    id: "",
    inputs: {
      _id: "",
      name: "",
      players: [],
    },
    errors: {
      name: false,
      players: false,
    },
    disabled: false,
    loading: false,
    deleteConfirm: false,
  },
  reducers: {
    new: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableModal.new");
      }
      state.open = true;
      state.id = "";
      state.inputs = {
        _id: "",
        name: "",
        players: [action.payload],
      };
      state.errors = {
        name: false,
        players: false,
      };
    },
    open: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableModal.open");
        //console.log(action);
      }
      state.open = true;
      state.id = action.payload.id;
      state.inputs._id = action.payload.id;
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
        _id: "",
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
      // Confirm
      if (action.payload.deleteConfirm !== undefined) {
        state.deleteConfirm = action.payload.deleteConfirm;
      }
    },
    adduser: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableModal.adduser");
        //console.log(action.payload);
      }
      if (
        state.inputs.players.some((player) => player._id === action.payload._id)
      ) {
        // Not to be added
      } else {
        state.inputs.players.push(action.payload);
        state.errors.players = false;
      }
    },
    removeuser: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableModal.removeuser");
        //console.log(action.payload);
      }
      state.inputs.players = state.inputs.players.filter(
        (player) => player._id !== action.payload,
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
