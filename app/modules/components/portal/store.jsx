import React from 'react';
import {combineReducers} from 'redux';
import {createSelector} from 'reselect';
import {createAction, handleActions} from 'redux-actions';

export const NAMESPACE = 'portal';

export const showModal = createAction(`${NAMESPACE}/SHOW_MODAL`);
export const hideModal = createAction(`${NAMESPACE}/HIDE_MODAL`);

const defaults = {component: <div />, props: {}};
export const setPortalComponent = createAction(`${NAMESPACE}/SET_PORTAL_COMPONENT`, (component, props = {}) => ({component, props}));


const visibility = handleActions({
    [hideModal]: () => false,
    [showModal]: () => true
}, false);

const content = handleActions({
    [setPortalComponent]: (state, {payload}) => ({...payload}),
    [hideModal]: () => defaults
}, defaults);

export const getPortal = state => state.portal;
export const getPortalVisibility = createSelector(getPortal, portal => portal.visibility);

const getPortalContent = createSelector(getPortal, portal => portal.content);
const getPortalComponent = createSelector(getPortalContent, c => c.component);
const getPortalProps = createSelector(getPortalContent, c => c.props);
export const getPortalRender =
    createSelector(getPortalComponent, getPortalProps, (component, props) => () => React.createElement(component, props));

export default combineReducers({visibility, content});
