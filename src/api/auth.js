import axios, * as others from "axios";

let apiURL = process.env.REACT_APP_SERVER_URL;

export async function apiAuthSignup(user) {
  try {
    const res = await axios.post(apiURL + "/auth/signup", user);
    return res.data;
  } catch (err) {
    return {
      status: err.response.status,
      message: "error on apiAuthSignup",
      error: err,
      user: user,
    };
  }
}

export async function apiAuthSignin(user) {
  try {
    const res = await axios.post(apiURL + "/auth/login", user);
    return res.data;
  } catch (err) {
    return {
      status: err.response.status,
      message: "error on apiAuthSignin",
      error: err,
      user: user,
    };
  }
}

export async function apiAuthAssess(token) {
  try {
    const res = await axios.post(apiURL + "/auth/assess", { token: token });
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
