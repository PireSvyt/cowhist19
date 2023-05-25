import { createSlice, configureStore } from "@reduxjs/toolkit";

const sliceUserAuth = createSlice({
  name: "sliceUserAuth",
  initialState: {
    loaded: false,
    signedin: false,
    token: ""
  },
  reducers: {
    signin: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceUserAuth.signin");
        //console.log(action.payload);
      }
      state.loaded = true;
      state.signedin = true;
      state.token = action.payload.token;
    },
    signout: (state) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceUserAuth.signout");
      }
      state.loaded = true;
      state.signedin = false;
      state.token = "";
    }
  },
});

export default sliceUserAuth.reducer;
