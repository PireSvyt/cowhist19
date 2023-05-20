import axios from "axios";

// Reducers
import appStore from "../../../store/appStore.js";

async function apiTableHistory(id, parameters) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/table/history/" + id,
      parameters,
      {
        headers: {
          Authorization: "Bearer " + appStore.getState().userDetails.token,
        },
      }
    );
    return res.data;
  } catch (err) {
    const res = {
      status: err.response.status,
      message: "error on apiTableHistory " + id,
      games: [],
      error: err,
    };
    console.error(res);
    return res;
  }
}

export default apiTableHistory;
