import axios from "axios";

// Reducers
import reduxStore from "../../../store/reduxStore.js";

async function apiTableStats(id, parameters) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/table/v1/stats/" + id,
      parameters,
      {
        headers: {
          Authorization: "Bearer " + reduxStore.getState().userDetails.token,
        },
      }
    );
    return res.data;
  } catch (err) {
    return err.response.status;
  }
}

export default apiTableStats;
