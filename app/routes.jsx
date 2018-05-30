import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import Routes from 'constants/routes';
import DeferredComponent from 'modules/components/deferred-component';

import Index from 'pages/index/index';

function nonMatch() {
  return <Redirect to={{pathname: Routes.root}} />;
}

export default () => (
  <div>
    <Switch>
      <Route exact path={Routes.root} component={Index} />
      <Route exact path={Routes.favorites} component={Index} />
      <Route
        exact
        path={Routes.credentials}
        render={() => <DeferredComponent loader={() => import(/* webpackChunkName: 'credentials' */ 'pages/credentials')} />}
      />

      <Route component={nonMatch} />
    </Switch>
  </div>
);
