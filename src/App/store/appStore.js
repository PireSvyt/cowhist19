import { configureStore } from "@reduxjs/toolkit";
// APIs
import sliceUser from "./sliceUser.js";
import sliceTableDetails from "./sliceTableDetails.js";
import sliceTableHistory from "./sliceTableHistory.js";
import sliceTableStats from "./sliceTableStats.js";
// UI components
import sliceSignUp from "./sliceSignUp.js";
import sliceSignIn from "./sliceSignIn.js";
import sliceSnack from "./sliceSnack.js";
import sliceTable from "./sliceTable.js";

export default configureStore({
  reducer: {
    sliceSignUp: sliceSignUp,
    sliceSignIn: sliceSignIn,
    sliceUser: sliceUser,
    sliceSnack: sliceSnack,
    sliceTable: sliceTable,
    tableDetails: sliceTableDetails,
    tableHistory: sliceTableHistory,
    tableStats: sliceTableStats,
  },
});
