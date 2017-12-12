/* eslint-disable import/no-mutable-exports */

import merge from 'webpack-merge';

// Get all the js files except 'index.js'
const req = require.context('./', false, /^(?!.*index).*\.js$/);

let allRoutes = [];
let currReq = null;

// eslint-disable-next-line wrap-iife
(function initialize() {
  req.keys().forEach((key) => {
    currReq = req(key);
    if (currReq.default && typeof currReq.default === 'object') {
      if (Array.isArray(currReq.default)) {
        allRoutes = allRoutes.concat(currReq.default);
      } else {
        // TODO Test here
        const { meta, routes, ...options } = currReq.default;
        let tmp = null;

        allRoutes = allRoutes.concat(
          routes.map((route) => {
            tmp = { ...route };

            if (typeof meta === 'object') {
              if (tmp.meta) {
                // TODO Use more smart merging, e.g. \
                //      If `tmp.meta` and `meta` has the same key also merge them
                // tmp.meta = Object.assign({}, meta, tmp.meta);
                tmp.meta = merge(meta, tmp.meta);
              } else {
                tmp.meta = meta;
              }
            }

            if (options.base && options.base.length > 0) {
              // NOTE '"path" is required in a route configuration.'
              tmp.path = `${options.base}/${route.path.replace(/^\//, '')}`.replace(/\/$/, '');
            }

            return tmp;
          }) // eslint-disable-line comma-dangle
        );
      }

      // routes.push(currReq.default); // TODO Maybe we can namespace the individual routes
    } else {
      console.warn('We do NOT support named exports from individual files', key);
      // TODO Warn here about 'we do NOT support named exports from individual \
      //      routes files - use `export default` for the routes array in the \
      //      individual routes files.
    }
  });
})();

export default allRoutes;
