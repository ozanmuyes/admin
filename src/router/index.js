/* eslint-disable import/first */

import Vue from 'vue';
import Router from 'vue-router';

import bus from 'event/bus';
import {
  ROUTES_LOADED,
  NAVIGATE,
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
    // if (to.meta.roles) {
    //   // the route requires some kind of authentication
    //   return next({ name: 'login' });
    // }
  } else {
    // [ASMR1]
    // eslint-disable-next-line no-lonely-if
    if (to.meta.roles) {
      // search for user's role
      if (!to.meta.roles.includes(store.state.user.role)) {
        // Unauthorized (403) but respond with Not Found (404)
        return next('/404');
      }
    }

    // No `meta.roles`, so it is public.
    // Do nothing, let the flow care the rest...
  }

  bus.emit(NAVIGATE, to);

  return next();
});

setTimeout(() => {
  bus.$emit(ROUTES_LOADED, routes); // TODO `routes` or `router.options.routes`???
}, 10);

export default router;