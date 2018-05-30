/* eslint-disable react/prop-types,no-shadow,jsx-a11y/anchor-is-valid */
import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import InfiniteScroller from 'react-infinite-scroller';

import {getApiKey} from 'store/api';
import {
  appendSearch,
  getFilter,
  getPage,
  getPages,
  getPhotos,
  getSearchQuery,
  getSubmitted,
  getTabs,
  getTotal,
  setFilter,
  setSearchQuery,
  startSearch,
  createTab,
  switchTab
} from 'store/search';
import {getNetworkStatus} from 'store/network';
import {getFavorites} from 'store/favorites';

import Routes from 'constants/routes';

import key from 'assets/images/key.svg';

import {beautifyNumber} from 'lib/utils';

import Search from 'modules/components/search';
import Tabs from 'modules/components/tabs';
import Preview from 'modules/components/photos/preview';

import styleNames from 'modules/style-names';
import styles from './styles.scss';

const sn = styleNames(styles);

@connect(
  (state) => ({
    apiKey: getApiKey(state) || '',
    query: getSearchQuery(state),
    total: getTotal(state),
    photos: getPhotos(state),
    favorites: getFavorites(state),
    filter: getFilter(state),
    submitted: getSubmitted(state),
    requestInProgress: getNetworkStatus(state) === 0,
    page: getPage(state),
    pages: getPages(state),
    tabs: getTabs(state),
  }),
  {setFilter, setSearchQuery, startSearch, appendSearch, createTab, switchTab}
)
@withRouter
export default class Index extends React.Component {
  focus = (el) => {
    if (this.props.photos.length === 0) {
      el.focus();
    }
  };

  startSearch = () => {
    const {query, startSearch} = this.props;
    if (query.length > 2) {
      startSearch();
    }
  };

  componentWillReceiveProps(nextProps) {
    if ((nextProps.submitted === true && this.props.submitted === false) || nextProps.filter !== this.props.filter) {
      window.scrollTo(0, 0);
    }
  }

  getInfo() {
    const {requestInProgress, photos, total, submitted, query} = this.props;
    if (requestInProgress) {
      return 'Loading...';
    } else if (query && submitted && photos.length === 0) {
      return 'Nothing found, try to change query or switch filter';
    } else if (submitted && photos.length > 0) {
      return `${beautifyNumber(photos.length)} photos loaded, total approximately ${beautifyNumber(total)}`;
    }
    return '';
  }

  render() {
    const {
      location: {pathname},
      query,
      photos,
      favorites,
      filter,
      page,
      pages,
      setFilter,
      setSearchQuery,
      appendSearch,
      submitted,
      tabs,
      createTab,
      switchTab,
    } = this.props;
    const items = pathname === Routes.favorites ? favorites : photos;
    return (
      <div className={sn('c')}>
        <div className={sn('c__top')}>
          <div className={sn('c__search')}>
            <Search
              disabled={pathname === Routes.favorites}
              submitSearch={this.startSearch}
              setSearchQuery={setSearchQuery}
              setFilter={setFilter}
              filter={filter}
              focus={this.focus}
              query={query}
            />
          </div>
          <div className={sn('c__tabs')}>
            <Tabs createTab={createTab} switchTab={switchTab} canCreate={submitted} tabs={tabs} />
          </div>
          <div className={sn('c__search-info')}>{this.getInfo()}</div>
        </div>
        {items.length > 0 && (
          <InfiniteScroller loadMore={appendSearch} hasMore={page < pages && pathname === Routes.root}>
            <div className={sn('c__photos')}>
              {items.map((photo) => (
                <div data-id={photo.id} key={photo.id} className={sn('c__preview')}>
                  <Preview photo={photo} />
                </div>
              ))}
            </div>
          </InfiniteScroller>
        )}
        <div className={sn('c__credentials')}>
          <Link to={Routes.credentials}>
            <img width="16px" src={key} alt="app credentials" />
            <span>app credentials</span>
          </Link>
        </div>
      </div>
    );
  }
}
