import React from 'react';
import PropTypes from 'prop-types';

import styleNames from 'modules/style-names';
import styles from './styles.scss';

const sn = styleNames(styles);

export default function Details({title, source, url}) {
  return (
    <div className={sn('d')}>
      <div className={sn('d__img')}>
        <img alt={title} src={source} />
      </div>
      <div className={sn('d__title')}>{title}</div>
      <div className={sn('d__url')}><a target="_blank" href={url}>Original</a></div>
    </div>
  );
}

Details.propTypes = {
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};
