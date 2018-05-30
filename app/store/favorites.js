import {createAction, handleActions} from 'redux-actions';
import {createSelector} from 'reselect';
import {namespace} from 'store/utils';

export const NAMESPACE = 'FAVORITES';

const type = namespace(NAMESPACE);

export const addToFavorites = createAction(type('add.to.favorites'));
export const removeFromFavorites = createAction(type('remove.from.favorites'));

const reducer = handleActions(
  {
    [addToFavorites](state, {payload}) {
      return state.concat(payload);
    },
    [removeFromFavorites](state, {payload}) {
      return state.filter((photo) => photo.id !== payload.id);
    },
  },
  []
);

export default reducer;

export const getFavorites = (state) => state.favorites;
const getPhoto = (state, props) => props.photo;
export const getIsPhotoInFavorites = createSelector(
  getFavorites, getPhoto,
  (favorites, photo) => favorites.find((f) => f.id === photo.id) !== undefined
);
