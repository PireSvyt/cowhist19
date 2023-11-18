import { 
  combineReducers, 
  configureStore 
} from "@reduxjs/toolkit";
// APIs
import sliceUserAuth from "./sliceUserAuth.js";
import sliceUserDetails from "./sliceUserDetails.js";
import sliceTableDetails from "./sliceTableDetails.js";
import sliceTableHistory from "./sliceTableHistory.js";
import sliceTableStats from "./sliceTableStats.js";
// UI components
import sliceModals from "./sliceModals.js";
import sliceSignUpModal from "./sliceSignUpModal.js";
import sliceSignInModal from "./sliceSignInModal.js";
import sliceTableModal from "./sliceTableModal.js";
import sliceInviteModal from "./sliceInviteModal.js";
import sliceGameModal from "./sliceGameModal.js";
import sliceSnack from "./sliceSnack.js";
import sliceToComeModal from "./sliceToComeModal.js";
// Admin
import sliceAdminStats from "./sliceAdminStats.js";
// Test
import sliceTests from "./sliceTests.js";

/**
 * TO USE AFTER REFACTORING
 */

import authSlice from "../services/auth/auth.slice.js"
import userSlice from "../services/user/user.slice.js"
import tableSlice from "../services/table/table.slice.js";
// Modals
import signupModalSlice from "../services/modals/signup/signup.slice.js";
import signinModalSlice from "../services/modals/signin/signin.slice.js";
import inviteModalSlice from "../services/modals/invite/invite.slice.js";
import tableModalSlice from "../services/modals/table/table.slice.js";
import gameModalSlice from "../services/modals/game/game.slice.js";
import tocomeModalSlice from "../services/modals/tocome/tocome.slice.js";

// Slices
const slices = {
  sliceUserAuth: sliceUserAuth,
  sliceUserDetails: sliceUserDetails,
  sliceTableDetails: sliceTableDetails,
  sliceTableHistory: sliceTableHistory,
  sliceTableStats: sliceTableStats,
  sliceModals: sliceModals,
  sliceSignUpModal: sliceSignUpModal,
  sliceSignInModal: sliceSignInModal,
  sliceTableModal: sliceTableModal,
  sliceInviteModal: sliceInviteModal,
  sliceGameModal: sliceGameModal,
  sliceSnack: sliceSnack,
  sliceToComeModal: sliceToComeModal,
  sliceAdminStats: sliceAdminStats,
  sliceTests: sliceTests,
  authSlice: authSlice,
  userSlice: userSlice,
  tableSlice: tableSlice,
  signupModalSlice: signupModalSlice,
  signinModalSlice: signinModalSlice,
  inviteModalSlice: inviteModalSlice,
  tableModalSlice: tableModalSlice,
  gameModalSlice: gameModalSlice,
  tocomeModalSlice: tocomeModalSlice,
}

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers(slices)

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export default configureStore({
  reducer: slices,
});