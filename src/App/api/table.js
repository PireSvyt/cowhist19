require("dotenv").config();
const axios = require("axios");

let apiURL = process.env.TESTSUITE_SERVER_URL;

// TESTED
export async function apiTableCreate(table, token) {
  try {
    const res = await axios.post(apiURL + "/table/v1/create", table, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

// TESTED
export async function apiTableGetDetails(tableid, token) {
  try {
    const res = await axios.get(apiURL + "/table/v3/" + tableid, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

// TESTED
export async function apiTableGetHistory(tableid, parameters, token) {
  try {
    const res = await axios.post(
      apiURL + "/table/v3/history/" + tableid,
      parameters,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

// TESTED
export async function apiTableGetStats(tableid, parameters, token) {
  try {
    const res = await axios.post(
      apiURL + "/table/v1/stats/" + tableid,
      parameters,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

// TESTED
export async function apiTableSave(table, token) {
  try {
    const res = await axios.post(apiURL + "/table/v2/save", table, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

// TESTED
export async function apiTableDelete(tableid, token) {
  try {
    const res = await axios.delete(apiURL + "/table/v1/" + tableid, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}
