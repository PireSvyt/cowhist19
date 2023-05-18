import { configureStore } from "@reduxjs/toolkit";
import sliceUserDetails from "./sliceUserDetails.js";
import sliceTableDetails from "./sliceTableDetails.js";
import sliceTableHistory from "./sliceTableHistory.js";
import sliceTableStats from "./sliceTableStats.js";

export default configureStore({
  reducer: {
    userDetails: sliceUserDetails,
    tableDetails: sliceTableDetails,
    tableHistory: sliceTableHistory,
    tableStats: sliceTableStats,
  },
});
