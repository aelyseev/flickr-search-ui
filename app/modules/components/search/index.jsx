import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {noop} from 'lodash';

import styleNames from 'modules/style-names';
import styles from './styles.scss';

const sn = styleNames(styles);

export default class Search extends React.Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    filter: PropTypes.number.isRequired,
    setSearchQuery: PropTypes.func,
    submitSearch: PropTypes.func,
    focus: PropTypes.func,
    setFilter: PropTypes.func,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    setFilter: noop,
    setSearchQuery: noop,
    submitSearch: noop,
    focus: noop,
    disabled: false,
  };

  submit = e => {
    this.props.submitSearch();
    e.preventDefault();
  };

  componentDidMount() {
    this.props.focus(this.input);
  }

  render() {
    const {query, setSearchQuery, filter, setFilter, submitSearch, disabled} = this.props;
    return (
      <Fragment>
        <div>
          <form onSubmit={this.submit}>
            <input
              ref={(el) => {
                this.input = el;
              }}
              disabled={disabled}
              className={sn('s__input')}
              spellCheck="false"
              type="text"
              value={query}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={submitSearch}
            />
          </form>
        </div>
        <div className={sn('s__filter')}>
          {[0, 1000, 2000, 4000].map(size => (
            <Fragment key={size}>
              <div className={sn('s__filter-v')}>
                <input disabled={disabled} onChange={() => setFilter(size)} checked={filter === size} type="radio" name="filter" />
              </div>
              <div className={sn('s__filter-l')}>{size === 0 ? 'all photos' : `${size}+`}</div>
            </Fragment>
          ))}
        </div>
      </Fragment>
    );
  }
}
