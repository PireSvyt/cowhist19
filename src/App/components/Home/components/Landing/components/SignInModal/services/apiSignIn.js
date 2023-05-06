import axios from 'axios';

async function apiSignIn(user) {
  try {
    const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/auth/login", user);
    return res.data;
  } catch (err) {
    return {
      status: err.response.status,
      message: "error on apiSignin",
      error: err,
      user: user,
    };
  }
}

export default apiSignIn;