// Inputs
import { gameCreateInputs, gameDeleteInputs, gameGetOldestInputs } from './game.service.inputs.js'
// Services
import serviceProceed from '../serviceProceed.js'

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

export async function serviceGameGetOldest() {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('serviceGameGetOldest')
    }
    await serviceProceed(gameGetOldestInputs)
}
