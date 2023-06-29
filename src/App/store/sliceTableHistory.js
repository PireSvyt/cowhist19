import { createSlice } from "@reduxjs/toolkit";

const sliceTableHistory = createSlice({
  name: "sliceTableHistory",
  initialState: {
    loaded: false,
    games: [],
    state: "available",
    more: false,
  },
  reducers: {
    set: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceTableHistory.set");
        console.log(action.payload);
      }
      if (action.payload.action !== "error") {
        if (action.payload.action === "new") {
          state.games = action.payload.games;
        }
        if (action.payload.action === "append") {
          // Consolidate games
          action.payload.games.forEach(game => {
            const found = state.games.some(loadedgame => loadedgame._id === game._id);
            if (!found) {
              state.games.push(game);
            }
          });
        }
        state.more = action.payload.more;
      }
      state.loaded = true;
      state.state = "available";
    },
    lock: (state) => {
      state.state = "busy";
    },
    unload: (state) => {
      state.loaded = false;
    },
  },
});

export default sliceTableHistory.reducer;
