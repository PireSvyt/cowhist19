// Inputs
import {
    feedbackCreateInputs,
  } from "./feedback.services.inputs.js";
  // Services
  import serviceProceed from "../_miscelaneous/serviceProceed.js";
  
  export async function serviceFeedbackCreate() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("serviceFeedbackCreate");
    }
    await serviceProceed(feedbackCreateInputs);
  }