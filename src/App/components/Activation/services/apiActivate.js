import axios from "axios";

async function apiActivate(regToken) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/auth/v1/activate/" + regToken
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default apiActivate;
