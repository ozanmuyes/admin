/* eslint-disable */

// TODO While persisting secure the data that has been persisting
//      by hashing the state object that will be persisted.
//      And on the load check the hash with the loaded
//      data's hash which was calculated.

import merge from 'deepmerge';
import shvl from 'shvl';

const createLocalState = (options, storage, key) => {
  options = options || {};
  storage = options.storage || (window && window.localStorage);
  key = options.key || 'vuex';

  function canWriteStorage(storage) {
    try {
      storage.setItem('@@', 1);
      storage.removeItem('@@');
      return true;
    } catch (e) {}

    return false;
  }

  function getState(key, storage, value) {
    try {
      return (value = storage.getItem(key)) && value !== 'undefined'
        ? JSON.parse(value)
        : undefined;
    } catch (err) {}

    return undefined;
  }

  function filter() {
    return true;
  }

  function setState(key, state, storage) {
    return storage.setItem(key, JSON.stringify(state));
  }

  function reducer(state, paths) {
    return paths.length === 0
      ? state
      : paths.reduce(function(substate, path) {
          return shvl.set(substate, path, shvl.get(state, path));
        }, {});
  }

  function subscriber(store) {
    return function(handler) {
      return store.subscribe(handler);
    };
  }

  if (!canWriteStorage(storage)) {
    throw new Error('Invalid storage instance given');
  }

  return function(store) {
    const savedState = shvl.get(options, 'getState', getState)(key, storage);

    if (typeof savedState === 'object' && savedState !== null) {
      store.replaceState(merge(store.state, savedState, {
        arrayMerge: (store, saved) => saved,
        clone: false,
      }));

      if (typeof options.callback === 'function') {
        options.callback.call(this);
      }
    }

    (options.subscriber || subscriber)(store)(function(mutation, state) {
      if ((options.filter || filter)(mutation)) {
        (options.setState || setState)(
          key,
          (options.reducer || reducer)(state, options.paths || []),
          storage
        );
      }
    });
  };
};

export default createLocalState;
