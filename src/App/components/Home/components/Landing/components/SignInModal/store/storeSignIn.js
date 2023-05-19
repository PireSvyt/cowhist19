import { configureStore } from "@reduxjs/toolkit";
// UI components
import sliceSignIn from "./sliceSignIn.js";

export default configureStore({
  reducer: {
    sliceSignIn: sliceSignIn,
  },
});
