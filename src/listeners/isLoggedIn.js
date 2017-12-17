import {
  LOCAL_STATE_LOADED,
  USER_LOGGED_IN,
} from 'event/types';
import store from 'store';

function isLoggedIn(bus) {
  if (store.getters.isLoggedIn) {
    bus.$emit(USER_LOGGED_IN);
  }
}

function initialize(bus) {
  bus.$on(LOCAL_STATE_LOADED, (/* ...params */) => {
    setTimeout(() => {
      isLoggedIn(bus /* , params */);
    }, 10);
  });
}

export default initialize;
