// APIs
import { apiFeedbackCreate } from './feedback.api.js'
// Services
import serviceProceedCheck from '../../../_services/serviceProceedCheck.js'
import { random_id, random_string } from '../../../_services/toolkit.js'
import appStore from '../../../../_store/appStore.js'

export const feedbackCreateInputs = {
    lockuifunction: (log) => {
        log.push({
            date: new Date(),
            message: 'serviceProceed.lockuifunction',
            tags: ['function'],
        })
        appStore.dispatch({ type: 'feedbackModalSlice/lock' })
    },
    unlockuifunction: (log) => {
        log.push({
            date: new Date(),
            message: 'serviceProceed.unlockuifunction',
            tags: ['function'],
        })
        appStore.dispatch({
            type: 'feedbackModalSlice/change',
            payload: {
                disabled: false,
                loading: false,
            },
        })
    },
    getinputsfunction: (log) => {
        log.push({
            date: new Date(),
            message: 'serviceProceed.getinputsfunction',
            tags: ['function'],
        })
        let inputs = { ...appStore.getState().feedbackModalSlice.inputs }
        inputs.userid = appStore.getState().userSlice.userid
        return {
            inputs: inputs,
        }
    },
    sercivechecks: [
        {
            // Check inputs root is available
            field: 'inputs',
            error: 'feedback.error.missinginputs',
            subchecks: [
                {
                    // Check userid is available
                    field: 'userid',
                    error: 'feedback.error.missinguserid',
                },
                {
                    // Check consent is available
                    field: 'consent',
                    error: 'feedback.error.missingconsent',
                    fieldsinerror: ['consent'],
                    checkfunction: (serviceInputs) => {
                        console.log(
                            'Check consent is available + checkfunction',
                            serviceInputs
                        )
                        if (
                            serviceInputs.inputs.consent === false ||
                            serviceInputs.inputs.consent === undefined
                        ) {
                            return {
                                errors: ['feedback.error.missingconsent'],
                                stateChanges: {
                                    errors: { consent: true },
                                },
                                proceed: false,
                            }
                        } else {
                            return { proceed: true }
                        }
                    },
                },
                {
                    // Check text is available
                    field: 'text',
                    error: 'feedback.error.missingtext',
                    fieldsinerror: ['text'],
                    checkfunction: (serviceInputs) => {
                        console.log(
                            'Check text is available + checkfunction',
                            serviceInputs
                        )
                        if (
                            serviceInputs.inputs.text === '' &&
                            serviceInputs.inputs.source === 'open'
                        ) {
                            return {
                                errors: ['feedback.error.missingmessage'],
                                stateChanges: {
                                    errors: { text: true },
                                },
                                proceed: false,
                            }
                        } else {
                            return { proceed: true }
                        }
                    },
                },
                {
                    // Check source is available
                    field: 'source',
                    error: 'feedback.error.missingsource',
                    fieldsinerror: ['source'],
                },
                {
                    // Check tag is available
                    field: 'tag',
                    error: 'feedback.error.missingtag',
                    fieldsinerror: ['tag'],
                    checkfunction: (serviceInputs) => {
                        console.log(
                            'Check tag is available + checkfunction',
                            serviceInputs
                        )
                        if (
                            serviceInputs.inputs.tag === '' &&
                            serviceInputs.inputs.source === 'open'
                        ) {
                            return {
                                errors: [
                                    'feedback.error.emptytagbutopensource',
                                ],
                                proceed: false,
                            }
                        } else {
                            return { proceed: true }
                        }
                    },
                },
            ],
        },
    ],
    getcheckoutcomedispatchfunction: (log) => {
        log.push({
            date: new Date(),
            message: 'serviceProceed.getcheckoutcomedispatchfunction',
            tags: ['function'],
        })
        return 'feedbackModalSlice/change'
    },
    apicall: async (inputs, log) => {
        log.push({
            date: new Date(),
            message: 'serviceProceed.apicall',
            inputs: inputs,
            tags: ['function'],
        })
        try {
            return await apiFeedbackCreate(
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
            message: 'serviceProceed.getmanageresponsefunction',
            response: response,
            tags: ['function'],
        })
        let responses = {
            'feedback.create.success': () => {
                appStore.dispatch({
                    type: 'feedbackModalSlice/close',
                })
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'feedback.snack.created',
                    },
                })
            },
            'feedback.create.error': () => {
                appStore.dispatch({
                    type: 'feedbackModalSlice/change',
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
        return responses[response.type]()
    },
}
