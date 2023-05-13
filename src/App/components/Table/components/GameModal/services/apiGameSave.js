import axios from "axios";

async function apiGameSave(token, user) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/game/v1/save",
      user,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default apiGameSave;
