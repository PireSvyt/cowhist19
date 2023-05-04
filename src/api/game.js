import axios, * as others from "axios";

let apiURL = process.env.REACT_APP_SERVER_URL;

export async function apiGameSave(token, game) {
  try {
    const res = await axios.post(apiURL + "/game/save", game, {
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

export async function apiGameDetails(token, id) {
  try {
    const res = await axios.get(apiURL + "/game/" + id, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  } catch (err) {
    const res = {
      status: err.response.status,
      message: "error on apiGameDetails " + id,
      game: {},
      error: err,
    };
    console.error(res);
    return res;
  }
}

export async function apiGameDelete(token, id) {
  try {
    const res = await axios.delete(apiURL + "/game/" + id, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  } catch (err) {
    const res = {
      status: err.response.status,
      message: "error on apiGameDelete",
      error: err,
    };
    console.error(res);
    return res;
  }
}
