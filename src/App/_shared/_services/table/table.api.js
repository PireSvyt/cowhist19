require('dotenv')
import axios from 'axios'

let apiURL = process.env.REACT_APP_SERVER_URL

// TESTED
export async function apiTableCreate(table, token) {
    try {
        const res = await axios({
            method: 'post',
            url: apiURL + 'table/v1/create',
            data: table,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        return res.data
    } catch (err) {
        console.log('apiTableCreate err', err)
        return err.response.data
    }
}

// TESTED
export async function apiTableGetDetails(tableid, token) {
    try {
        const res = await axios({
            method: 'get',
            url: apiURL + 'table/v3/' + tableid,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        return res.data
    } catch (err) {
        return err.response.data
    }
}

// TESTED
export async function apiTableGetHistory(tableid, parameters, token) {
    try {
        const res = await axios({
            method: 'post',
            url: apiURL + 'table/v3/history/' + tableid,
            data: parameters,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        return res.data
    } catch (err) {
        return err.response.data
    }
}

// TESTED
export async function apiTableGetStats(tableid, parameters, token) {
    try {
        const res = await axios({
            method: 'post',
            url: apiURL + 'table/v1/stats/' + tableid,
            data: parameters,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        return res.data
    } catch (err) {
        return err.response.data
    }
}

// TESTED
export async function apiTableSave(table, token) {
    try {
        const res = await axios({
            method: 'post',
            url: apiURL + 'table/v2/save',
            data: table,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        return res.data
    } catch (err) {
        return err.response.data
    }
}

// TESTED
export async function apiTableDelete(tableid, token) {
    try {
        const res = await axios({
            method: 'delete',
            url: apiURL + 'table/v1/' + tableid,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        return res.data
    } catch (err) {
        return err.response.data
    }
}
