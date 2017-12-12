function reduce(routes) {
  // const sortedRoutes = routes.slice();
  // sortedRoutes.sort((lhs, rhs) => {
  //   const lhsIndex = ((lhs.meta && lhs.meta.index) || null);
  //   const rhsIndex = ((rhs.meta && rhs.meta.index) || null);
  //   const difference = lhsIndex - rhsIndex;

  //   if (difference > 0) {
  //     return -1; // TODO TR yer değiştirmeleri lazım
  //   }
  //   // else - else if (difference <0 && difference === 0)
  //   return 1;
  // });

  const reduced = [];

  let route = null;
  let tmp = null;
  let tmp2 = null;
  // for (let i = 0; i < sortedRoutes.length; i += 1) {
  //   route = { ...sortedRoutes[i] };
  for (let i = 0; i < routes.length; i += 1, route = null) {
    route = { ...routes[i] };

    // Clean-up
    delete route.component;
    delete route.beforeEnter;
// debugger;
    // Check children first, even though path has ':'
    if (route.children) {
      tmp = reduce(route.children);
      delete route.children;

      if (tmp.length > 0 && route.path) {
        // route has sidebar compatible child/children
        tmp2 = { ...route };
        tmp2.meta = { ...route.meta };

        // tmp2.path = tmp2.path.replace(/^\//, '');
        tmp2.path = '';
        tmp2.meta.title = (tmp2.meta.subtitle || 'WARN: Subtitle is necessary in those situations');
// debugger;
        delete tmp2.meta.subtitle;

        route.children = [tmp2, ...tmp];

        // TODO tmp'e children'sız vs. kendini ekle
        // çünkü children'ı olduğu zaman link değil aç/kapa butonu oluyor,
        // kendisinin children'larına kendisini eklemezsek o path'e
        // ulaşılamaz. hhat tercihen ilk çocuk olarak eklenecek.
      }
    }
// debugger;
    // If the `routes` were the VueRouter's routes - in order to
    // get rid off Vue's interactivity watchers
    // reduced.push(route.slice());

    if (route.redirect) {
      route.path = route.redirect;
      delete route.redirect;
    }

    /* eslint-disable no-continue */
    if (route.path.indexOf(':') > -1) {
      continue;
    }

    if (!route.meta) {
      continue;
    }

    if (route.meta.isHidden) {
      continue;
    }

    // TODO Add other conditions to premature break the loop
    //
    /* eslint-enable no-continue */

    reduced.push(route);
  }
// debugger;
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
console.log(reduced);
  return reduced;
}

export default reduce;
