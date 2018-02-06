import {
  TRY_USER_LOGIN,
  USER_LOGGED_IN,
  LOGIN_ERROR,
} from 'event/types';

import {
  login,
  getUserInfo,
} from 'api/auth';

import {
  SET_TOKENS,
  SET_USER,
} from 'store/mutation-types';
import store from 'store';

import router from 'router';

async function tryToLogUserIn({ email, password }) {
  let userId = -1;

  try {
    const tokens = await login({ email, password });

    store.commit(SET_TOKENS, {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });

    userId = tokens.user_id;
  } catch (error2) {
    return Promise.reject({
      title: 'Login Error',
      message: 'E-mail and password doesn\'t match.',
      error2,
    });
  }

  try {
    const userInfoResponse = await getUserInfo(userId);

    store.commit(SET_USER, userInfoResponse);
  } catch (error) {
    return Promise.reject({
      title: 'Login Error',
      message: 'E-mail and password doesn\'t match.',
      error,
    });
  }

  return Promise.resolve();
}

export default function initialize(bus) {
  bus.on(TRY_USER_LOGIN, (...params) => {
    tryToLogUserIn(...params)
      .then(() => {
        // since the user has logged in we can unlisten the event
        bus.off(TRY_USER_LOGIN);

        bus.emit(USER_LOGGED_IN);

        // FIXME Ensure there is no other place does this redirection
        router.replace({ name: 'index' });
      })
      .catch(error => bus.$emit(LOGIN_ERROR, error));
  });
}
