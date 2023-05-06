import axios from 'axios';

async function apiTableDelete(token, id) {
    try {
      const res = await axios.delete(process.env.REACT_APP_SERVER_URL + "/table/" + id, {
        headers: { Authorization: "Bearer " + token },
      });
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