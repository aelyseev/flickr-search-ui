/* eslint-disable import/no-extraneous-dependencies */
import freeze from 'deep-freeze-strict';

import search, {
  setSearchQuery,
  createTab,
  addPhotos,
  setPhotos,
  switchTab,
  deleteTab,
  setCount,
  setFilter,
  setSearchMeta,
  startSearch,
} from './search';

describe('app/store/search', () => {
  const tab1 = [{id: 11}, {id: 12}];
  const tab2 = [{id: 22}, {id: 23}];
  const initialState = undefined;
  const init = {type: '@@INIT'};
  describe('reducer ', () => {
    test(' should create store', () => {
      const state = search(initialState, init);
      expect(state).toMatchObject({tabs: {}, search: '', page: 0, pages: 0, total: 0, results: [], submitted: false, count: 0, filter: 0});
      expect(state.id).toBeDefined();
    });
  });
  describe('action ', () => {
    let state;
    beforeAll(() => {
      state = search(initialState, init);
      freeze(state);
    });
    test('setSearchQuery should set the active query', () => {
      const state2 = search(search(state, startSearch()), setSearchQuery('london'));
      expect(state2.search).toBe('london');
      expect(state2.submitted).toBe(false);
    });
    test('startSearch should set the submitted status to true', () => {
      expect(search(state, startSearch()).submitted).toBe(true);
    });
    test('setCount should set the count of photos', () => {
      expect(search(state, setCount('20')).count).toBe(20);
      expect(search(state, setCount(25)).count).toBe(25);
    });
    test('setFilter should set the filter', () => {
      expect(search(state, setFilter('20')).filter).toBe(20);
      expect(search(state, setFilter(25)).filter).toBe(25);
      expect(search(state, setFilter(null)).filter).toBe(0);
    });
    test('addPhotos should add photos', () => {
      const newState = search(state, addPhotos(tab1));
      const newState2 = search(newState, addPhotos(tab2));
      expect(newState2.results).toEqual(tab1.concat(tab2));
    });
    test('setPhotos should replace photos', () => {
      const state2 = search(state, addPhotos(tab1));
      const state3 = search(state2, addPhotos(tab2));
      const state4 = search(state3, setPhotos([{id: 334}, {id: 22211}]));
      expect(state4.results).toEqual([{id: 334}, {id: 22211}]);
    });
    test('setSearchMeta should set search meta', () => {
      const state2 = search(state, setSearchMeta(1, 100, 4666));
      expect(state2.page).toBe(1);
      expect(state2.pages).toBe(100);
      expect(state2.total).toBe(4666);
    });
    test('createTab should create tab', () => {
      const state2 = search(
        search(search(search(state, setSearchQuery('london')), setCount(100)), setSearchMeta(1, 100, 4666)),
        startSearch()
      );
      freeze(state2);
      const state3 = search(state2, createTab());
      expect(state2.id).not.toBe(state3.id);
      expect(state3.tabs).toMatchObject({[state2.id]: {search: 'london', page: 1, pages: 100, total: 4666, count: 100, submitted: true}});
      expect(state3.search).toBe('');
      expect(state3.submitted).toBe(false);
      expect(state3.page).toBe(0);
      expect(state3.pages).toBe(0);
      expect(state3.total).toBe(0);
      expect(state3.results).toEqual([]);
      expect(state3.id).toBeDefined();
      expect(state3.count).toBe(0);
      expect(state3.filter).toBe(0);
    });
    test('switchTab should switch tabs', () => {
      const state2 = search(
        search(search(search(search(state, setSearchQuery('london')), setCount(20)), setFilter(2000)), setSearchMeta(5, 50, 355)),
        startSearch()
      );
      freeze(state2);
      const state3 = search(state2, setPhotos(tab1));
      freeze(state3);
      const idLondon = state3.id;

      const state4 = search(state3, createTab());
      freeze(state4);
      const state5 = search(
        search(search(search(search(state4, setSearchQuery('new york')), setCount(30)), setFilter(1000)), setSearchMeta(6, 60, 266)),
        startSearch()
      );
      freeze(state5);
      const state6 = search(state5, setPhotos(tab2));
      freeze(state6);
      const idNewYork = state6.id;

      const state7 = search(state6, switchTab(idLondon));
      freeze(state7);
      expect(state7.search).toBe('london');
      expect(state7.submitted).toBe(true);
      expect(state7.page).toBe(5);
      expect(state7.pages).toBe(50);
      expect(state7.total).toBe(355);
      expect(state7.results).toEqual(tab1);
      expect(state7.id).toBe(idLondon);
      expect(state7.count).toBe(20);
      expect(state7.filter).toBe(2000);

      const state8 = search(state7, switchTab(idNewYork));
      expect(state8.search).toBe('new york');
      expect(state8.submitted).toBe(true);
      expect(state8.page).toBe(6);
      expect(state8.pages).toBe(60);
      expect(state8.total).toBe(266);
      expect(state8.results).toEqual(tab2);
      expect(state8.id).toBe(idNewYork);
      expect(state8.count).toBe(30);
      expect(state8.filter).toBe(1000);
    });

    test('deleteTab should create tab', () => {
      const state2 = search(state, setSearchQuery('london'));
      freeze(state2);
      const state3 = search(state2, addPhotos(tab1));
      freeze(state3);
      const idLondon = state3.id;

      const state4 = search(state3, createTab());
      freeze(state4);
      const state5 = search(state4, setSearchQuery('new york'));
      freeze(state5);
      const state6 = search(state5, addPhotos(tab2));
      freeze(state6);
      const idNewYork = state6.id;

      const state7 = search(state6, createTab());
      freeze(state7);
      const state8 = search(state7, deleteTab(idNewYork));
      freeze(state8);

      expect(state8.tabs).not.toHaveProperty(idNewYork);

      const state9 = search(state8, deleteTab(idLondon));
      expect(state9.tabs).not.toHaveProperty(idLondon);
    });
  });
});
