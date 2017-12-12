/* eslint-disable import/first */

import Vue from 'vue';
import Router from 'vue-router';

import bus from 'event/bus';
import { ROUTES_LOADED } from 'event/types';

import routes from './routes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  // base: '/me',
  routes,
});

console.log(router.options.routes);
setTimeout(() => {
  bus.$emit(ROUTES_LOADED, routes); // TODO `routes` or `router.options.routes`???
}, 10);

export default router;
