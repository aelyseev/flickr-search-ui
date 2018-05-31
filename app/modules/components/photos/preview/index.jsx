/* eslint-disable react/require-default-props,jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {getIsPhotoInFavorites, addToFavorites, removeFromFavorites} from 'store/favorites';

import Portal from 'modules/components/portal';

import {sortBy} from 'lodash';

import styleNames from 'modules/style-names';
import styles from './styles.scss';

import Details from '../details';

const sn = styleNames(styles);

@connect(
  (state, props) => ({
    inFavorites: getIsPhotoInFavorites(state, props),
  }),
  {addToFavorites, removeFromFavorites}
)
export default class Preview extends React.Component {
  static propTypes = {
    removeFromFavorites: PropTypes.func,
    addToFavorites: PropTypes.func,
    inFavorites: PropTypes.bool,
    photo: PropTypes.shape({
      title: PropTypes.string,
      sizes: PropTypes.array,
    }).isRequired,
  };

  state = {preview: false};

  openPreview = () => {
    this.setState({preview: true});
  };

  closePreview = () => {
    this.setState({preview: false});
  };

  image = null;

  componentDidMount() {
    const {photo} = this.props;
    const preview = photo.sizes[0];
    const previewImage = new Image();
    previewImage.src = preview.source;

    previewImage.onload = () => {
      if (this.image) {
        this.image.style.backgroundImage = `url(${preview.source})`;
      }
    };
  }

  componentWillUnmount() {
    this.image = null;
  }

  render() {
    const {photo, inFavorites} = this.props;
    const maxSize = sortBy(photo.sizes, ({width, height}) => width + height).pop();
    return (
      <div className={sn('p')}>
        <div
          ref={(el) => {
            this.image = el;
          }}
          onClick={this.openPreview}
          className={sn('p__photo')}
        />
        <div
          onClick={() => (inFavorites ? this.props.removeFromFavorites(photo) : this.props.addToFavorites(photo))}
          className={sn('p__fav')}
        >
          {inFavorites ? 'Remove from favorites' : 'Add to favorites'}
        </div>
        <div className={sn('p__desc')}>{photo.title}</div>
        <Portal visibility={this.state.preview} requestToClose={this.closePreview}>
          <Details title={photo.title} source={maxSize.source} url={maxSize.url} />
        </Portal>
      </div>
    );
  }
}
