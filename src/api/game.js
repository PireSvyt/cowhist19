import axios, * as others from "axios";

let apiURL = process.env.REACT_APP_SERVER_URL;

export async function apiGameSave(game) {
  try {
    const res = await axios.post(apiURL + "/game/save", game);
    return res.data;
  } catch (err) {
    let res = {
      status: 400,
      message: "error on apiGameSave",
      error: err,
      game: game
    };
    return res;
  }
}

export async function apiGameDetails(id) {
  try {
    const res = await axios.get(apiURL + "/game/" + id);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiGameDetails " + id,
      game: {},
      error: err
    };
    console.error(res);
    return res;
  }
}

export async function apiGameDelete(game) {
  try {
    const res = await axios.delete(apiURL + "/game/" + id);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiGameDelete",
      error: err
    };
    console.error(res);
    return res;
  }
}
