import React from 'react';
import PropTypes from 'prop-types';

import styleNames from 'modules/style-names';
import styles from './styles.scss';

const sn = styleNames(styles);

export default function Details({photo}) {
  const view = photo.sizes.slice().pop();
  return (
    <div className={sn('d')}>
      <div className={sn('d__img')}>
        <img alt={photo.title} src={view.source} />
      </div>
      <div className={sn('d__title')}>{photo.title}</div>
      <div className={sn('d__url')}><a target="_blank" href={view.url}>Original</a></div>
    </div>
  );
}

Details.propTypes = {
  photo: PropTypes.object.isRequired
};
