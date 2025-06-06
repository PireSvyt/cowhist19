require('dotenv')
import axios from 'axios'

let apiURL = process.env.REACT_APP_SERVER_URL

// TESTED
export async function apiGameCreate(saveInputs, token) {
    try {
        const res = await axios({
            method: 'post',
            url: apiURL + 'game/v1/create',
            data: saveInputs,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        return res.data
    } catch (err) {
        console.log('apiGameCreate.err', err)
        return err.response.data
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
export async function apiGameDelete(deleteInputs, token) {
    try {
        const res = await axios({
            method: 'post',
            url: apiURL + 'game/v1/delete',
            data: deleteInputs,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        console.log('apiGameDelete res', res)
        return res.data
    } catch (err) {
        console.log('apiGameDelete err', err)
        return err.response.data
    }
}

export async function apiGameGetOldest(token) {
  try {
      const res = await axios({
          method: 'get',
          url: apiURL + 'game/v1/oldest',
          headers: {
              Authorization: 'Bearer ' + token,
          },
      })
      console.log('apiGameGetOldest res', res)
      return res.data
  } catch (err) {
      console.log('apiGameGetOldest err', err)
      return err.response.data
  }
}
