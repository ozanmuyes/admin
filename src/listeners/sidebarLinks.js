import { READY_FOR_SIDEBAR_ROUTES } from 'event/types';
import store from 'store';
import reducerForSidebar from 'router/reducers/sidebar';

function initialize(bus) {
  bus.$once(READY_FOR_SIDEBAR_ROUTES, (routes) => {
    store.commit('SET_SIDEBAR_ROUTES', { routes: reducerForSidebar(routes) });
  });
}

export default initialize;
