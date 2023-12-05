import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    state: [],
    loaded: false,
    userid: "",
    login: "",
    pseudo: "",
    status: "",
    priviledges: [],
    tables: [],
  },
  reducers: {
    setDetails: (state, action) => {
      //console.log("userSlice/setDetails ",action.payload)
      state.state.push("details")
      if (action.payload.userid !== undefined) {
        state.userid = action.payload.userid;
      }
      if (action.payload.login !== undefined) {
        state.login = action.payload.login;
      }
      if (action.payload.pseudo !== undefined) {
        state.pseudo = action.payload.pseudo;
      }
      if (action.payload.status !== undefined) {
        state.status = action.payload.status;
      }
      if (action.payload.priviledges !== undefined) {
        state.priviledges = action.payload.priviledges;
      }
      if (action.payload.tables !== undefined) {
        state.tables = action.payload.tables;
      }
      state.loaded = true;
    },
    unload: (state) => {
      state.loaded = false;
      state.userid= ""
      state.login= ""
      state.pseudo= ""
      state.status= ""
      state.priviledges= []
      state.tables= []
    },
  },
});

export default userSlice.reducer;
