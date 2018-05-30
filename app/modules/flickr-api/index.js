/* eslint-disable prefer-template */
import {fromPromise} from 'rxjs/observable/fromPromise';

const URL = 'https://api.flickr.com/services/rest/';

export const PER_PAGE = 30;

const buildRequestUrl = (params) =>
  `${URL}?` +
  Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');

const request = (url) =>
  fetch(url, {credentials: 'same-origin'})
    .then((response) => response.json())
    .then((response) => {
      if (response.stat === 'ok') {
        return Promise.resolve(response);
      }
      throw Error(JSON.stringify(response));
    });

export const getPhotoIds = (apiKey, query, page) =>
  fromPromise(
    request(
      buildRequestUrl({
        api_key: apiKey,
        format: 'json',
        nojsoncallback: 1,
        text: query,
        sort: 'relevance',
        method: 'flickr.photos.search',
        per_page: PER_PAGE,
        content_type: 1,
        page
      })
    ).then(response => response.photos)
  );

export const getPhotoById = (apiKey, id) =>
  fromPromise(
    request(
      buildRequestUrl({
        api_key: apiKey,
        photo_id: id,
        format: 'json',
        nojsoncallback: 1,
        method: 'flickr.photos.getSizes',
      })
    )
  );
