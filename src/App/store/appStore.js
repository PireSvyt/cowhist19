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
import sliceSignUpModal from "./sliceSignUpModal.js";
import sliceSignInModal from "./sliceSignInModal.js";
import sliceTableModal from "./sliceTableModal.js";
import sliceInviteModal from "./sliceInviteModal.js";
import sliceGameModal from "./sliceGameModal.js";
import sliceSnack from "./sliceSnack.js";
import sliceToComeModal from "./sliceToComeModal.js";
// Admin
import sliceAdminStats from "./sliceAdminStats.js";

export default configureStore({
  reducer: {
    sliceUserAuth: sliceUserAuth,
    sliceUserDetails: sliceUserDetails,
    sliceTableDetails: sliceTableDetails,
    sliceTableHistory: sliceTableHistory,
    sliceTableStats: sliceTableStats,
    sliceSignUpModal: sliceSignUpModal,
    sliceSignInModal: sliceSignInModal,
    sliceTableModal: sliceTableModal,
    sliceInviteModal: sliceInviteModal,
    sliceGameModal: sliceGameModal,
    sliceSnack: sliceSnack,
    sliceToComeModal: sliceToComeModal,
    sliceAdminStats: sliceAdminStats,
  },
});
