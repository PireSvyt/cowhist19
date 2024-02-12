function random_id(length = 8) {
    // TESTED
    var temp_id = Math.random().toString(16).substr(2, length)
    var container = document.getElementById(temp_id)
    while (container != null) {
        temp_id = Math.random().toString(16).substr(2, length)
        container = document.getElementById(temp_id)
    }
    return temp_id
}

function random_string(length = 24) {
    let result = ''
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
        counter += 1
    }
    return result
}

function validateEmail(email) {
    /*

  Return a validation of an email matched format

  Source : https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript

  */
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}
function validatePassword(password) {
    // https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s19.html
    var minMaxLength = /^[\s\S]{8,50}$/, // Password length from .. to ...
        upper = /[A-Z]/, // contains upper case
        lower = /[a-z]/, // contains lower case
        number = /[0-9]/, // contains number
        special = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/, // contains special char
        count = 0

    if (minMaxLength.test(password)) {
        // Only need 3 out of 4 of these to match
        if (upper.test(password)) count++
        if (lower.test(password)) count++
        if (number.test(password)) count++
        if (special.test(password)) count++
        return count >= 3
    } else {
        return false
    }
}

function appendObject(obj, append) {
    Object.keys(append).forEach((key) => {
        if (obj[key] === undefined) {
            obj[key] = append[key]
        } else {
            if (typeof obj[key] === 'object') {
                obj[key] = appendObject(obj[key], append[key])
            } else {
                obj[key] = append[key]
            }
        }
    })
    return obj
}

function debounce(func, timeout = 150) {
    /*

  Allows to to debounce a function

  Source : https://www.freecodecamp.org/news/javascript-debounce-example/

  */
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

function isDefined(item) {
    if (item !== undefined) {
        return true
    } else {
        return false
    }
}
function isNonNull(item) {
    if (isDefined(item) === true) {
        if (item !== null) {
            return true
        } else {
            return false
        }
    } else {
        return undefined
    }
}
function isEmpty(item) {
    if (isNonNull(item) === true) {
        switch (typeof item) {
            case 'object':
                if (Object.keys(item).length === 0) {
                    return true
                } else {
                    return false
                }
            case 'string':
                if (item.length === 0) {
                    return true
                } else {
                    return false
                }
            case 'number':
                if (isNaN(item)) {
                    return true
                } else {
                    return false
                }
            default:
                return undefined
        }
    } else {
        return undefined
    }
}
function isNotEmpty(item) {
    if (isNonNull(item) === true) {
        return !isEmpty(item)
    } else {
        return undefined
    }
}

module.exports = {
    random_id,
    random_string,
    validateEmail,
    validatePassword,
    appendObject,
    debounce,
    isDefined,
    isNonNull,
    isEmpty,
    isNotEmpty,
}
