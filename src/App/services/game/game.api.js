require("dotenv");
import axios from 'axios';

let apiURL = process.env.REACT_APP_SERVER_URL;

// TESTED
export async function apiGameCreate(saveInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + "game/v1/create",
      data: saveInputs,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    return res.data;
  } catch (err) {
    console.log('apiGameCreate.err', err)
    return err.response.data;
  }
}

/*exports.apiGameGet = async function (getId, token) {
  try {
    const res = await axios.get(apiURL + "game/v1/" + getId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};*/

// TESTED
export async function apiGameDelete(deleteId, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + "game/v1/" + deleteId,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}
