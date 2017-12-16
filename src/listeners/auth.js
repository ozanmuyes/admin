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
  let userInfo = null;

  try {
    const tokens = await login({ email, password });

    store.commit(SET_TOKENS, {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });

    userId = tokens.user_id;
  } catch (error) {
    return Promise.reject({
      title: 'Login Error',
      message: 'E-mail and password doesn\'t match.',
      error,
    });
  }

  try {
    const userInfoResponse = await getUserInfo(userId);
    userInfo = userInfoResponse.data;

    store.commit(SET_USER, userInfo);
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
  // bus.on(TRY_USER_LOGIN, async (...params) => {
  //   try {
  //     await tryToLogUserIn(bus, ...params);
  //   } catch (error) {
  //     bus.$emit(LOGIN_ERROR, error);

  //     return;
  //   }

  //   // since the user has logged in we can unlisten the event
  //   bus.off(TRY_USER_LOGIN);

  //   bus.emit(USER_LOGGED_IN);

  //   // FIXME Ensure there is no other place does this redirection
  //   router.replace({ name: 'app.index' });
  // });
  bus.on(TRY_USER_LOGIN, (...params) => {
    tryToLogUserIn(...params)
      .then(() => {
        // since the user has logged in we can unlisten the event
        bus.off(TRY_USER_LOGIN);

        bus.emit(USER_LOGGED_IN);

        // FIXME Ensure there is no other place does this redirection
        router.replace({ name: 'app.index' });
      })
      .catch(error => bus.$emit(LOGIN_ERROR, error));
  });
}
