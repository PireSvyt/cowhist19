import axios from "axios";
// Reducers
import appStore from "../../../store/appStore.js";

async function apiUserDetails() {
  try {
    const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/v1", {
      headers: {
        Authorization: "Bearer " + appStore.getState().sliceUserAuth.token,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default apiUserDetails;
