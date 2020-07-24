import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const devTools = window.REDUX_DEVTOOLS_EXTENSION ? window.REDUX_DEVTOOLS_EXTENSION() : f => f;

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    devTools
));

export default store;