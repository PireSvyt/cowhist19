import { createSlice } from "@reduxjs/toolkit";

const sliceAdminStats = createSlice({
  name: "sliceAdminStats",
  initialState: {
    state: "available",
    denied: false,
    loaded: {
      tablesbyplayers: false,
      tablesbygames: false,
      usersbystatus: false,
    },
    stats: {
      tablesbyplayers: [],
      tablesbygames: [],
      usersbystatus: [],
    },
  },
  reducers: {
    set: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceAdminStats.set");
        //console.log(action.payload);
      }
      if (action.payload.tablesbyplayers !== undefined) {
        state.loaded.tablesbyplayers = true;
        state.stats.tablesbyplayers = action.payload.tablesbyplayers;
      }
      if (action.payload.tablesbygames !== undefined) {
        state.loaded.tablesbygames = true;
        state.stats.tablesbygames = action.payload.tablesbygames;
      }
      if (action.payload.usersbystatus !== undefined) {
        state.loaded.usersbystatus = true;
        state.stats.usersbystatus = action.payload.usersbystatus;
      }
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

export default sliceAdminStats.reducer;
