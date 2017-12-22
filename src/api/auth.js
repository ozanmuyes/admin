// TODO Import the gateway instance

// TODO The object (or the class) SHOULD contain these methods; \
//      `login`, `logout` and `getUserInfo` where they make
//      these API calls respectively; 'POST /api/token',
//      'DELETE  /api/token' and 'GET /users/:userId'
//      with access token in Authorization header.

// Return/resolve the successful result, do nothing here further
// API methods doesn't do anything with the store and doesn't
// emit any events. The are primarily called from event
// listener. FIXME Burası doğru mu?
// An API function MAY return a Promise (async function).

import api from './';

export async function login({ email, password } /* credentials */) {
  return new Promise((resolve, reject) => {
    // Login by creating a new token on the back-end
    api.post('/token', {
      email,
      password,
      for: 'app://yeppa-front', // TODO Get that from configuration or somewhere similar
    })
      .then((tokenData) => {
        // commit(SET_TOKENS, tokenData);
        resolve(tokenData);
      })
      .catch((error) => {
        // Leave the auth information of the user intact,
        // let the caller of the action handle the error
        reject(error);
      });
  });
}

export function getUserInfo(userId) {
  // This SHOULD return a Promise (which the caller is going to handle resolve/error)
  return api.get(`/users/${userId}`);
}

export function setPassword(userId, password) {
  return api.patch(`/users/${userId}`, {
    password,
  });
}
