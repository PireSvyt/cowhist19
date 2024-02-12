require('dotenv')
import axios from 'axios'

let apiURL = process.env.REACT_APP_SERVER_URL

export async function apiAuthSendActivation(sendActivationInputs) {
    try {
        const res = await axios.post(
            apiURL + 'auth/v1/sendactivation',
            sendActivationInputs
        )
        return res.data
    } catch (err) {
        return err.response.data
    }
}

export async function apiAuthSignIn(signInInputs) {
    try {
        const res = await axios({
            method: 'post',
            url: apiURL + 'auth/v1/signin',
            data: signInInputs,
        })
        return res.data
    } catch (err) {
        return err.response.data
    }
}

export async function apiAuthSendPassword(sendPasswordInputs) {
    try {
        const res = await axios({
            method: 'post',
            url: apiURL + 'auth/v1/sendpassword',
            data: sendPasswordInputs,
        })
        return res.data
    } catch (err) {
        return err.response.data
    }
}
