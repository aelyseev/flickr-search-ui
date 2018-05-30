import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {win, localStorage} from 'lib/browser';
import {pick, startsWith} from 'lodash';

import {combineEpics, createEpicMiddleware} from 'redux-observable';

import api, {NAMESPACE as API_NAMESPACE} from 'store/api';
import favorites, {NAMESPACE as FAV_NAMESPACE} from 'store/favorites';
import search from 'store/search';
import network from 'store/network';
import {startSearchEpic, appendSearchEpic} from 'store/search-epics';

const rootEpic = combineEpics(startSearchEpic, appendSearchEpic);

const rootReducer = {
  api,
  favorites,
  search,
  network,
};

export const AUTH_STORAGE_KEY = '__APP';

let initialStore;
try {
  initialStore = JSON.parse(localStorage[AUTH_STORAGE_KEY]);
} catch (e) {
  initialStore = {};
}

const backupStore = ({getState}) => (next) => (action) => {
  const result = next(action);
  if (startsWith(action.type, API_NAMESPACE) || startsWith(action.type, FAV_NAMESPACE)) {
    localStorage[AUTH_STORAGE_KEY] = JSON.stringify(pick(getState(), ['api', 'favorites']));
  }
  return result;
};

const reduxLogger = win.__REDUX_DEVTOOLS_EXTENSION__ ? win.__REDUX_DEVTOOLS_EXTENSION__({maxAge: 10}) : (f) => f;
const store = createStore(
  combineReducers(rootReducer),
  initialStore,
  compose(applyMiddleware(backupStore), applyMiddleware(createEpicMiddleware(rootEpic)), reduxLogger)
);

export default store;
