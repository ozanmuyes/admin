function reduce(routes) {
  /* eslint-disable no-continue */

  const reduced = [];

  let route = null;
  let tmp = null;
  let tmp2 = null;

  for (let i = 0; i < routes.length; i += 1, route = null) {
    route = { ...routes[i] };

    if (!route.meta) {
      continue;
    }

    // Clean-up
    delete route.component;
    delete route.beforeEnter;

    // Check children first, even though path has ':'
    if (route.children) {
      tmp = reduce(route.children);
      delete route.children;

      if (tmp.length > 0 && route.path) {
        // TODO Check if `route.path` includes ':' (and also if has 1 child)

        if (tmp.length === 1) {
          route.meta.title = tmp[0].meta.title;
          //
        } else {
          // route has sidebar compatible child/children
          tmp2 = { ...route };
          tmp2.meta = { ...route.meta };

          tmp2.path = '';
          tmp2.meta.title = (tmp2.meta.subtitle || 'WARN: Subtitle is necessary in those situations');
          delete tmp2.meta.subtitle;

          // If the route is just a layout route, then
          // the first child acts as a link to it
          route.children = (tmp[0].path === '')
            ? tmp
            : [tmp2, ...tmp];

          // TODO tmp'e children'sız vs. kendini ekle
          // çünkü children'ı olduğu zaman link değil aç/kapa butonu oluyor,
          // kendisinin children'larına kendisini eklemezsek o path'e
          // ulaşılamaz. hatta tercihen ilk çocuk olarak eklenecek.
        }
      }
    }

    // If the `routes` were the VueRouter's routes - in order to
    // get rid off Vue's interactivity watchers
    // reduced.push(route.slice());

    if (route.redirect) {
      route.path = route.redirect;
      delete route.redirect;
    }

    if (route.path.indexOf(':') > -1) {
      continue;
    }

    if (route.meta.isHidden) {
      continue;
    }

    // TODO Add other conditions to premature break the loop
    //

    reduced.push(route);
  }

  reduced.sort((lhs, rhs) => {
    const lhsIndex = ((lhs.meta && lhs.meta.index) || null);
    const rhsIndex = ((rhs.meta && rhs.meta.index) || null);
    const difference = lhsIndex - rhsIndex;

    if (difference > 0) {
      return 1; // TODO TR yer değiştirmeleri lazım
    }
    // else - else if (difference <0 && difference === 0)
    return -1;
  });

  return reduced;

  /* eslint-enable no-continue */
}

export default reduce;
