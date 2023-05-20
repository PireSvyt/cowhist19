import axios from "axios";

// Reducers
import appStore from "../../../../../../store/appStore.js";

async function apiUserInvite(user) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/user/invite",
      user,
      {
        headers: {
          Authorization: "Bearer " + appStore.getState().user.token,
        },
      }
    );
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

export default apiUserInvite;
