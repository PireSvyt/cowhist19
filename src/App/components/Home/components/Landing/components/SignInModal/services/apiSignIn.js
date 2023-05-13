import axios from "axios";

async function apiSignIn(user) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/auth/v1/signin",
      user
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default apiSignIn;
