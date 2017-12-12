# Routes

The routes file (and at the and the array) is splitted into multiple files. This is due to leverage
modularization. Any JavaScript file in this directory (`/src/router/routes`) except `index.js` will
be processed and finally added to the application routes.

Individual routes files may export a routes array or an object for further configuration. Please
note each and every file SHOULD export an array or object, and this MUST be the default export.
Although you can any named exports in those individual files, however, the routes concatenator
(`/src/router/routes/index.js`) will omit those (named) exports.

It is enough to follow the convention for adding new routes to the application as the concatenator
will process them automatically upon build (also development).
