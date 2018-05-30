/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {Field, Form} from 'react-final-form';
import createDecorator from 'final-form-focus';

import {isEmpty, noop} from 'lodash';

import {getApiKey, getApiSecret, getApiUser, setApiCredentials} from 'store/api';
import Routes from 'constants/routes';

import Button from 'modules/components/form/button';

import logo from 'assets/images/logo.svg';
import styleNames from 'modules/style-names';
import styles from './styles.scss';

import InputField from './input-contaiter';

const sn = styleNames(styles);
const focusOnError = createDecorator();

const validate = (values) =>
  ['apiKey', 'secret', 'user'].reduce((errors, field) => (isEmpty(values[field]) ? {...errors, [field]: 'Required'} : errors), {});

@connect((state) => ({apiKey: getApiKey(state), secret: getApiSecret(state), user: getApiUser(state)}), {
  setCredentials: setApiCredentials,
})
export default class Credentials extends Component {
  static propTypes = {
    apiKey: PropTypes.string,
    secret: PropTypes.string,
    user: PropTypes.string,
    setCredentials: PropTypes.func,
  };

  static defaultProps = {
    apiKey: '',
    user: '',
    secret: '',
    setCredentials: () => null,
  };

  pauseValidation = noop;

  onSubmit = (values) => {
    this.props.setCredentials(values);
  };

  componentWillUnmount() {
    this.pauseValidation();
  }

  render() {
    const {apiKey, secret, user} = this.props;
    return (
      <div className={sn('c')}>
        {apiKey && (
          <div className={sn('c__logo')}>
            <Link title="main page" to={Routes.root}>
              <img src={logo} alt="logo" /> {"Let's exlore the Flickr!"}
            </Link>
          </div>
        )}
        <Form
          initialValues={{apiKey, secret, user}}
          onSubmit={this.onSubmit}
          decorators={[focusOnError]}
          validate={validate}
          render={({handleSubmit, form: {reset, pauseValidation}, pristine}) => {
            this.pauseValidation = pauseValidation;
            return (
              <form onSubmit={handleSubmit}>
                <div className={sn('c__desc')}>
                  To make app work, please provide the app credentials. You can create an app{' '}
                  <a title="Create a flickr application" href="https://www.flickr.com/services/apps/create/">
                    here
                  </a>.
                </div>
                <div className={sn('c__line')}>
                  <Field name="apiKey" label="Key" component={InputField} />
                </div>
                <div className={sn('c__line')}>
                  <Field name="secret" label="Secret" component={InputField} />
                </div>
                <div className={sn('c__line')}>
                  <Field name="user" label="User id" component={InputField} type="text" />
                </div>
                <div className={sn('c__buttons')}>
                  <Button disabled={pristine} isSubmit label="Save" bStyle="primary" />
                  <Button disabled={pristine} onClick={reset} label="Reset" />
                </div>
              </form>
            );
          }}
        />
      </div>
    );
  }
}
