require('dotenv')
import axios from 'axios'

let apiURL = process.env.REACT_APP_SERVER_URL

// TESTED
export async function apiAuthSignUp(signUpInputs) {
    try {
        const res = await axios({
            method: 'post',
            url: apiURL + 'auth/v1/signup',
            data: signUpInputs,
        })
        return res.data
    } catch (err) {
        return err.response.data
    }
}

// TESTED
export async function apiAuthActivate(activateInputs) {
    try {
        const res = await axios({
            method: 'post',
            url: apiURL + 'auth/v1/activate',
            data: activateInputs,
        })
        return res.data
    } catch (err) {
        return err.response.data
    }
}

export async function apiAuthAssess(token) {
    try {
        const res = await axios.post(apiURL + 'auth/v1/assess', {
            token: token,
        })
        return res.data
    } catch (err) {
        return err.response.data
    }
}

export async function apiAuthExistingPseudo(existingPseudoInput) {
    try {
        const res = await axios({
            method: 'post',
            url: apiURL + 'auth/v1/existingpseudo',
            data: existingPseudoInput,
        })
        return res.data
    } catch (err) {
        return err.response.data
    }
}
