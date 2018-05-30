/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/anchor-is-valid */
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';

import Routes from 'constants/routes';

import {noop} from 'lodash';

import styleNames from 'modules/style-names';
import styles from './styles.scss';

const sn = styleNames(styles);

@withRouter
export default class Tabs extends React.Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({id: PropTypes.string, search: PropTypes.string})).isRequired,
    switchTab: PropTypes.func,
    switchToFavorites: PropTypes.func,
    canCreate: PropTypes.bool,
    createTab: PropTypes.func,
    location: PropTypes.object,
  };

  static defaultProps = {
    location: {},
    switchTab: noop,
    switchToFavorites: noop,
    createTab: noop,
    canCreate: false,
  };

  render() {
    const {location: {pathname}, tabs, switchTab, switchToFavorites, createTab, canCreate} = this.props;
    return (
      <div className={sn('t')}>
        <div onClick={switchToFavorites} className={sn('t__item-favorites')}>
          {pathname === Routes.root ? <Link to={Routes.favorites}>Favorites</Link> : <Link to={Routes.root}>Back to search</Link>}
        </div>
        {pathname === Routes.root && (
          <Fragment>
            <div className={sn('t__item-separator')}>|</div>
            {tabs.map((tab) => (
              <Fragment key={tab.id}>
                <div onClick={() => switchTab(tab.id)} className={sn('t__item')}>
                  {tab.search}
                </div>
                <div className={sn('t__item-separator')}>|</div>
              </Fragment>
            ))}
            {canCreate && (
              <div onClick={() => createTab()} className={sn('t__item-create')}>
                + <span>Create new search tab</span>
              </div>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}
