// @ts-nocheck
export default function Access (account, arObjects) {
    let access = false
    if ((!account) || (!arObjects.length)) return false

    for (let item of arObjects) {
        let id = (item.from_id) ? item.from_id : item._id
        if (account._id === id) return true
    }

    return false
}