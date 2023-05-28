import axios from "axios";

// Reducers
import appStore from "../../../../../store/appStore.js";

async function apiUsersByStatus() {
  try {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/admin/v1/usersbystatus",
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

export default apiUsersByStatus;
