import axios, * as others from "axios";

let apiURL = process.env.REACT_APP_SERVER_URL;

export async function apiTableSave(token, table) {
  try {
    const res = await axios.post(apiURL + "/table/save", table, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  } catch (err) {
    let res = {
      status: err.response.status,
      message: "error on apiTableSave",
      error: err,
      table: table,
    };
    return res;
  }
}

export async function apiTableDetails(token, id) {
  try {
    const res = await axios.get(apiURL + "/table/" + id, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  } catch (err) {
    const res = {
      status: err.response.status,
      message: "error on apiTableDetails " + id,
      table: {},
      error: err,
    };
    console.error(res);
    return res;
  }
}

export async function apiTableHistory(token, id, parameters) {
  try {
    const res = await axios.post(apiURL + "/table/history/" + id, parameters, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  } catch (err) {
    const res = {
      status: err.response.status,
      message: "error on apiTableHistory " + id,
      games: [],
      error: err,
    };
    console.error(res);
    return res;
  }
}

export async function apiTableStats(token, id, parameters) {
  try {
    const res = await axios.post(apiURL + "/table/stats/" + id, parameters, {
      headers: { Authorization: "Bearer " + token },
    });
    // Format
    return res.data;
  } catch (err) {
    const res = {
      status: err.response.status,
      message: "error on apiTableStats " + id,
      stats: {},
      error: err,
    };
    console.error(res);
    return res;
  }
}

export async function apiTableDelete(token, id) {
  try {
    const res = await axios.delete(apiURL + "/table/" + id, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  } catch (err) {
    const res = {
      status: err.response.status,
      message: "error on apiTableDelete",
      error: err,
    };
    console.error(res);
    return res;
  }
}
