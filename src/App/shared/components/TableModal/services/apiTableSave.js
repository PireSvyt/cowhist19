import axios from "axios";

async function apiTableSave(token, table) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/table/v1/save",
      table,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default apiTableSave;
