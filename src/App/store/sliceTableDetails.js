import { createSlice, configureStore } from "@reduxjs/toolkit";

const sliceTableDetails = createSlice({
  name: "sliceTableDetails",
  initialState: {
    id: "",
    name: "",
    players: [],
    contracts: [],
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
    },
  },
});

export default sliceTableDetails.reducer;
