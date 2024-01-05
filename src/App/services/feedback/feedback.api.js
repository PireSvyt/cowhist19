require("dotenv");
import axios from 'axios';

let apiURL = process.env.REACT_APP_SERVER_URL;

// TESTED
export async function apiFeedbackCreate(saveInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + "feedback/v1/create",
      data: saveInputs,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    return res.data;
  } catch (err) {
    console.log('apiFeedbackCreate.err', err)
    return err.response.data;
  }
}