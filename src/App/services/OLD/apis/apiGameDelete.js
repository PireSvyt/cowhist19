import axios from "axios";
// Reducers
import appStore from "../../../store/appStore.js";

async function apiGameDelete(gamieid) {
  try {
    const res = await axios.delete(
      process.env.REACT_APP_SERVER_URL + "/game/v1/" + gamieid,
      {
        headers: {
          Authorization: "Bearer " + appStore.getState().sliceUserAuth.token,
        },
      },
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default apiGameDelete;
