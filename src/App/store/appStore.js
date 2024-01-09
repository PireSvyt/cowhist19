import { configureStore } from "@reduxjs/toolkit";
// APIs
import sliceUserAuth from "./sliceUserAuth.js";
import sliceUserDetails from "./sliceUserDetails.js";
import sliceUserStats from "./sliceUserStats.js";
import sliceTableDetails from "./sliceTableDetails.js";
import sliceTableHistory from "./sliceTableHistory.js";
import sliceTableStats from "./sliceTableStats.js";
// UI components
import sliceSignUpModal from "./sliceSignUpModal.js";
import sliceSignInModal from "./sliceSignInModal.js";
import sliceTableModal from "./sliceTableModal.js";
import sliceInviteModal from "./sliceInviteModal.js";
import sliceGameModal from "./sliceGameModal.js";
import sliceSnack from "./sliceSnack.js";
import sliceFeedbackModal from "./sliceFeedbackModal.js";
import sliceChangePasswordModal from "./sliceChangePasswordModal.js"
// Admin
import sliceAdminStats from "./sliceAdminStats.js";
import sliceAdminFeedbacks from "./sliceAdminFeedbacks.js";

export default configureStore({
  reducer: {
    sliceUserAuth: sliceUserAuth,
    sliceUserDetails: sliceUserDetails,
    sliceUserStats: sliceUserStats,
    sliceTableDetails: sliceTableDetails,
    sliceTableHistory: sliceTableHistory,
    sliceTableStats: sliceTableStats,
    sliceSignUpModal: sliceSignUpModal,
    sliceSignInModal: sliceSignInModal,
    sliceTableModal: sliceTableModal,
    sliceInviteModal: sliceInviteModal,
    sliceGameModal: sliceGameModal,
    sliceSnack: sliceSnack,
    sliceFeedbackModal: sliceFeedbackModal,
    sliceChangePasswordModal: sliceChangePasswordModal,
    sliceAdminStats: sliceAdminStats,
    sliceAdminFeedbacks: sliceAdminFeedbacks,
  },
});