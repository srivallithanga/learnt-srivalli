import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import {rootReducer} from './reducers/rootReducer'; // Combine your reducers here
import logger from 'redux-logger';
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
