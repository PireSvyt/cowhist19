import axios from "axios";

async function apiSendActivation(sendActivationInputs) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/auth/v1/sendactivation",
      sendActivationInputs,
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default apiSendActivation;
