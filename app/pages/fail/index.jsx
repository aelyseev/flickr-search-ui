import React from 'react';

import styleNames from 'modules/style-names';
import styles from './styles.scss';

const sn = styleNames(styles);

export default function Fail() {
  return (
    <div className={sn('f')}>
      <p>
        <span role="img" aria-label="fatal error">
          💥💥💥
        </span>
      </p>
      <p>
        Something bad happened, that{"'"}s it, what I can to say. Please, report an issue, and it will be fixed. Sorry for the
        inconvenience.
      </p>
    </div>
  );
}
