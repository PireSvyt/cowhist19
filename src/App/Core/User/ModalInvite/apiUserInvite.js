import axios from "axios";

// Reducers
import appStore from "../../../store/appStore";

async function apiUserInvite(inviteInputs) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/user/v1/invite",
      inviteInputs,
      {
        headers: {
          Authorization: "Bearer " + appStore.getState().sliceUserAuth.token,
        },
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default apiUserInvite;
