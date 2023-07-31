import { createSlice } from "@reduxjs/toolkit";

const sliceModals = createSlice({
  name: "sliceModals",
  initialState: {
    openSignUpModal: false,
    openSignInModal: false,
    openTableModal: false,
    openInviteModal: false,
    openGameModal: false,
    openChangePasswordModal: false
  },
  reducers: {
    open: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceModals.open ", action.payload);
      }
      switch (action.payload) {
        case "SignUp" :
            state.openSignUpModal = true
            break
        case "SignIn" :
            state.openSignInModal = true
            break
        case "Table" :
            state.openTableModal = true
            break
        case "Invite" :
            state.openInviteModal = true
            break
        case "Game" :
            state.openGameModal = true
            break
        case "ChangePassword" :
            state.openChangePasswordModal = true
            break
        default:
            console.error("sliceModals.open unknown modal ", action.payload)
      }
    },
    close: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceModals.close ", action.payload);
      }
      switch (action.payload) {
        case "SignUp" :
            state.openSignUpModal = false
            break
        case "SignIn" :
            state.openSignInModal = false
            break
        case "Table" :
            state.openTableModal = false
            break
        case "Invite" :
            state.openInviteModal = false
            break
        case "Game" :
            state.openGameModal = false
            break
        case "ChangePassword" :
            state.openChangePasswordModal = false
            break
        default:
            console.error("sliceModals.close unknown modal ", action.payload)
      }
    }
  },
});

export default sliceModals.reducer;