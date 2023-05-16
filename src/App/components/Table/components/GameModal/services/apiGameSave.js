import axios from "axios";

// Reducers
import reduxStore from "../../../../../store/reduxStore.js";

async function apiGameSave(game) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/game/v1/save",
      game,
      {
        headers: {
          Authorization: "Bearer " + reduxStore.getState().user.token,
        },
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default apiGameSave;
