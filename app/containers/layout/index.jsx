/* eslint-disable react/sort-comp,react/require-default-props */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {matchPath} from 'react-router';
import {withRouter} from 'react-router-dom';
import Routes from 'constants/routes';
import DeferredComponent from 'modules/components/deferred-component';
import AuthArea from 'containers/auth-area';

import styleNames from 'modules/style-names';
import styles from './styles.scss';

const sn = styleNames(styles);

class Layout extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  };

  render() {
    const content = (
      <AuthArea>
        <div className={sn('layout__content')}>{this.props.children}</div>
      </AuthArea>
    );
    const match = matchPath(this.props.location.pathname, {path: Routes.credentials});
    return match ? <DeferredComponent loader={() => import(/* webpackChunkName: 'credentials' */ 'pages/credentials')} /> : content;
  }
}

export default compose(
  withRouter,
  connect((state) => ({
    bundle: state.bundle,
  }))
)(Layout);
