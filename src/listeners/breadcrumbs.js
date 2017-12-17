/* eslint-disable no-continue */

import {
  NAVIGATED,
  // UPDATE_BREADCRUMBS, // [USSTRNSTD]
} from 'event/types';
// import reduce from 'router/for/breadcrumbs';

import store from 'store'; // [USSTRNSTD]
import { UPDATE_BREADCRUMBS } from 'store/mutation-types'; // [USSTRNSTD]

function initialize(bus) {
// debugger;
  bus.$on(NAVIGATED, (to) => {
    const breadcrumbs = [];
// debugger;
    const matchings = to.matched;
    let match = null;

    for (let i = 0; i < matchings.length; i += 1) {
      // Items of the `matchings` are route records with 'component',
      // 'beforeEnter' etc. Leave them be or reduce them. Think
      // performance-wise, not code elegance.

      match = {
        name: matchings[i].name,
        path: matchings[i].path,
        meta: { ...matchings[i].meta },
      };

      if (match.path === '' || !match.meta) {
        continue;
      }

      if (
        typeof match.name === 'undefined' ||
        to.path === match.path ||
        match.path.indexOf(':') > -1
        // Add other conditions
      ) {
        match.path = '';
      }

      // TODO Add other filters

      breadcrumbs.push(match);
    }

    if (breadcrumbs.length > 0) {
      if (!(breadcrumbs[0].meta) || breadcrumbs[0].meta.name !== 'dashboard') {
        breadcrumbs.splice(0, 0, { // TODO Get that record from 'router/routes' due to 'meta.roles`
          path: '/',
          meta: {
            title: 'dashboard',
            from: 'reducer',
          },
        });
      }

      // bus.emitAsync(10, UPDATE_BREADCRUMBS, breadcrumbs); // [USSTRNSTD]: use store instead
      store.commit(UPDATE_BREADCRUMBS, { breadcrumbs });
    }
  });
}

export default initialize;
