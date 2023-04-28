import axios, * as others from "axios";

let apiURL = process.env.REACT_APP_SERVER_URL;

export async function apiTableSave(table) {
  try {
    const res = await axios.post(apiURL + "/table/save", table);
    return res.data;
  } catch (err) {
    let res = {
      status: 400,
      message: "error on apiTableSave",
      error: err,
      table: table
    };
    return res;
  }
}

export async function apiTableDetails(id) {
  try {
    const res = await axios.get(apiURL + "/table/" + id);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiTableDetails " + id,
      table: {},
      error: err
    };
    console.error(res);
    return res;
  }
}

export async function apiTableHistory(id, parameters) {
  try {
    const res = await axios.get(apiURL + "/table/history/" + id, parameters);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiTableHistory " + id,
      games: [],
      error: err
    };
    console.error(res);
    return res;
  }
}

export async function apiTableDelete(table) {
  try {
    const res = await axios.delete(apiURL + "/table/" + id);
    return res.data;
  } catch (err) {
    const res = {
      status: 400,
      message: "error on apiTableDelete",
      error: err
    };
    console.error(res);
    return res;
  }
}
