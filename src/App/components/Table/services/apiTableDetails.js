import axios from "axios";

// Reducers
import appStore from "../../../store/appStore.js";

async function apiTableDetails(id) {
  try {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/table/v2/" + id,
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

export default apiTableDetails;
