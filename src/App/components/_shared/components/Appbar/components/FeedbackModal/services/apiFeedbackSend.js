import axios from "axios";

// Reducers
import appStore from "../../../../../../../store/appStore";

async function apiFeedbackSend(feedback) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/feedback/v1/create",
      feedback,
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

export default apiFeedbackSend;
