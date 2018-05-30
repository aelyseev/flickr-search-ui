import {createAction, handleActions} from 'redux-actions';
import {createSelector} from 'reselect';
import {namespace} from 'store/utils';

export const NAMESPACE = 'API';

const type = namespace(NAMESPACE);

const defaults = {
  user: '',
  apiKey: '',
  secret: '',
};

export const setApiCredentials = createAction(type('set.credentials'));
const resetApiCredentials = createAction(type('reset.credentials'));

const reducer = handleActions(
  {
    [setApiCredentials]: (state, {payload}) => ({...state, ...payload}),
    [resetApiCredentials]: () => defaults,
  },
  defaults
);

const getApi = (state) => state.api;
export const getApiKey = createSelector(getApi, (api) => api.apiKey || '');
export const getApiSecret = createSelector(getApi, (api) => api.secret);
export const getApiUser = createSelector(getApi, (api) => api.user);

export default reducer;
