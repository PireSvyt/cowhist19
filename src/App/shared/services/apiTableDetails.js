import axios from "axios";

// Reducers
import reduxStore from "../../store/reduxStore.js";

async function apiTableDetails(id) {
  try {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/table/" + id,
      {
        headers: {
          Authorization: "Bearer " + reduxStore.getState().user.token,
        },
      }
    );
    return res.data;
  } catch (err) {
    const res = {
      status: err.response.status,
      message: "error on apiTableDetails " + id,
      table: {},
      error: err,
    };
    console.error(res);
    return res;
  }
}

export default apiTableDetails;
