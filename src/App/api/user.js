require("dotenv").config();
const axios = require("axios");

let apiURL = process.env.TESTSUITE_SERVER_URL;

export async function apiUserChangePassword(changePasswordInputs, token) {
  try {
    const res = await axios.post(
      apiURL + "user/v1/changepassword",
      changePasswordInputs,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

// TESTED
export async function apiUserInvite(inviteInputs, token) {
  try {
    const res = await axios.post(apiURL + "/user/v1/invite", inviteInputs, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

// TESTED
export async function apiUserGetDetails(token) {
  try {
    const res = await axios.get(apiURL + "/user/v1", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

// TESTED
export async function apiUserGetStats(token) {
  try {
    const res = await axios.get(apiURL + "/user/v1/stats", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}
