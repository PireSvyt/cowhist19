import axios from 'axios';

// Reducers
import reduxStore from "../../../../../store/reduxStore.js";

async function apiGameDelete(id) {
    try {
      const res = await axios.delete(process.env.REACT_APP_SERVER_URL + "/game/" + id, {
        headers: { Authorization: "Bearer " + reduxStore.getState().userDetails.token },
      });
      return res.data;
    } catch (err) {
      const res = {
        status: err.response.status,
        message: "error on apiGameDelete",
        error: err,
      };
      console.error(res);
      return res;
    }
  }

export default apiGameDelete;