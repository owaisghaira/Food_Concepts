//set total
export const setTotal = (payload) => {
    return {
        type: 'SET_TOTAL',
        payload
    }
}
//set into list action
export const setToCart = (payload) => {
    return {
        type: 'SET_TO_CART',
        payload
    }
}
//add cart action
export const addToCart = (payload) => {
    return {
        type: 'ADD_TO_CART',
        payload
    }
}
//remove item action
export const setQuantity = (payload) => {
    return {
        type: 'SET_QUANTITY',
        payload
    }
}
//subtract qt action
export const subtractQuantity = (payload) => {
    return {
        type: 'SUB_QUANTITY',
        payload
    }
}
//add qt action
export const addQuantity = (payload) => {
    return {
        type: 'ADD_QUANTITY',
        payload
    }
}
//remove item action
export const removeItem = (payload) => {
    return {
        type: 'REMOVE_ITEM',
        payload
    }
}
// remove all items
export const removeAllCartItems = () => {
    return {
        type: 'REMOVE_ALL'
    }
}