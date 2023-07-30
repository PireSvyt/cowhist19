import axios from "axios";

// Reducers
import appStore from "../../store/appStore.js";

async function GetFeedbacksAPI(parameters) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/admin/v1/feedbacklist",
      parameters,
      {
        headers: {
          Authorization: "Bearer " + appStore.getState().sliceUserAuth.token,
        },
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default GetFeedbacksAPI;
