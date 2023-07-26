import axios from "axios";

async function apiSignUp(signUpInputs) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/auth/v1/signup",
      signUpInputs
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default apiSignUp;
