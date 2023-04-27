const axios = require("axios");

let apiURL = process.env.REACT_APP_SERVER_URL;

export async function apiAuthSignup(user) {
  try {
    const res = await axios.post(apiURL + "/auth/signup", user);
    return res.data;
  } catch (err) {
    let res = {
      status: 400,
      message: "error on apiAuthSignup",
      error: err,
      user: user
    };
    return res;
  }
}

export async function apiAuthLogin(user) {
  try {
    const res = await axios.post(apiURL + "/auth/login", user);
    return res.data;
  } catch (err) {
    let res = {
      status: 400,
      message: "error on apiAuthLogin",
      error: err,
      user: user
    };
    return res;
  }
}
