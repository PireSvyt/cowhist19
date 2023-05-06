import axios from 'axios';

async function apiUserTables(token) {
    try {
      const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/tables", {
        headers: { Authorization: "Bearer " + token },
      });
      return res.data;
    } catch (err) {
      let res = {
        status: err.response.status,
        message: "error on apiUserTables",
        error: err,
        tables: [],
      };
      return res;
    }
}

export default apiUserTables;