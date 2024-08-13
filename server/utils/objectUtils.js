const filterObject = (obj) => {

    return Object.fromEntries(
        Object.entries(obj).filter(([clave, valor]) => valor !== "")
    )
}

module.exports = {
    filterObject
}