import axios from "axios";

async function apiActivate(regToken) {
  try {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/user/activate/" + regToken
    );
    return res.data;
  } catch (err) {
    const res = {
      status: err.response.status,
      message: "error on apiActivate " + regToken,
      games: [],
      error: err,
    };
    console.error(res);
    return res;
  }
}

export default apiActivate;