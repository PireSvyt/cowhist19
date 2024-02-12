// APIs
import {
    apiUserChangePassword,
    apiUserGetDetails,
    apiUserGetStats,
    apiUserInvite,
} from './user.api.js'
// Services
import { random_id, validateEmail } from '../toolkit.js'
import appStore from '../../../_store/appStore.js'

export const userGetDetailsInputs = {
    lockuifunction: (log) => {
        log.push({
            date: new Date(),
            message: 'userGetStatsInputs.lockuifunction',
            tags: ['function'],
        })
        appStore.dispatch({
            type: 'userSlice/change',
            payload: {
                state: {
                    details: 'loading',
                },
            },
        })
    },
    getinputsfunction: (log) => {
        log.push({
            date: new Date(),
            message: 'userGetDetailsInputs.getinputsfunction',
            tags: ['function'],
        })
        let inputs = {
            inputs: {
                token: appStore.getState().authSlice.token,
            },
        }
        //console.log("getinputsfunction inputs", inputs)
        return inputs
    },
    sercivechecks: [
        {
            // Check inputs root is available
            field: 'inputs',
            error: 'generic.error.missinginputs',
            subchecks: [
                {
                    // Check token is available
                    field: 'token',
                    error: 'generic.error.missingtoken',
                    fieldsinerror: ['token'],
                },
            ],
        },
    ],
    getcheckoutcomedispatchfunction: (log) => {
        log.push({
            date: new Date(),
            message: 'userGetDetailsInputs.getcheckoutcomedispatchfunction',
            tags: ['function'],
        })
        return 'userSlice/change'
    },
    apicall: async (inputs, log) => {
        log.push({
            date: new Date(),
            message: 'userGetDetailsInputs.apicall',
            inputs: inputs,
            tags: ['function'],
        })
        //console.log("apicall inputs",inputs)
        try {
            return await apiUserGetDetails(inputs.token)
        } catch (err) {
            return err
        }
    },
    getmanageresponsefunction: (response, log) => {
        log.push({
            date: new Date(),
            message: 'userGetDetailsInputs.getmanageresponsefunction',
            response: response,
            tags: ['function'],
        })
        let responses = {
            'user.getdetails.success': () => {
                appStore.dispatch({
                    type: 'userSlice/setDetails',
                    payload: response.data.user,
                })
            },
            'user.getdetails.error.notfound': () => {
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'generic.snack.error.withdetails',
                        details: ['home.snack.userdetailsnotfound'],
                    },
                })
            },
            'user.getdetails.error.onaggregate': () => {
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'generic.snack.error.wip',
                    },
                })
            },
        }
        //console.log("userGetDetailsInputs response", response)
        return responses[response.type]()
    },
}

export const userInviteInputs = {
    lockuifunction: (log) => {
        log.push({
            date: new Date(),
            message: 'userInviteInputs.lockuifunction',
            tags: ['function'],
        })
        appStore.dispatch({ type: 'inviteModalSlice/lock' })
    },
    unlockuifunction: (log) => {
        log.push({
            date: new Date(),
            message: 'userInviteInputs.unlockuifunction',
            tags: ['function'],
        })
        appStore.dispatch({
            type: 'inviteModalSlice/change',
            payload: {
                disabled: false,
                loading: false,
            },
        })
    },
    getinputsfunction: (log) => {
        log.push({
            date: new Date(),
            message: 'userInviteInputs.getinputsfunction',
            tags: ['function'],
        })
        return {
            inputs: { ...appStore.getState().inviteModalSlice.inputs },
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
                                            errors: { login: true },
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
                    // Check acknowledgement is available
                    field: 'acknowledgement',
                    error: 'invite.error.missingacknowledgement',
                    fieldsinerror: ['acknowledgement'],
                    subchecks: [
                        {
                            // Check acknowledgement is true
                            checkfunction: (serviceInputs) => {
                                console.log(
                                    'userInviteInputs.sercivechecks.acknowledgement.checkfunction',
                                    serviceInputs
                                )
                                if (!serviceInputs.inputs.acknowledgement) {
                                    return {
                                        errors: [
                                            'invite.error.missingacknowledgement',
                                        ],
                                        stateChanges: {
                                            errors: { acknowledgement: true },
                                        },
                                        proceed: false,
                                    }
                                } else {
                                    return { proceed: true }
                                }
                            },
                            error: 'invite.error.missingacknowledgement',
                            fieldsinerror: ['acknowledgement'],
                        },
                    ],
                },
            ],
        },
    ],
    getcheckoutcomedispatchfunction: (log) => {
        log.push({
            date: new Date(),
            message: 'userInviteInputs.getcheckoutcomedispatchfunction',
            tags: ['function'],
        })
        return 'inviteModalSlice/change'
    },
    apicall: async (inputs, log) => {
        log.push({
            date: new Date(),
            message: 'userInviteInputs.apicall',
            inputs: inputs,
            tags: ['function'],
        })
        try {
            return await apiUserInvite(
                inputs,
                appStore.getState().authSlice.token
            )
        } catch (err) {
            return err
        }
    },
    getmanageresponsefunction: (response, log) => {
        log.push({
            date: new Date(),
            message: 'userInviteInputs.getmanageresponsefunction',
            response: response,
            tags: ['function'],
        })
        console.log('response', response)
        let responses = {
            'user.invite.success.created': () => {
                appStore.dispatch({
                    type: 'inviteModalSlice/change',
                    payload: {
                        open: false,
                        inputs: {
                            pseudo: '',
                            login: '',
                        },
                        disabled: false,
                        loading: false,
                    },
                })
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'invite.snack.invited',
                    },
                })
                appStore.dispatch({
                    type: 'tableModalSlice/adduser',
                    payload: response.data.user,
                })
            },
            'user.invite.success.alreadyexisting': () => {
                appStore.dispatch({
                    type: 'inviteModalSlice/change',
                    payload: {
                        open: false,
                        inputs: {
                            pseudo: '',
                            login: '',
                        },
                        disabled: false,
                        loading: false,
                    },
                })
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'invite.snack.invited',
                    },
                })
                appStore.dispatch({
                    type: 'tableModalSlice/adduser',
                    payload: response.data.user,
                })
            },
            'user.invite.error.oncreate': () => {
                appStore.dispatch({
                    type: 'inviteModalSlice/change',
                    payload: {
                        disabled: false,
                        loading: false,
                    },
                })
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'generic.snack.error.wip',
                    },
                })
            },
            'user.invite.error.onfind': () => {
                appStore.dispatch({
                    type: 'inviteModalSlice/change',
                    payload: {
                        disabled: false,
                        loading: false,
                    },
                })
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'generic.snack.error.wip',
                    },
                })
            },
        }
        responses[response.type]()
        return
    },
}

export const userGetStatsInputs = {
    lockuifunction: (log) => {
        log.push({
            date: new Date(),
            message: 'userGetStatsInputs.lockuifunction',
            tags: ['function'],
        })
        appStore.dispatch({
            type: 'userSlice/change',
            payload: {
                state: {
                    stats: 'loading',
                },
            },
        })
    },
    getinputsfunction: (log) => {
        log.push({
            date: new Date(),
            message: 'userGetStatsInputs.getinputsfunction',
            tags: ['function'],
        })
        return {
            inputs: {
                token: appStore.getState().authSlice.token,
            },
        }
    },
    sercivechecks: [
        {
            // Check inputs root is available
            field: 'inputs',
            error: 'generic.error.missinginputs',
            subchecks: [
                {
                    // Check token is available
                    field: 'token',
                    error: 'generic.error.missingtoken',
                    fieldsinerror: ['token'],
                },
            ],
        },
    ],
    getcheckoutcomedispatchfunction: (log) => {
        log.push({
            date: new Date(),
            message: 'userGetStatsInputs.getcheckoutcomedispatchfunction',
            tags: ['function'],
        })
        return 'userSlice/change'
    },
    apicall: async (inputs, log) => {
        log.push({
            date: new Date(),
            message: 'userGetStatsInputs.apicall',
            inputs: inputs,
            tags: ['function'],
        })
        try {
            return await apiUserGetStats(appStore.getState().authSlice.token)
        } catch (err) {
            return err
        }
    },
    getmanageresponsefunction: (response, log) => {
        log.push({
            date: new Date(),
            message: 'userGetStatsInputs.getmanageresponsefunction',
            response: response,
            tags: ['function'],
        })
        console.log('response', response)
        let responses = {
            'user.getstats.success': () => {
                // Outcome
                appStore.dispatch({
                    type: 'userSlice/setStats',
                    payload: { stats: response.data.stats },
                })
            },
            'user.getstats.error': () => {
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'generic.snack.error.wip',
                    },
                })
            },
        }
        responses[response.type]()
        return
    },
}
