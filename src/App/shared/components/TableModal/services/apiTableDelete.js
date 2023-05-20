import axios from "axios";

// Reducers
import appStore from "../../../../store/appStore.js";

async function apiTableDelete( id) {
  try {
    const res = await axios.delete(
      process.env.REACT_APP_SERVER_URL + "/table/" + id,
      {
        headers: {
          Authorization: "Bearer " + appStore.getState().userDetails.token,
        },
      }
    );
    return res.data;
  } catch (err) {
    const res = {
      status: err.response.status,
      message: "error on apiTableDelete",
      error: err,
    };
    console.error(res);
    return res;
  }
}

export default apiTableDelete;
