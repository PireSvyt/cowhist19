import axios from "axios";

// Reducers
import appStore from "../../../../../../../store/appStore";

async function apiTableDelete(id) {
  try {
    const res = await axios.delete(
      process.env.REACT_APP_SERVER_URL + "/table/v1/" + id,
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

export default apiTableDelete;
