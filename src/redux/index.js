import { createStore } from 'redux';
import rootReducer from './reducers';
import Reactotron from '../ReactotronConfig'
import { loadState, saveState } from '../services/storage';

let state = loadState("state");
let persistedState = {}

if (state !== undefined) {
    persistedState = state.state
}

const store = createStore(rootReducer, persistedState, Reactotron.createEnhancer());

store.subscribe(() => {
    saveState({
        state: store.getState()
    });
});

export default store;
