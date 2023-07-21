import axios from "axios";

async function apiResendActivation(resendActivationInputs) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/auth/v1/resentactivation",
      resendActivationInputs
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default apiResendActivation;
