import axios from "axios";

async function apiTableStats(token, id, parameters) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/table/v1/stats/" + id,
      parameters,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return res.data;
  } catch (err) {
    const res = {
      status: err.response.status,
      message: "error on apiTableStats " + id,
      game: {},
      error: err,
    };
    console.error(res);
    return res;
  }
}

export default apiTableStats;
