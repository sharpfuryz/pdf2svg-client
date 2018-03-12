// @flow
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

export const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router, sagaMiddleware);

export const configureStore = (initialState) => {
  return createStore(rootReducer, initialState, enhancer);
}

