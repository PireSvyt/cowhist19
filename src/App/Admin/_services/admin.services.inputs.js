// APIs
import {
    apiPopulate,
    apiTablesByGames,
    apiTablesByPlayers,
    apiUsersByStatus,
} from './admin.api.js'
// Services
import { random_string, random_id } from '../../_shared/_services/toolkit.js'
// Reducers
import appStore from '../../_store/appStore.js'

export const adminGetTablesByGamesInputs = {
    lockuifunction: (log) => {
        log.push({
            date: new Date(),
            message: 'adminGetTablesByGamesInputs.lockuifunction',
            tags: ['function'],
        })
        appStore.dispatch({
            type: 'adminSlice/lock',
            payload: { scope: 'getTablesByGames' },
        })
    },
    getinputsfunction: (log) => {
        log.push({
            date: new Date(),
            message: 'adminGetTablesByGamesInputs.getinputsfunction',
            tags: ['function'],
        })
        return {
            inputs: {
                priviledges: appStore.getState().userSlice.priviledges,
            },
        }
    },
    sercivechecks: [
        {
            // Check inputs root is available
            field: 'inputs',
            error: 'admin.error.missinginputs',
            subchecks: [
                {
                    // Check priviledges are available
                    field: 'priviledges',
                    error: 'admin.error.missingpriviledges',
                    subchecks: [
                        {
                            // Check user is admin
                            error: 'admin.error.deniedaccess',
                            checkfunction: (serviceInputs) => {
                                if (
                                    !serviceInputs.inputs.priviledges.includes(
                                        'admin'
                                    )
                                ) {
                                    return {
                                        errors: ['admin.error.deniedaccess'],
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
        },
    ],
    apicall: async (inputs, log) => {
        log.push({
            date: new Date(),
            message: 'adminGetTablesByGamesInputs.apicall',
            inputs: inputs,
            tags: ['function'],
        })
        try {
            return await apiTablesByGames()
        } catch (err) {
            return err
        }
    },
    getmanageresponsefunction: (response, log) => {
        log.push({
            date: new Date(),
            message: 'adminGetTablesByGamesInputs.getmanageresponsefunction',
            response: response,
            tags: ['function'],
        })
        let responses = {
            'admin.tablesbygames.success': () => {
                appStore.dispatch({
                    type: 'adminSlice/set',
                    payload: { tablesbygames: response.data },
                })
            },
            'admin.tablesbygames.error.onaggregate': () => {
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'generic.snack.error.wip',
                    },
                })
            },
            'admin.tablesbygames.error.notfound': () => {
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'generic.snack.error.wip',
                    },
                })
            },
            'admin.tablesbygames.error.deniedaccess': () => {
                appStore.dispatch({
                    type: 'adminSlice/deny',
                })
            },
        }
        return responses[response.type]()
    },
}
