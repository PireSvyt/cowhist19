import axios, * as others from "axios";
import jwt_decode from "jwt-decode";

let apiURL = process.env.REACT_APP_SERVER_URL;

export async function apiUserInvite(user) {
  try {
    const res = await axios.post(apiURL + "/user/invite", user);
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
  console.log("user.apiUserDetails decodedToken");
  console.log(decodedToken);

  try {
    const res = await axios.get(apiURL + "/user/" + id, {
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

export async function apiUserTables(id) {
  try {
    const res = await axios.ge(apiURL + "/user/tables/" + id);
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
