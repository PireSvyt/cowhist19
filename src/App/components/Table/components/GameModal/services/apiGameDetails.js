import axios from 'axios';

async function apiGameDetails(token, id) {
    try {
      const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/game/" + id, {
        headers: { Authorization: "Bearer " + token },
      });
      return res.data;
    } catch (err) {
      const res = {
        status: err.response.status,
        message: "error on apiGameDetails " + id,
        game: {},
        error: err,
      };
      console.error(res);
      return res;
    }
  }

export default apiGameDetails;