import axios from "axios";

// Reducers
import appStore from "../../../store/appStore.js";

async function apiTableDetails(id) {
  try {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/table/v1/" + id,
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

export default apiTableDetails;