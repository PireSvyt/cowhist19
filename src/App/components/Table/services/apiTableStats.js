import axios from "axios";

// Reducers
import appStore from "../../../store/appStore.js";

async function apiTableStats(id, parameters) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/table/v1/stats/" + id,
      parameters,
      {
        headers: {
          Authorization: "Bearer " + appStore.getState().userDetails.token,
        },
      }
    );
    return res.data;
  } catch (err) {
    return err.response.status;
  }
}

export default apiTableStats;
