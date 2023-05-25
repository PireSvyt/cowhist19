import { createSlice, configureStore } from "@reduxjs/toolkit";

const sliceUserDetails = createSlice({
  name: "sliceUserDetails",
  initialState: {
    loaded: false,
    id: "",
    login: "",
    pseudo: "",
    status: "",
    priviledges: [],
    tables: [],
  },
  reducers: {
    set: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceUserDetails.set");
        //console.log(action.payload);
      }
      state.loaded = true;
      state.id = action.payload._id;
      state.login = action.payload.login;
      state.pseudo = action.payload.pseudo;
      state.status = action.payload.status;
      state.priviledges = action.payload.priviledges;
      state.tables = action.payload.tables;
    },
    lock: (state) => {
      state.state = "busy";
    },
    unload: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceUserDetails.unload");
      }
      state.loaded = false;
    },
  },
});

export default sliceUserDetails.reducer;
