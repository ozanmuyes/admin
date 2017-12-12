/* eslint-disable no-param-reassign, camelcase */

import * as types from './mutation-types';
import emptyState from './state';

export default {
  // auth
  //
  [types.SET_USER](state, payload) {
    // TODO Maybe do NOT use `Object.assign`
    state.user = Object.assign(state.user, payload);
  },
  [types.LOGOUT](state) {
    state.user = emptyState.user;
  },

  // app
  //
  [types.SET_SIDEBAR_ROUTES](state, { routes }) {
    state.app.sidebarRoutes = routes;
  },
};
