export const visitedCollection = (payload) => {
    return {
        type: 'VISITED_COLLECTION',
        payload
    }
}
export const createCollection = (payload) => {
    return {
        type: 'CREATE_COLLECTION',
        payload
    }
}
export const renameCollection = (payload) => {
    return {
        type: 'RENAME_COLLECTION',
        payload
    }
}
export const deleteCollection = (payload) => {
    return {
        type: 'REMOVE_COLLECTION',
        payload
    }
}
export const addItemToCollection = (payload) => {
    return {
        type: 'ADD_ITEM',
        payload
    }
}
export const removeItemFromCollection = (payload) => {
    return {
        type: 'REMOVE_ITEM',
        payload
    }
}
export const createFirstCollection = () => {
    return {
        type: 'CREATE_FIRST_COLLECTION',
    }
}
export const importCollection = (payload) => {
    return {
        type: 'IMPORT_COLLECTION',
        payload
    }
}
