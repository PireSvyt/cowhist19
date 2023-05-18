import axios from "axios";

// Reducers
import reduxStore from "../../../../store/reduxStore.js";

async function apiTableDelete( id) {
  try {
    const res = await axios.delete(
      process.env.REACT_APP_SERVER_URL + "/table/" + id,
      {
        headers: {
          Authorization: "Bearer " + reduxStore.getState().userDetails.token,
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
