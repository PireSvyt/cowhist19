import { configureStore } from "@reduxjs/toolkit";
// Domains
import authSlice from "../services/auth/auth.slice.js"
import userSlice from "../services/user/user.slice.js"
import tableSlice from "../services/table/table.slice.js";
import adminSlice from "../services/admin/admin.slice.js";
// Modals
import signupModalSlice from "../services/modals/signup/signup.slice.js";
import signinModalSlice from "../services/modals/signin/signin.slice.js";
import inviteModalSlice from "../services/modals/invite/invite.slice.js";
import tableModalSlice from "../services/modals/table/table.slice.js";
import gameModalSlice from "../services/modals/game/game.slice.js";
import tocomeModalSlice from "../services/modals/tocome/tocome.slice.js";
import feedbackModalSlice from "../services/modals/feedback/feedback.slice.js";
// UI components
import sliceSnack from "../services/components/snack/sliceSnack.js";
// Test
import sliceTests from "../services/sliceTests.js";

// Slices
const slices = {
  
  authSlice: authSlice,
  userSlice: userSlice,
  tableSlice: tableSlice,
  adminSlice: adminSlice,

  signupModalSlice: signupModalSlice,
  signinModalSlice: signinModalSlice,
  inviteModalSlice: inviteModalSlice,
  tableModalSlice: tableModalSlice,
  gameModalSlice: gameModalSlice,
  tocomeModalSlice: tocomeModalSlice,
  feedbackModalSlice: feedbackModalSlice,
  
  sliceSnack: sliceSnack,

  sliceTests: sliceTests,

}

export default configureStore({
  reducer: slices,
});