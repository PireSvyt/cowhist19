import axios from 'axios';

async function apiTableSave(token, table) {
    try {
      const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/table/save", table, {
        headers: { Authorization: "Bearer " + token },
      });
      return res.data;
    } catch (err) {
      let res = {
        status: err.response.status,
        message: "error on apiTableSave",
        error: err,
        table: table,
      };
      return res;
    }
  }

export default apiTableSave;