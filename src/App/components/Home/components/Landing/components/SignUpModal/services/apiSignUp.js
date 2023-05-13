import axios from "axios";

async function apiSignUp(user) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/auth/v1/signup",
      user
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default apiSignUp;
