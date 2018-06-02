import {createAction, handleActions} from 'redux-actions';
import {createSelector} from 'reselect';
import {namespace} from 'store/utils';
import nanoid from 'nanoid';

import {omit, toNumber, toString} from 'lodash';

export const NAMESPACE = 'SEARCH';

const type = namespace(NAMESPACE);

export const createTab = createAction(type('create.tab'));
export const switchTab = createAction(type('switch.tab'));
export const deleteTab = createAction(type('delete.tab'));
export const startSearch = createAction(type('start.search'));
export const appendSearch = createAction(type('append.search'));
export const setSearchQuery = createAction(type('set.search.query'), (search) => toString(search));
export const setSearchMeta = createAction(type('set.search.meta'), (page, pages, total) => ({
  page: toNumber(page),
  pages: toNumber(pages),
  total: toNumber(total),
}));
export const setCount = createAction(type('set.count'), (count) => toNumber(count));
export const setFilter = createAction(type('set.filter'), (filter) => toNumber(filter));
export const setPhotos = createAction(type('set.photos'));
export const addPhotos = createAction(type('add.photos'));

const id = () => {
  if (process.env.NODE_ENV === 'test') {
    return nanoid();
  }
  return crypto
    ? nanoid()
    : Math.random()
        .toString()
        .slice(2);
};

const defaults = {
  tabs: {},
  search: '',
  submitted: false,
  page: 0,
  pages: 0,
  total: 0,
  results: [],
  id: id(),
  count: 0,
  filter: 0,
};

const reducer = handleActions(
  {
    [setSearchQuery](state, {payload}) {
      return {...state, search: payload, submitted: false};
    },
    [startSearch](state) {
      return {...state, submitted: true};
    },
    [setCount](state, {payload}) {
      return {...state, count: payload};
    },
    [setFilter](state, {payload}) {
      return {...state, filter: payload};
    },
    [switchTab](state, {payload}) {
      const tabs = state.search
        ? {...omit(state.tabs, [payload]), [state.id]: omit(state, ['tabs', 'id'])}
        : {...omit(state.tabs, [payload])};
      return {
        ...state,
        ...state.tabs[payload],
        id: payload,
        tabs,
      };
    },
    [setSearchMeta](state, {payload: {page, pages, total}}) {
      return {...state, page, pages, total};
    },
    [createTab](state) {
      const tabs = {...state.tabs, [state.id]: omit(state, ['tabs', 'id'])};
      return {...state, ...omit(defaults, ['tabs, id']), id: id(), tabs};
    },
    [deleteTab](state, {payload}) {
      const tabs = omit(state.tabs, [payload]);
      return {...state, tabs};
    },
    [setPhotos](state, {payload}) {
      return {...state, results: payload};
    },
    [addPhotos](state, {payload}) {
      return {...state, results: state.results.concat(payload)};
    },
  },
  defaults
);

export default reducer;

const getSearch = (state) => state.search;
export const getSearchQuery = createSelector(getSearch, (search) => search.search);
export const getFilter = createSelector(getSearch, (search) => search.filter);

const getAllPhotos = createSelector(getSearch, (search) => search.results);
export const getPhotos = createSelector(
  getAllPhotos,
  getFilter,
  (photos, filter) =>
    filter === 0
      ? photos
      : photos.filter((photo) =>
          photo.sizes
            .slice()
            .reverse()
            .some(({width, height}) => width >= filter || height >= filter)
        )
);

export const getTotal = createSelector(getSearch, (search) => search.total);
export const getPage = createSelector(getSearch, (search) => search.page);
export const getPages = createSelector(getSearch, (search) => search.pages);
export const getSubmitted = createSelector(getSearch, (search) => search.submitted);
export const getTabs = createSelector(getSearch, (search) =>
  Object.keys(search.tabs).map((tabId) => ({id: tabId, search: search.tabs[tabId].search}))
);
