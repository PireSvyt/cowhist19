import axios from "axios";

async function apiActivate(regToken) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/auth/activate/" + regToken
    );
    return res.data;
  } catch (err) {
    const res = {
      status: err.response.status,
      message: "error on apiActivate " + regToken,
      outcome: "error",
      error: err,
    };
    console.error(res);
    return res;
  }
}

export default apiActivate;
