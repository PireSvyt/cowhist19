import { createSlice, configureStore } from "@reduxjs/toolkit";

const sliceTable = createSlice({
  name: "table",
  initialState: {
    id: "",
    name: "",
    players: [],
    stats: [],
    history: [],
  },
  reducers: {
    details: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTable.details");
        //console.log(action.payload);
      }
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.players = action.payload.players;
    },
    stats: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTable.stats");
        //console.log(action.payload);
      }
      state.stats = action.payload;
    },
    history: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTable.history");
        //console.log(action.payload);
      }
      state.history = action.payload;
    },
  },
});

export default sliceTable.reducer;
