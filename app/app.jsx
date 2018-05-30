/* eslint-disable react/no-unused-state */
import React from 'react';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import Fail from 'pages/fail';
import logErrors from 'lib/errors';
import Layout from 'containers/layout/index';
import Store from './store';
import Routes from './routes';

export default class App extends React.Component {
  state = {fail: false, reasons: null};

  componentDidCatch(error, info) {
    this.setState({fail: true});
    logErrors(error);
    logErrors(info);
  }

  render() {
    return (
      <Provider store={Store}>
        <HashRouter key={Math.random()}>
          <div>
            {this.state.fail ? (
              <Fail />
            ) : (
              <Layout>
                <Routes />
              </Layout>
            )}
          </div>
        </HashRouter>
      </Provider>
    );
  }
}
