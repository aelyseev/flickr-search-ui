/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {Component} from 'react';
import {noop} from 'lodash';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';

import {doc} from 'lib/browser/index';
import {KEY_CODES} from 'lib/keyboard/index';

import styleNames from 'modules/style-names/index';
import styles from 'modules/components/portal/styles.scss';

const sn = styleNames(styles);
const modalRootElement = doc.getElementById('modal');

const bodyNoScroll = sn('portal__no-scroll');

const addNoScroll = () => {
  doc.body.classList.add(bodyNoScroll);
};

const removeNoScroll = () => {
  doc.body.classList.remove(bodyNoScroll);
};

export default class Portal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    requestToClose: PropTypes.func,
    visibility: PropTypes.bool,
  };

  static defaultProps = {
    requestToClose: noop,
    visibility: false,
  };

  keyHandler = (e) => {
    if (e.keyCode === KEY_CODES.ESC) {
      this.props.requestToClose();
    }
  };

  clickHandler = (e) => {
    if (e.target === e.currentTarget) {
      this.props.requestToClose();
    }
  };

  content() {
    return (
      <div onClick={this.clickHandler} className={sn('portal__overlay')}>
        <div className={sn('portal__content')}>{this.props.children}</div>
      </div>
    );
  }

  componentDidMount() {
    doc.body.addEventListener('keydown', this.keyHandler);
  }

  componentWillUnmount() {
    removeNoScroll();
    doc.body.removeEventListener('keydown', this.keyHandler);
  }

  render() {
    const {visibility} = this.props;
    if (visibility) {
      addNoScroll();
    } else {
      removeNoScroll();
    }
    return visibility === true ? createPortal(this.content(), modalRootElement) : null;
  }
}
