import axios from "axios";

// Reducers
import appStore from "../store/appStore.js";

async function apiUserTables() {
  try {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/user/tables",
      {
        headers: {
          Authorization: "Bearer " + appStore.getState().userDetails.token,
        },
      }
    );
    return res.data;
  } catch (err) {
    let res = {
      status: err.response.status,
      message: "error on apiUserTables",
      error: err,
      tables: [],
    };
    return res;
  }
}

export default apiUserTables;
