import { configureStore } from "@reduxjs/toolkit";
// APIs
import sliceUser from "./sliceUser.js";
import sliceUserDetails from "./sliceUserDetails.js";
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
import sliceToComeModal from "./sliceToComeModal.js";

export default configureStore({
  reducer: {
    sliceUser: sliceUser,
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
  },
});
