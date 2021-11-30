// const setCartItem = (state, action) => {
//     switch (action.type) {
//         case 'SET_TO_CART':
//             return {
//                 ProductID: action.payload.ProductID,
//                 VariantID: action.payload.VariantID,
//                 Quantity: 0,
//                 Images: action.payload.Images,
//                 ComparePrice: action.payload.ComparePrice,
//                 SellingPrice: action.payload.SellingPrice,
//                 Name: action.payload.Name
//             };
//         default:
//             return state;
//     }
// }

// const condition = (item, action) => {
//     return item.ProductID == action.payload.ProductID && item.VariantID == action.payload.VariantID;
// }
// let initialstate = [{
//     ComparePrice: 0,
//     Images: '',
//     Name: "",
//     ProductID: 0,
//     Quantity: 0,
//     SellingPrice: 0,
//     VariantID: 0
// }]
const cartReducer = (state = [], action) => {
    switch (action.type) {
        /* Add item in cart item */
        case 'ADD_TO_CART': {

            let product = action.payload;

            let item = state.length > 0 ? state.find(item => item.ProductID === product.ProductID) : null;

            if (!item) {
                item = { ...product };

                item.Quantity = 1;

                return [...state, item]
            }
            else {

                state.map(item => {

                    if (item.ProductID === product.ProductID) {
                        item.Quantity++;
                        return item;
                    }
                    // else {
                    //     return [...state,product];

                    // }

                })
                return [...state];

            }
        }
        /* Sub Quantity 1 into cart item */
        case 'SUB_QUANTITY': {

            let product = action.payload

            let items = state.map(item => {

                if (item.ProductID === product.ProductID) {
                    item.Quantity--;
                }

                return item;
            })

            return [...items];
        }
        /* 
        case 'UPDATE_QUANTITY': {

            let product = action.payload

            let items = state.map(item => {

                if(item.ProductID == product.ProductID){
                    item.Quantity = product.Quantity;
                }

                return item;
            })

            return [...items];
        }   */
        case 'REMOVE_ITEM': {
            let product = action.payload

            let items = state.filter(item => {

                if (item.ProductID !== product.ProductID) {
                    return item;
                }
            })

            return [...items];
        }
        case 'REMOVE_ALL': {
            return []
        }
        default:
            return state;
    }


}

export default cartReducer;