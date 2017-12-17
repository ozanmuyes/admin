/* eslint-disable import/first */

import Vue from 'vue';
import Router from 'vue-router';

import bus from 'event/bus';
import {
  ROUTES_LOADED,
  NAVIGATED,
} from 'event/types';

import store from 'store';

import routes from './routes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  // base: '/me',
  routes,
});

router.beforeEach((to, from, next) => {
  /**
   * Check if user logged in; if not check if route is public [ASMR1]
   * Otherwise (user has logged in) check if route's roles contains user's role [ASMR2]
   * Emit event to notify TagsView in the dashboard of the admin panel [ASMR3]
   */

  // Call `next` with `return`
  if (store.getters.isLoggedIn) {
    // [ASMR2]
    if (to.meta.roles) {
      // the route requires some kind of authentication
      return next('/404');
    }
  } else {
    // [ASMR1]
    // eslint-disable-next-line no-lonely-if
    // if (to.meta.roles) {
    //   // search for user's role
    //   if (!to.meta.roles.includes(store.state.user.role)) {
    //     // Unauthorized (403) but respond with Not Found (404)
    //     return next('/404');
    //   }
    // }
    // eslint-disable-next-line no-lonely-if
    const requiresRole = to.matched.some(record => (record.meta && record.meta.roles));
    if (requiresRole) {
      // This route requires at least one role, and the user hasn't logged in
      return next({ name: 'login' });
    }

    // No `meta.roles`, so it is public.
    // Do nothing, let the flow care the rest...
  }

  // Let the component that listen that event register
  // the callback on their `mounted` life-cycle hook.

  bus.emitAsync(2, NAVIGATED, to); // TODO Test me if async emitting is necessary here (since \
  // ) there is another listener for it
  // setTimeout(() => {
  //   bus.emit(NAVIGATED, to);
  // }, 10);

  return next();
});

setTimeout(() => {
  bus.$emit(ROUTES_LOADED, routes); // TODO `routes` or `router.options.routes`???
}, 10);

export default router;
