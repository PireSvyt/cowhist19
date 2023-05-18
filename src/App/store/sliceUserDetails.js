import { createSlice, configureStore } from "@reduxjs/toolkit";

const sliceUserDetails = createSlice({
  name: "userDetails",
  initialState: {
    signedin: false,
    token: "",
    id: "",
    login: "",
    pseudo: "",
    status: "",
    priviledges: [],
    tables: [],
  },
  reducers: {
    signin: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceUserDetails.signin");
        //console.log(action.payload);
      }
      state.signedin = true;
      state.token = action.payload.token;
      state.id = action.payload.decodedtoken.id;
      state.login = action.payload.decodedtoken.login;
      state.pseudo = action.payload.decodedtoken.pseudo;
      state.status = action.payload.decodedtoken.status;
    },
    update: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceUserDetails.update");
        //console.log(action.payload);
      }
      state.login = action.payload.login;
      state.pseudo = action.payload.pseudo;
      state.status = action.payload.status;
      state.tables = action.payload.tables;
    },
    signout: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceUserDetails.signout");
      }
      state.signedin = false;
      state.token = "";
      state.id = "";
      state.login = "";
      state.pseudo = "";
      state.status = "";
      state.priviledges = [];
      state.tables = [];
    },
  },
});

export default sliceUserDetails.reducer;