import React from 'react';
import PropTypes from 'prop-types';

import {noop} from 'lodash';

import styleNames from 'modules/style-names';
import styles from './styles.scss';

const sn = styleNames(styles);

export default function Input({label, name, value, disabled, onChange, error, touched, placeholder}) {
  return (
    <div className={sn('c')}>
      {label && <div className={sn('c__label')}>{label}</div>}
      <div>
        <input
          placeholder={placeholder}
          className={sn('input', {'input--error': !!error && touched})}
          name={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
        />
      </div>
      {!!error && touched && <div className={sn('c__error')}>{error}</div>}
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  placeholder: null,
  error: null,
  label: null,
  value: '',
  disabled: false,
  onChange: noop,
};
