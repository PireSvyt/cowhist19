import axios from "axios";

// Reducers
import appStore from "../../../store/appStore.js";

async function apiTableDetails(id) {
  try {
    // API dependency
    let tokenisok = false;
    do {
      setTimeout(function () {
        if (appStore.getState().sliceUser.token !== "") {
          tokenisok = true;
        }
      }, 20); // every N ms
    } while (tokenisok);
    // API request
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
