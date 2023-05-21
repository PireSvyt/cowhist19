import { createSlice, configureStore } from "@reduxjs/toolkit";

const sliceTableDetails = createSlice({
  name: "sliceTableDetails",
  initialState: {
    id: "",
    name: "",
    players: [],
    contracts: [],
    state: "available"
  },
  reducers: {
    set: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableDetails.set");
        //console.log(action.payload);
      }
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.players = action.payload.players;
      state.contracts = action.payload.contracts;
      state.state = "available";
    },
    lock: (state) => {
      state.state = "busy";
    }
  },
});

export default sliceTableDetails.reducer;
