module.exports = function getKeyList (object, root, keyList = []) {
    for (const key in object) {
        if (typeof object[key] === 'string' || object[key] instanceof String) {
            keyList.push(root + key)
        } else {
            getKeyList(object[key], root + key + ".", keyList);
        }
    }
    return keyList
}