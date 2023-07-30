import axios from "axios";

// Reducers
import appStore from "../../../store/appStore.js";

async function apiGameSave(game) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/game/v1/save",
      game,
      {
        headers: {
          Authorization: "Bearer " + appStore.getState().sliceUserAuth.token,
        },
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default apiGameSave;
