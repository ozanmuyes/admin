/* eslint-disable no-console */

import { READY_FOR_SIDEBAR_ROUTES } from 'event/types';
import store from 'store';
import reduce from 'router/for/sidebar';

function initialize(bus) {
  bus.$once(READY_FOR_SIDEBAR_ROUTES, (routes) => {
    console.log(`Sidebar routes calculated at ${(+new Date())}`);
    // console.log(`Sidebar routes calculated ${(+new Date()) - global.lastFinishTime} msecs.`);
    // global.lastFinishTime = (+new Date());

    store.commit('SET_SIDEBAR_ROUTES', { routes: reduce(routes) });
  });
}

export default initialize;
