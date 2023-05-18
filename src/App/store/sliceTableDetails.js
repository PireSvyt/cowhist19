import { createSlice, configureStore } from "@reduxjs/toolkit";

const sliceTableDetails = createSlice({
  name: "tableDetails",
  initialState: {
    id: "",
    name: "",
    players: [],
  },
  reducers: {
    set: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableDetails.details");
        //console.log(action.payload);
      }
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.players = action.payload.players;
    },
  },
});

export default sliceTableDetails.reducer;
