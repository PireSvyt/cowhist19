import bcrypt from 'bcryptjs-react'
import { AES } from 'crypto-js'
import Cookies from 'js-cookie'
// APIs
import {
    apiAuthSignUp,
    apiAuthExistingPseudo,
    apiAuthActivate,
    apiAuthAssess,
} from './auth.api.js'
// Services
import { random_id, validateEmail } from '../toolkit.js'
import { serviceAuthGrantAccess } from './auth.services.js'
import appStore from '../../../_store/appStore.js'

export const authSignupInputs = {
    lockuifunction: (log) => {
        log.push({
            date: new Date(),
            message: 'authSignupInputs.lockuifunction',
            tags: ['function'],
        })
        appStore.dispatch({ type: 'signupModalSlice/lock' })
    },
    unlockuifunction: (log) => {
        log.push({
            date: new Date(),
            message: 'authSignupInputs.unlockuifunction',
            tags: ['function'],
        })
        appStore.dispatch({
            type: 'signupModalSlice/change',
            payload: {
                disabled: false,
                loading: false,
            },
        })
    },
    getinputsfunction: (log) => {
        log.push({
            date: new Date(),
            message: 'authSignupInputs.getinputsfunction',
            tags: ['function'],
        })
        return {
            inputs: { ...appStore.getState().signupModalSlice.inputs },
        }
    },
    sercivechecks: [
        {
            // Check inputs root is available
            field: 'inputs',
            error: 'generic.error.missinginputs',
            subchecks: [
                {
                    // Check pseudo is available
                    field: 'pseudo',
                    error: 'generic.error.missingpseudo',
                    fieldsinerror: ['pseudo'],
                },
                {
                    // Check login is available
                    field: 'login',
                    error: 'generic.error.missinlogin',
                    fieldsinerror: ['login'],
                    subchecks: [
                        {
                            // Check email validity
                            checkfunction: (serviceInputs) => {
                                if (
                                    !validateEmail(serviceInputs.inputs.login)
                                ) {
                                    return {
                                        errors: ['generic.error.invalidlogin'],
                                        stateChanges: {
                                            errors: {
                                                login: true,
                                            },
                                        },
                                        proceed: false,
                                    }
                                } else {
                                    return { proceed: true }
                                }
                            },
                            error: 'generic.error.invalidlogin',
                            fieldsinerror: ['login'],
                        },
                    ],
                },
                {
                    // Check password is available
                    field: 'password',
                    error: 'generic.error.missingpassword',
                    fieldsinerror: ['password'],
                },
                {
                    // Check passwordrepeat is available
                    field: 'passwordrepeat',
                    error: 'generic.error.missingpasswordrepeat',
                    fieldsinerror: ['passwordrepeat'],
                    subchecks: [
                        {
                            // Check password match
                            checkfunction: (serviceInputs) => {
                                if (
                                    serviceInputs.inputs.password !==
                                    serviceInputs.inputs.passwordrepeat
                                ) {
                                    return {
                                        errors: [
                                            'generic.error.passwordmissmatch',
                                        ],
                                        stateChanges: {
                                            errors: {
                                                passwordrepeat: true,
                                            },
                                        },
                                        proceed: false,
                                    }
                                } else {
                                    return { proceed: true }
                                }
                            },
                            error: 'generic.error.passwordmissmatch',
                            fieldsinerror: ['passwordrepeat'],
                        },
                    ],
                },
            ],
        },
    ],
    getcheckoutcomedispatchfunction: (log) => {
        log.push({
            date: new Date(),
            message: 'authSignupInputs.getcheckoutcomedispatchfunction',
            tags: ['function'],
        })
        return 'signupModalSlice/change'
    },
    repackagingfunction: (inputs, log) => {
        log.push({
            date: new Date(),
            message: 'serviceProceed.repackagingfunction',
            inputs: inputs,
            tags: ['function'],
        })
        console.log('authSignupInputs.repackagingfunction', inputs)
        let repackagedInputs = { ...inputs }
        repackagedInputs.inputs.password = bcrypt.hashSync(
            inputs.inputs.password
        )
        delete repackagedInputs.inputs.passwordrepeat
        return repackagedInputs
    },
    apicall: async (inputs, log) => {
        log.push({
            date: new Date(),
            message: 'authSignupInputs.apicall',
            inputs: inputs,
            tags: ['function'],
        })
        try {
            return await apiAuthSignUp(inputs)
        } catch (err) {
            return err
        }
    },
    getmanageresponsefunction: (response, log) => {
        log.push({
            date: new Date(),
            message: 'authSignupInputs.getmanageresponsefunction',
            response: response,
            tags: ['function'],
        })
        let responses = {
            'auth.signup.success.signedup': () => {
                appStore.dispatch({
                    type: 'signupModalSlice/close',
                })
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'signup.snack.signedup',
                    },
                })
            },
            'auth.signup.success.alreadysignedup': () => {
                appStore.dispatch({
                    type: 'signupModalSlice/close',
                })
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'signup.snack.signedup',
                    },
                })
            },
            'auth.signup.error.savingoncreate': () => {
                appStore.dispatch({
                    type: 'signupModalSlice/unlock',
                })
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'generic.snack.error.wip',
                    },
                })
            },
            'auth.signup.error.savingfrominvited': () => {
                appStore.dispatch({
                    type: 'signupModalSlice/unlock',
                })
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'generic.snack.error.wip',
                    },
                })
            },
            'auth.signup.error.notfound': () => {
                appStore.dispatch({
                    type: 'signupModalSlice/unlock',
                })
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'generic.snack.error.wip',
                    },
                })
            },
            'auth.signup.error.sendingemail': () => {
                appStore.dispatch({
                    type: 'signupModalSlice/close',
                })
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'signup.snack.pendingemail',
                    },
                })
            },
        }
        return responses[response.type]()
    },
}

export const authSendActivationInputs = {
    lockuifunction: (log) => {
        log.push({
            date: new Date(),
            message: 'authSendActivationInputs.lockuifunction',
            tags: ['function'],
        })
        appStore.dispatch({
            type: 'signinModalSlice/lock',
            payload: 'sendactivation',
        })
    },
    unlockuifunction: (log) => {
        log.push({
            date: new Date(),
            message: 'authSendActivationInputs.unlockuifunction',
            tags: ['function'],
        })
        appStore.dispatch({
            type: 'signinModalSlice/change',
            payload: {
                sendactivation: {
                    disabled: false,
                    loading: false,
                },
            },
        })
    },
    getinputsfunction: (log) => {
        log.push({
            date: new Date(),
            message: 'authSendActivationInputs.getinputsfunction',
            tags: ['function'],
        })
        return {
            inputs: { ...appStore.getState().signinModalSlice.inputs },
        }
    },
    sercivechecks: [
        {
            // Check inputs root is available
            field: 'inputs',
            error: 'generic.error.missinginputs',
            subchecks: [
                {
                    // Check login is available
                    field: 'login',
                    error: 'generic.error.missinlogin',
                    fieldsinerror: ['login'],
                    subchecks: [
                        {
                            // Check email validity
                            checkfunction: (serviceInputs) => {
                                if (
                                    !validateEmail(serviceInputs.inputs.login)
                                ) {
                                    return {
                                        errors: ['generic.error.invalidlogin'],
                                        stateChanges: {
                                            errors: {
                                                login: true,
                                            },
                                        },
                                        proceed: false,
                                    }
                                } else {
                                    return { proceed: true }
                                }
                            },
                            error: 'generic.error.invalidlogin',
                            fieldsinerror: ['login'],
                        },
                    ],
                },
            ],
        },
    ],
    getcheckoutcomedispatchfunction: (log) => {
        log.push({
            date: new Date(),
            message: 'authSendActivationInputs.getcheckoutcomedispatchfunction',
            tags: ['function'],
        })
        return 'signinModalSlice/change'
    },
    apicall: (inputs, log) => {
        log.push({
            date: new Date(),
            message: 'authSendActivationInputs.apicall',
            inputs: inputs,
            tags: ['function'],
        })
        apiAuthSendActivation(inputs)
    },
    getmanageresponsefunction: (response, log) => {
        log.push({
            date: new Date(),
            message: 'authSendActivationInputs.getmanageresponsefunction',
            response: response,
            tags: ['function'],
        })
        let responses = {
            'auth.sendactivation.success': () => {
                appStore.dispatch({
                    type: 'signinModalSlice/change',
                    payload: {
                        sendactivation: {
                            loading: false,
                            disbale: false,
                        },
                    },
                })
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'signin.snack.successresendingactivation',
                    },
                })
            },
            'auth.sendactivation.error.onfind': () => {
                appStore.dispatch({
                    type: 'signinModalSlice/change',
                    payload: {
                        sendactivation: {
                            loading: false,
                            disbale: false,
                        },
                    },
                })
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'signin.snack.errorresendingactivation',
                    },
                })
            },
            'auth.sendactivation.error.accountnotfound': () => {
                appStore.dispatch({
                    type: 'signinModalSlice/change',
                    payload: {
                        sendactivation: {
                            loading: false,
                            disbale: false,
                        },
                    },
                })
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'signin.snack.errorresendingactivation',
                    },
                })
            },
            'auth.sendactivation.error.updatingtoken': () => {
                appStore.dispatch({
                    type: 'signinModalSlice/change',
                    payload: {
                        sendactivation: {
                            loading: false,
                            disbale: false,
                        },
                    },
                })
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'signin.snack.errorresendingactivation',
                    },
                })
            },
        }
        return responses[response]()
    },
}
