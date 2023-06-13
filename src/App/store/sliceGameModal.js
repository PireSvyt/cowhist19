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
    focuses: {
      contract: false,
      attack: false,
      defense: false,
      outcome: false,
    },
    requirements: {
      attack: 0,
      defense: 0,
      outcome: 0,
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
      state.focuses = {
        contract: true,
        attack: false,
        defense: false,
        outcome: false,
      };
      state.requirements = {
        attack: 0,
        defense: 0,
        outcome: 0,
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
      state.focuses = {
        contract: false,
        attack: false,
        defense: false,
        outcome: false,
      };
      state.requirements = {
        attack: 0,
        defense: 0,
        outcome: 0,
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
        attack: 0,
        defense: 0,
        outcome: 0,
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
    addplayer: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceGameModal.addplayer");
        //console.log(action.payload);
      }
      state.inputs.players.push(action.payload.player)
      // Errors
      if (action.payload.errors !== undefined) {
        if (action.payload.errors.attack !== undefined) {
          state.errors.attack = action.payload.errors.attack;
        }
        if (action.payload.errors.defense !== undefined) {
          state.errors.defense = action.payload.errors.defense;
        }
      }
    },
    removeplayer: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceGameModal.removeplayer");
        //console.log(action.payload);
      }
      state.inputs.players = state.inputs.players.filter(player => player._id !== action.payload.player)
      // Errors
      if (action.payload.errors !== undefined) {
        if (action.payload.errors.attack !== undefined) {
          state.errors.attack = action.payload.errors.attack;
        }
        if (action.payload.errors.defense !== undefined) {
          state.errors.defense = action.payload.errors.defense;
        }
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
    openMenu: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceGameModal.openMenu");
        //console.log(action.payload);
      }
      if (action.payload.menu === "contract") {
        state.focuses.contract = true
      } else {
        state.focuses.contract = false
      }
      if (action.payload.menu === "attack") {
        state.focuses.attack = true
      } else {
        state.focuses.attack = false
      }
      if (action.payload.menu === "defense") {
        state.focuses.defense = true
      } else {
        state.focuses.defense = false
      }
      if (action.payload.menu === "outcome") {
        state.focuses.outcome = true
      } else {
        state.focuses.outcome = false
      }
    },
    closeMenu: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceGameModal.closeMenu");
        //console.log(action.payload);
      }
      state.focuses[action.payload.menu] = false
    },
  },
});

export default sliceGameModal.reducer;
