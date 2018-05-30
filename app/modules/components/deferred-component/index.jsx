import React from 'react';
import PropTypes from 'prop-types';

import cancelable from 'modules/cancelable-promise';

export default class DeferredComponent extends React.Component {
    static propTypes = {
        element: PropTypes.func,
        loader: PropTypes.func.isRequired // return a Promise for loading the component
    };

    static defaultProps = {
        element: defaultElement
    };

    loader = cancelable(Promise.resolve());

    state = {
        component: null,
        mounted: false,
        loaded: false
    };

    loadComponent() {
        this.loader = cancelable(this.props.loader());
        this.loader
            .then((bundle) => {
                if (!this.state.mounted) {
                    this.setState({mounted: true, loaded: true, component: bundle.default});
                    this.forceUpdate();
                }
            });
    }

    componentDidMount() {
        this.loadComponent();
    }

    componentWillReceiveProps({loader}) {
        if (this.props.loader !== loader) {
            this.setState({mounted: false}, () => this.loadComponent());
        }
    }

    componentWillUnmount() {
        this.loader.cancel();
    }

    render() {
        const {component, loaded} = this.state;
        return loaded ? React.createElement(component) : React.createElement(this.props.element);
    }
}

function defaultElement() {
    return <div style={{height: '200px'}}>Loading</div>;
}

