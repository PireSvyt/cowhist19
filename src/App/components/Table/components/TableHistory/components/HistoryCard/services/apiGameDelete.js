import axios from "axios";

// Reducers
import appStore from "../../../../../../../store/appStore.js";

async function apiGameDelete(gamieid) {
  try {
    const res = await axios.delete(
      process.env.REACT_APP_SERVER_URL + "/v1/game/" + gamieid,
      {
        headers: {
          Authorization: "Bearer " + appStore.getState().userDetails.token,
        },
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default apiGameDelete;
