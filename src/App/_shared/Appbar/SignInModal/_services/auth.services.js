// Inputs
import {
    authSigninInputs,
    authSendActivationInputs,
    authSendPasswordInputs,
} from './auth.service.inputs.js'
// Services
import serviceProceed from '../../../_services/serviceProceed.js'

export async function serviceAuthSendActivation() {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('serviceAuthSendActivation')
    }
    await serviceProceed(authSendActivationInputs)
}

export async function serviceAuthSignIn() {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('serviceAuthSignIn')
    }
    await serviceProceed(authSigninInputs)
}

export async function serviceAuthSendPassword() {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('serviceAuthSendPassword')
    }
    await serviceProceed(authSendPasswordInputs)
}
