import axios from "axios";
// Reducers
import appStore from "../../../store/appStore.js";

async function apiTableHistory(id, parameters) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/table/v1/history/" + id,
      parameters,
      {
        headers: {
          Authorization: "Bearer " + appStore.getState().sliceUserAuth.token,
        },
      },
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
}

export default apiTableHistory;
