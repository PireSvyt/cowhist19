import axios from "axios";

// Reducers
import appStore from "../../store/appStore";

async function ChangePasswordAPI(changePasswordInputs) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/user/v1/changepassword",
      changePasswordInputs,
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

export default ChangePasswordAPI;
