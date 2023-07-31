import axios from "axios";

async function apiSignIn(signInInputs) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/auth/v1/signin",
      signInInputs
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default apiSignIn;