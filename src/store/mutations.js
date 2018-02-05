/* eslint-disable no-param-reassign, camelcase */

import * as types from './mutation-types';
import emptyState from './state';

export default {
  // auth
  //
  [types.SET_TOKENS](state, payload) {
    state.user.access_token = payload.access_token;
    state.user.refresh_token = payload.refresh_token;
  },
  [types.SET_USER](state, payload) {
    // TODO Maybe do NOT use `Object.assign`
    state.user = Object.assign(state.user, payload);
  },
  [types.UPDATE_ACCESS_TOKEN](state, { access_token }) {
    state.user.access_token = access_token;
  },
  [types.LOGOUT](state) {
    state.user = emptyState.user; // FIXME Get empty object - NOT a reference to it
  },

  // app
  //
  [types.SET_SIDEBAR_ROUTES](state, { routes }) {
    state.app.sidebarRoutes = routes;
  },
  [types.UPDATE_BREADCRUMBS](state, { breadcrumbs }) { // [USSTRNSTD]
    state.app.breadcrumbs = breadcrumbs;
  },
  [types.TOGGLE_SIDEBAR](state) {
    state.app.hasSidebarOpened = !state.app.hasSidebarOpened;
  },
  [types.CHANGE_BREAKPOINT](state, payload) {
    state.app.breakpoint = payload.breakpoint;
  },
};
