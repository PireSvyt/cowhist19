import axios from "axios";

// Reducers
import appStore from "../../../store/appStore.js";

async function apiTableStats(id, parameters) {
  try {
    // API dependency
    let tokenisok = false;
    do {
      setTimeout(function () {
        if (appStore.getState().sliceUser.token !== "") {
          tokenisok = true;
        }
      }, 20); // every N ms
    } while (tokenisok);
    // API request
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/table/v1/stats/" + id,
      parameters,
      {
        headers: {
          Authorization: "Bearer " + appStore.getState().sliceUser.token,
        },
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default apiTableStats;
