import axios from 'axios';

async function apiTableStats(token, id, parameters) {
    try {
      const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/table/stats/" + id, parameters, {
        headers: { Authorization: "Bearer " + token },
      });
      // Format
      return res.data;
    } catch (err) {
      const res = {
        status: err.response.status,
        message: "error on apiTableStats " + id,
        stats: {},
        error: err,
      };
      console.error(res);
      return res;
    }
  }

export default apiTableStats;