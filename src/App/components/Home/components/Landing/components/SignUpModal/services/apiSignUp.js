import axios from 'axios';

async function apiSignUp(user) {
  try {
    const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/auth/signup", user);
    return res.data;
  } catch (err) {
    return {
      status: err.response.status,
      message: "error on apiSignUp",
      error: err,
      user: user,
    };
  }
}

export default apiSignUp;