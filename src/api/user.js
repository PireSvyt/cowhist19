import axios, * as others from "axios";

let apiURL = process.env.REACT_APP_SERVER_URL;

export async function apiUserInvite(user) {
  try {
    const res = await axios.post(apiURL + "/user/invite", user);
    return res.data;
  } catch (err) {
    let res = {
      status: 400,
      message: "error on apiUserInvite",
      error: err,
      user: user,
    };
    return res;
  }
}

export async function apiUserDetails(id) {
  try {
    const res = await axios.ge(apiURL + "/user/" + id);
    return res.data;
  } catch (err) {
    let res = {
      status: 400,
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
      status: 400,
      message: "error on apiUserTables",
      error: err,
      tables: [],
    };
    return res;
  }
}
