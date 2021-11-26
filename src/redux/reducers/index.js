import { combineReducers } from 'redux';

import collectionReducer from './collectionReducer';
import cartReducer from './cartReducer';

export default combineReducers({
    collections: collectionReducer,
    cart: cartReducer
});