import axios from "axios";

// Reducers
import appStore from "../store/appStore.js";

async function apiUserDetails() {
  try {
    const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/", {
      headers: { Authorization: "Bearer " + appStore.getState().userDetails.token },
    });
    return res.data;
  } catch (err) {
    let res = {
      status: err.response.status,
      message: "error on apiUserDetails",
      error: err,
      user: {},
    };
    return res;
  }
}

export default apiUserDetails;
