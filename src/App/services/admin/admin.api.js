require("dotenv");
import axios from 'axios';
// Reducers
import appStore from "../../store/appStore.js";

let apiURL = process.env.REACT_APP_SERVER_URL;

export async function apiTablesByGames() {
  try {
    const res = await axios({
      method: 'get',
      url: apiURL + "admin/v1/tablesbygames",
      headers: {
        Authorization: "Bearer " + appStore.getState().authSlice.token,
      },
    })
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export async function apiTablesByPlayers() {
  try {
    const res = await axios({
      method: 'get',
      url: apiURL + "admin/v1/tablesbyplayers",
      headers: {
        Authorization: "Bearer " + appStore.getState().authSlice.token,
      },
    })
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export async function apiUsersByStatus() {
  try {
    const res = await axios({
      method: 'get',
      url: apiURL + "admin/v1/usersbystatus",
      headers: {
        Authorization: "Bearer " + appStore.getState().authSlice.token,
      },
    })
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export async function apiPopulate() {
  try {
    const res = await axios({
      method: 'get',
      url: apiURL + "admin/v1/populate",
      headers: {
        Authorization: "Bearer " + appStore.getState().authSlice.token,
      },
    })
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}
