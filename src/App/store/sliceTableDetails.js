import { createSlice, configureStore } from "@reduxjs/toolkit";

const sliceTableDetails = createSlice({
  name: "sliceTableDetails",
  initialState: {
    loaded: false,
    denied: false,
    id: "",
    name: "",
    players: [],
    contracts: [],
    state: "available",
  },
  reducers: {
    set: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableDetails.set");
        //console.log(action.payload);
      }
      state.loaded = true;
      state.id = action.payload._id;
      state.name = action.payload.name;
      state.players = action.payload.players;
      state.contracts = action.payload.contracts;
      state.state = "available";
    },
    deny: (state) => {
      state.denied = true;
    },
    lock: (state) => {
      state.state = "busy";
    },
    unload: (state) => {
      state.loaded = false;
    },
  },
});

export default sliceTableDetails.reducer;
