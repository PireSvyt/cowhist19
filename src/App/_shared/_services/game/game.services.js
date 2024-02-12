// Inputs
import { gameCreateInputs, gameDeleteInputs } from './game.service.inputs.js'
// APIs
import { apiGameDelete } from './game.api.js'
// Services
import { random_id } from '../toolkit.js'
import serviceProceed from '../serviceProceed.js'
// Reducers
import appStore from '../../../_store/appStore.js'

export async function serviceGameCreate() {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('serviceGameCreate')
    }
    await serviceProceed(gameCreateInputs)
}

export async function serviceGameDelete(gameid) {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('serviceGameDelete')
    }
    let directInputs = {
        gameid: gameid,
    }
    await serviceProceed(gameDeleteInputs, directInputs)
}
