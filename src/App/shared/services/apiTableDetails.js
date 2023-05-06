import axios from 'axios';

async function apiTableDetails(token, id) {
    try {
      const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/table/" + id, {
        headers: { Authorization: "Bearer " + token },
      });
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