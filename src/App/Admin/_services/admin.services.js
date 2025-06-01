// Inputs
import {
    adminGetTablesByPlayersInputs,
    adminGetTablesByGamesInputs,
    adminGetUsersByStatusInputs,
    adminPopulateInputs,
} from './admin.services.inputs.js'
// Services
import serviceProceed from '../../_shared/_services/serviceProceed.js'
import { random_id } from '../../_shared/_services/toolkit.js'
// Reducers
import appStore from '../../_store/appStore.js'

export async function serviceAdminPopulate() {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('serviceAdminPopulate')
    }

    try {
        // API call
        const data = await apiPopulate()
        if (process.env.REACT_APP_DEBUG === 'TRUE') {
            console.log('data.type : ' + data.type)
        }

        // Response management
        switch (data.type) {
            case 'admin.populate.success':
                break
            case 'admin.populate.error.unauthorized':
                break
            case 'admin.populate.error.deniedaccess':
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'generic.snack.error.wip',
                    },
                })
                break
            case 'admin.populate.error.failedpopulation':
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'generic.snack.error.wip',
                    },
                })
                break
            default:
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'generic.snack.api.unmanagedtype',
                    },
                })
        }
    } catch (err) {
        if (process.env.REACT_APP_DEBUG === 'TRUE') {
            console.log('service caught error')
            console.log(err)
        }
        // Error network
        appStore.dispatch({
            type: 'sliceSnack/change',
            payload: {
                uid: random_id(),
                id: 'generic.snack.api.errornetwork',
            },
        })
    }
}

export async function serviceAdminGetTablesByGames() {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('serviceAdminGetTablesByGames')
    }
    await serviceProceed(adminGetTablesByGamesInputs)
}

export async function serviceAdminGetTablesByPlayers() {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('serviceAdminGetTablesByPlayers')
    }

    try {
        // Lock UI
        appStore.dispatch({ type: 'sliceAdminStats/lock' })

        // API call
        const data = await apiTablesByPlayers()
        if (process.env.REACT_APP_DEBUG === 'TRUE') {
            console.log('data.type : ' + data.type)
        }

        // Response management
        switch (data.type) {
            case 'admin.tablesbyplayers.success':
                appStore.dispatch({
                    type: 'sliceAdminStats/set',
                    payload: { tablesbyplayers: data.data.tables },
                })
                break
            case 'admin.tablesbyplayers.error.onaggregate':
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'generic.snack.error.wip',
                    },
                })
                break
            case 'admin.tablesbyplayers.error.notfound':
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'generic.snack.error.wip',
                    },
                })
                break
            case 'admin.tablesbyplayers.error.deniedaccess':
                appStore.dispatch({
                    type: 'sliceAdminStats/deny',
                })
                break
            default:
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'generic.snack.api.unmanagedtype',
                    },
                })
        }
    } catch (err) {
        if (process.env.REACT_APP_DEBUG === 'TRUE') {
            console.log('service caught error')
            console.log(err)
        }
        appStore.dispatch({
            type: 'sliceSnack/change',
            payload: {
                uid: random_id(),
                id: 'generic.snack.error.unknown',
            },
        })
    }
}

export async function serviceAdminGetUsersByStatus() {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('serviceAdminGetUsersByStatus')
    }

    try {
        // Lock UI
        appStore.dispatch({ type: 'sliceAdminStats/lock' })

        // API call
        const data = await apiUsersByStatus()
        if (process.env.REACT_APP_DEBUG === 'TRUE') {
            console.log('data.type : ' + data.type)
        }

        // Response management
        switch (data.type) {
            case 'admin.usersbystatus.success':
                appStore.dispatch({
                    type: 'sliceAdminStats/set',
                    payload: { usersbystatus: data.data.users },
                })
                break
            case 'admin.usersbystatus.error.onaggregate':
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'generic.snack.error.wip',
                    },
                })
                break
            case 'admin.usersbystatus.error.notfound':
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'generic.snack.error.wip',
                    },
                })
                break
            case 'admin.usersbystatus.error.deniedaccess':
                appStore.dispatch({
                    type: 'sliceAdminStats/deny',
                })
                break
            default:
                appStore.dispatch({
                    type: 'sliceSnack/change',
                    payload: {
                        uid: random_id(),
                        id: 'generic.snack.api.unmanagedtype',
                    },
                })
        }
    } catch (err) {
        if (process.env.REACT_APP_DEBUG === 'TRUE') {
            console.log('service caught error')
            console.log(err)
        }
        appStore.dispatch({
            type: 'sliceSnack/change',
            payload: {
                uid: random_id(),
                id: 'generic.snack.error.unknown',
            },
        })
    }
}
