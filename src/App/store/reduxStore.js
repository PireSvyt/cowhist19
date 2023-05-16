import { configureStore } from "@reduxjs/toolkit";
import sliceUser from "./sliceUser.js";
import sliceTable from "./sliceTable.js";

export default configureStore({
  reducer: {
    user: sliceUser,
    table: sliceTable,
  },
});
