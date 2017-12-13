import { READY_FOR_SIDEBAR_ROUTES } from 'event/types';
import store from 'store';
import reduce from 'router/for/sidebar';

function initialize(bus) {
  bus.$once(READY_FOR_SIDEBAR_ROUTES, (routes) => {
    store.commit('SET_SIDEBAR_ROUTES', { routes: reduce(routes) });
  });
}

export default initialize;
