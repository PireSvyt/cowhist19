import { createSlice } from "@reduxjs/toolkit";

const sliceGameModal = createSlice({
  name: "sliceGameModal",
  initialState: {
    open: false,
    inputs: {
      contract: "",
      players: [],
      outcome: 0,
    },
    errors: {
      contract: false,
      attack: false,
      defense: false,
      outcome: false,
    },
    requirements: {
      attack: "",
      defense: "",
      outcome: "",
    },
    disabled: false,
    loading: false,
  },
  reducers: {
    new: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceGameModal.new");
      }
      state.open = true;
      state.inputs = {
        contract: "",
        players: [],
        outcome: 0,
      };
      state.errors = {
        contract: false,
        attack: false,
        defense: false,
        outcome: false,
      };
      state.requirements = {
        attack: "",
        defense: "",
        outcome: "",
      };
      state.disabled = false;
      state.loading = false;
    },
    open: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceGameModal.open");
      }
      state.open = true;
      state.inputs = {
        contract: "",
        players: [],
        outcome: 0,
      };
      state.errors = {
        contract: false,
        attack: false,
        defense: false,
        outcome: false,
      };
      state.requirements = {
        attack: "",
        defense: "",
        outcome: "",
      };
      state.disabled = false;
      state.loading = false;
    },
    close: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceGameModal.close");
      }
      state.open = false;
      state.inputs = {
        contract: "",
        players: [],
        outcome: 0,
      };
      state.errors = {
        contract: false,
        attack: false,
        defense: false,
        outcome: false,
      };
      state.requirements = {
        attack: "",
        defense: "",
        outcome: "",
      };
      state.disabled = false;
      state.loading = false;
    },
    change: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceGameModal.change");
        //console.log(action.payload);
      }
      if (action.payload.open !== undefined) {
        state.open = action.payload.open;
      }
      // Inputs
      if (action.payload.inputs !== undefined) {
        if (action.payload.inputs.contract !== undefined) {
          state.inputs.contract = action.payload.inputs.contract;
        }
        if (action.payload.inputs.players !== undefined) {
          state.inputs.players = action.payload.inputs.players;
        }
        if (action.payload.inputs.outcome !== undefined) {
          state.inputs.outcome = action.payload.inputs.outcome;
        }
      }
      // Errors
      if (action.payload.errors !== undefined) {
        if (action.payload.errors.contract !== undefined) {
          state.errors.contract = action.payload.errors.contract;
        }
        if (action.payload.errors.attack !== undefined) {
          state.errors.attack = action.payload.errors.attack;
        }
        if (action.payload.errors.defense !== undefined) {
          state.errors.defense = action.payload.errors.defense;
        }
        if (action.payload.errors.outcome !== undefined) {
          state.errors.outcome = action.payload.errors.outcome;
        }
      }
      // Requirements
      if (action.payload.requirements !== undefined) {
        if (action.payload.requirements.attack !== undefined) {
          state.requirements.attack = action.payload.requirements.attack;
        }
        if (action.payload.requirements.defense !== undefined) {
          state.requirements.defense = action.payload.requirements.defense;
        }
        if (action.payload.requirements.outcome !== undefined) {
          state.requirements.outcome = action.payload.requirements.outcome;
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
        console.log("sliceGameModal.lock");
        //console.log(action.payload);
      }
      state.disabled = true;
      state.loading = true;
    },
  },
});

export default sliceGameModal.reducer;
