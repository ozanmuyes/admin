/* eslint-disable max-len */

// TODO Export the gateway instance from this

// NOTE Do NOT all-import and then export, every file stands
//      for itself. This means, for example, the API file
//      for 'auth' MUST be imported like;
//      `import authApi from 'api/auth'`

import axios from 'axios';

import store from 'store';
import { UPDATE_ACCESS_TOKEN } from 'store/mutation-types';

// See https://github.com/axios/axios#request-config
const config = {
  // TODO Get this (baseURL) from the store
  baseURL: process.env.API_BASE, // 'http://localhost:8765/api',
  headers: {
    Accept: 'application/json',
    // Do NOT set Authorization header here - see below request interceptor
  },
};

const api = axios.create(config);

// Set Authorization header via a request interceptor,
// since the access token might change over time.
api.interceptors.request.use(
  (requestConfig) => {
    /* eslint-disable no-param-reassign */

    if (process.env.NODE_ENV === 'development') {
      if (!requestConfig.params) {
        requestConfig.params = {};
      }

      requestConfig.params.XDEBUG_SESSION_START = 'PHPSTORM';
    }

    requestConfig.headers.Authorization = `Bearer ${store.state.user.access_token}`;

    // if req has body
    if (requestConfig.data && Object.getOwnPropertyNames(requestConfig.data).length > 0) {
      requestConfig.headers['Content-Type'] = 'application/json; charset=utf-8';
    }

    return requestConfig;
    /* eslint-enable no-param-reassign */
  },
  error => Promise.reject(error),
);

// TODO Extract this to its own file and use this import path
//      wherever importing this module just for this method.
export function onConnectionErrored(error, callback) { // TODO Change its name
  const originalRequest = error.config;

  return new Promise((resolve, reject) => {
    // NOTE Catch generic (axios-related) errors here
    if (error.message) {
      // TODO Check here if its working
      switch (error.message) {
        case 'Network Error': {
          reject(new Error('Network Error', (error.stack || [])));
          return;
        }

        default:
          // NOTE See below - nothing to do here
          // reject(error); // [GNRCRRR]
          // return;
      }
    }

    if (
      (error.response && error.response.status) ||
      (typeof error === 'object' && !Array.isArray(error) && error.isSynthetic === true)
    ) { // TODO Add synthetic HTTP status errors
      switch (error.response.status) {
        case 403: {
          // TODO Maybe check for `data` and subsequent keys existence
          if (error.response.data.error.code === '13') {
            // Get anew access_token via refresh_token
            api.patch('/token', {
              access_token: store.state.user.access_token,
              refresh_token: store.state.user.refresh_token,
            })
              .then((refreshResponse) => {
                // Store the new access_token in to the store
                store.commit(UPDATE_ACCESS_TOKEN, { access_token: refreshResponse.access_token });

                if (error.isSynthetic) {
                  if (typeof callback === 'function') {
                    // TODO Call the `callback`
                    callback(refreshResponse.access_token); // TODO TEST [WSMSTRFRSHTKNNDRTRYLGN-1]: web socket must refresh the token and retry login
                  } else {
                    // TODO Maybe emit a timed event on bus (i.e. ACCESS_TOKEN_REFRESHED)
                  }

                  resolve(); // TODO Find out if passing smth is necessary
                } else {
                  // Replay the last request
                  originalRequest.headers.Authorization = `Bearer ${refreshResponse.access_token}`;
                  resolve(api(originalRequest));
                }
              })
              // TODO Error occured while refreshing the token - what to do?
              .catch(errorRefresh => reject(errorRefresh));
          }

          // NOTE Check other HTTP status codes here (e.g. 401, 404)

          break;
        }

        default:
          // NOTE Unhandled HTTP status code
          reject(error); // [GNRCRRR]: generic error
      }
    } else {
      reject(error); // [GNRCRRR]
    }
  });
}

// Check if there is an error related with token
// See https://gist.github.com/Culttm/a8c3ca85032c4b0cc67037425f150c44
// FIXME Big time!!! handle connectivity errors, server-sent errors etc. \
//       e.g. if the server is not running handle connection error
api.interceptors.response.use(
  response => response, // Since there is no error
  error => onConnectionErrored.call(this, error),
);

// Get the payload from the response
api.interceptors.response.use(
  (response) => {
    // Since there is no error
    if (response.config && response.config.deleteExtras === false) {
      return response;
    }

    const payloadData = { ...response.data.data };
    // delete response.data.data;
    // const payload = { ...response.data };
    // delete response.data;
    // // the `response` from Axios. it left with `config`, `headers` etc. now
    // debugger;
    // // Reversed order // ~[DNTNSTSBLNG]
    // payload.axios = response;
    // payloadData.response = payload;
    // // TODO Make this proxy so when assigned to another object return only the properties \
    // //      except 'response' and 'axios'. This is useful for [API_call].then((foo) => {bar = foo;})
    return payloadData;

    // return { // ~[DNTNSTSBLNG]: do not nest, use sibling
    //   payload: payloadData,
    //   response: payload,
    //   axios: response,
    // };
  },
  // eslint-disable-next-line
  (error) => {
    // TODO What todo when there is an `error`

    // For now forward the `error`
    throw error;
  },
);

export default api;
