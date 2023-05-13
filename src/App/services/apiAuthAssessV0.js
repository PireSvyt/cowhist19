import axios from "axios";

async function apiAuthAssess(token) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/auth/assess",
      { token: token }
    );
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      return {
        status: 404,
        message: "unauthorized token",
        error: err,
      };
    } else {
      return {
        status: err.response.status,
        message: "error on apiAuthAssess",
        error: err,
      };
    }
  }
}

export default apiAuthAssess;
