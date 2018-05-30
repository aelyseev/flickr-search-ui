import React from 'react';
import PropTypes from 'prop-types';
import styleNames from 'modules/style-names/index';
import styles from './generic-icon.scss';

const sn = styleNames(styles);

export default function GenericIcon({
    width, height, path, transform
}) {
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g className={sn('generic-icon__paths-group')} transform={transform}>
          {mapPath(path, (d, key) => <path d={d} key={key} />)}
        </g>
      </svg>
    );
}

GenericIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    transform: PropTypes.string
};

GenericIcon.defaultProps = {
    transform: null
};

function mapPath(path = '', mapper) {
    // Split into lines. Each line is interpreted as separate path.
    return path.split(/[\r\n]+/).filter(Boolean).map(mapper);
}
