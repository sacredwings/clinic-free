function capitalizeFirstLetter(string) {
    if (typeof string !== 'string') return ''
    string = string.trimLeft()

    return string

    //string = string.toLowerCase()
    //return string.charAt(0).toUpperCase() + string.slice(1)
}

export {
    capitalizeFirstLetter
}