import {createAction, handleActions} from 'redux-actions';
import {createSelector} from 'reselect';
import {namespace} from 'store/utils';

export const NAMESPACE = 'NETWORK';

const type = namespace(NAMESPACE);

export const startRequest = createAction(type('start.request'));
export const finishRequest = createAction(type('finish.request'));

const reducer = handleActions({
    [startRequest]() {
        return {status: 0};
    },
    [finishRequest]() {
        return {status: 200};
    }
}, {status: 200});

export default reducer;

const getNetwork = state => state.network;
export const getNetworkStatus = createSelector(getNetwork, network => network.status);
