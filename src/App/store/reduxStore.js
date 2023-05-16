import { configureStore } from "@reduxjs/toolkit";
import sliceUser from "./sliceUser.js";

export default configureStore({
  reducer: {
    user: sliceUser,
  },
});
