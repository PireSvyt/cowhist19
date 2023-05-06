import axios from 'axios';

async function apiGameSave(token, game) {
    try {
      const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/game/save", game, {
        headers: { Authorization: "Bearer " + token },
      });
      return res.data;
    } catch (err) {
      let res = {
        status: err.response.status,
        message: "error on apiGameSave",
        error: err,
        game: game,
      };
      return res;
    }
  }

export default apiGameSave;