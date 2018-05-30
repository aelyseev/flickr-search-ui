/* eslint-disable react/require-default-props */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import {win} from 'lib/browser';
import {getApiKey, setApiCredentials} from 'store/api';
import Routes from 'constants/routes';
import {AUTH_STORAGE_KEY} from 'store';

@connect(
    state => ({
        apiKey: getApiKey(state) || ''
    }),
    {
        setApiCredentials
    }
)
export default class AuthArea extends Component {
    static propTypes = {
        apiKey: PropTypes.string,
        children: PropTypes.node.isRequired,
        /* eslint-disable */
        setApiCredentials: PropTypes.func
        /* eslint-enable */
    };

    tokenStorageHandler = (e) => {
        if (e.key !== AUTH_STORAGE_KEY) {
            return;
        }
        let credentials;
        try {
            const state = JSON.parse(e.newValue).api;
            credentials = setApiCredentials(state);
        } catch (ex) {
            credentials = {};
        }
        this.props.setApiCredentials(credentials);
    };

    componentDidMount() {
        win.addEventListener('storage', this.tokenStorageHandler);
    }

    componentWillUnmount() {
        win.removeEventListener('storage', this.tokenStorageHandler);
    }

    render() {
        const {apiKey} = this.props;
        return apiKey ? this.props.children : <Redirect to={Routes.credentials} />;
    }
}
