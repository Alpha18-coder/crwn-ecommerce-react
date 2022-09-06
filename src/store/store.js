/* We receive actions and dispatch them */
import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

//for redux logger
const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
  Boolean
);

const composedEnhancers = compose(applyMiddleware(...middleWares));

//root reducer
export const store = createStore(rootReducer, undefined, composedEnhancers);