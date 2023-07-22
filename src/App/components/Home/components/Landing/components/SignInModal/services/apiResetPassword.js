import axios from "axios";

async function apiResetPassword(resetPasswordInputs) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/auth/v1/sendpassword",
      resetPasswordInputs
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default apiResetPassword;