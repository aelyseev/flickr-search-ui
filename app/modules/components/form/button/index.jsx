import React from 'react';
import PropTypes from 'prop-types';

import styleNames from 'modules/style-names';
import styles from './styles.scss';

const sn = styleNames(styles);

export default function Button({label, isSubmit, disabled, onClick, bStyle}) {
  return (
    <button
      className={sn('b', {'b--primary': bStyle === 'primary', 'b--disabled': disabled})}
      disabled={disabled}
      onClick={onClick}
      type={isSubmit ? 'submit' : 'button'}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  bStyle: PropTypes.oneOf(['basic', 'primary']),
  isSubmit: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  isSubmit: false,
  bStyle: 'basic',
  disabled: false,
  onClick: null,
};
