import {
  createStore,
  combineReducers,
//  applyMiddleware,
} from 'redux';
// import logger from 'redux-logger';

import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from '../reducers';

const store = createStore(
  combineReducers(reducers),
  composeWithDevTools(),
);

export default store;
