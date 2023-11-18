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
        state.state.push("details")
        state.userid = action.payload.userid;
        state.login = action.payload.login;
        state.pseudo = action.payload.pseudo;
        state.status = action.payload.status;
        state.priviledges = action.payload.priviledges;
        state.tables = action.payload.tables;
    },
    unload: (state) => {
      state.loaded = false;
    },
  },
});

export default userSlice.reducer;
