import React from 'react';
import PropTypes from 'prop-types';

import Input from 'modules/components/form/input';

export default function InputContainer({label, disabled, placeholder, input: {name, value, onChange}, meta: {error, touched}}) {
  return (
    <Input
      name={name}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      label={label}
      onChange={onChange}
      error={error}
      touched={touched}
    />
  );
}

InputContainer.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  input: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    value: PropTypes.string
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool
  }).isRequired
};

InputContainer.defaultProps = {
  disabled: false,
  label: null,
  placeholder: null,
};
