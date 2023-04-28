import axios, * as others from "axios";

let apiURL = process.env.REACT_APP_SERVER_URL;

export async function apiAuthSignup(user) {
  try {
    const res = await axios.post(apiURL + "/auth/signup", user);
    return res.data;
  } catch (err) {
    let res = {
      status: err.response.status,
      message: "error on apiAuthSignup",
      error: err,
      user: user,
    };
    return res;
  }
}

export async function apiAuthSignin(user) {
  try {
    const res = await axios.post(apiURL + "/auth/login", user);
    return res.data;
  } catch (err) {
    let res = {
      status: err.response.status,
      message: "error on apiAuthSignin",
      error: err,
      user: user,
    };
    return res;
  }
}
