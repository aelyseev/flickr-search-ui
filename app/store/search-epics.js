import {of} from 'rxjs/observable/of';
import {from} from 'rxjs/observable/from';
import {distinctUntilChanged} from 'rxjs/operators/distinctUntilChanged';
import {mergeMap} from 'rxjs/operators/mergeMap';
import {debounceTime} from 'rxjs/operators/debounceTime';
import {concatMap} from 'rxjs/operators/concatMap';
import {map} from 'rxjs/operators/map';
import {reduce} from 'rxjs/operators/reduce';
import {filter} from 'rxjs/operators/filter';
import {concat} from 'rxjs/operators/concat';

import {getPhotoIds, getPhotoById} from 'modules/flickr-api';

import {startRequest, finishRequest} from './network';
import {startSearch, appendSearch, getPage, getSearchQuery, setSearchMeta, addPhotos, setPhotos} from './search';
import {getApiKey} from './api';

const searchPipe = ({getState}, append = false) =>
  concatMap((query) =>
    of(startRequest()).pipe(
      concat(
        getPhotoIds(getApiKey(getState()), query, append ? getPage(getState()) + 1 : 1).pipe(
          concatMap(({page, pages, total, photo}) =>
            of(setSearchMeta(page, pages, total)).pipe(
              concat(
                from(photo).pipe(
                  mergeMap(({id, title}) =>
                    getPhotoById(getApiKey(getState()), id).pipe(
                      map((r) => ({id, title, sizes: r.sizes.size.filter(({width, height}) => width > 320 && height > 320)}))
                    )
                  ),
                  reduce((acc, photoInfo) => (photoInfo.sizes.length > 0 ? acc.concat(photoInfo) : acc), []),
                  map((r) => (append ? addPhotos(r) : setPhotos(r)))
                )
              )
            )
          )
        )
      ),
      concat(of(finishRequest()))
    )
  );

export const startSearchEpic = (action$, store) =>
  action$
    .ofType(startSearch)
    .pipe(
      map(() => getSearchQuery(store.getState())),
      distinctUntilChanged(),
      filter((query) => query.length > 2),
      searchPipe(store)
    );

export const appendSearchEpic = (action$, store) =>
  action$
    .ofType(appendSearch)
    .pipe(
      debounceTime(300),
      searchPipe(store, true)
    );
