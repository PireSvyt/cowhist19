import axios from "axios";

async function apiSendPassword(sendPasswordInputs) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/auth/v1/sendpassword",
      sendPasswordInputs
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default apiSendPassword;