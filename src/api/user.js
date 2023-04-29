import axios, * as others from "axios";
import jwt_decode from "jwt-decode";

let apiURL = process.env.REACT_APP_SERVER_URL;

export async function apiUserInvite(token, user) {
  try {
    const res = await axios.post(apiURL + "/user/invite", user, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  } catch (err) {
    let res = {
      status: err.response.status,
      message: "error on apiUserInvite",
      error: err,
      user: user,
    };
    return res;
  }
}

export async function apiUserDetails(token) {
  // Prep
  let decodedToken = jwt_decode(token);
  try {
    const res = await axios.get(apiURL + "/user/" + decodedToken.id, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  } catch (err) {
    let res = {
      status: err.response.status,
      message: "error on apiUserDetails",
      error: err,
      user: {},
    };
    return res;
  }
}

export async function apiUserTables(token, id) {
  try {
    const res = await axios.get(apiURL + "/user/tables/" + id, {
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
