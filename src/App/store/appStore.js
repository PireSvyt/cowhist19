import { configureStore } from "@reduxjs/toolkit";
// APIs
import sliceUser from "./sliceUser.js";

import sliceTableDetails from "./sliceTableDetails.js";
import sliceTableHistory from "./sliceTableHistory.js";
import sliceTableStats from "./sliceTableStats.js";
// UI components
import sliceSignUpModal from "./sliceSignUpModal.js";
import sliceSignInModal from "./sliceSignInModal.js";
import sliceTableModal from "./sliceTableModal.js";
import sliceSnack from "./sliceSnack.js";
import sliceToComeModal from "./sliceToComeModal.js";

export default configureStore({
  reducer: {
    sliceSignUpModal: sliceSignUpModal,
    sliceSignInModal: sliceSignInModal,
    sliceTableModal: sliceTableModal,
    sliceSnack: sliceSnack,
    sliceToComeModal: sliceToComeModal,
    sliceUser: sliceUser,
    tableDetails: sliceTableDetails,
    tableHistory: sliceTableHistory,
    tableStats: sliceTableStats,
  },
});
