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

## Route Record

Every route record (the term use because of VueRouter documentation) MUST have the `name` property
in order to avoid problems with `<keep-alive>`.

Other options can be passed with the `meta` property as well. The list below shows available
options for the route;

Name|Type|Required|Default|Description
----|----|--------|-------|-----------
`role`|Array|No|[] (empty array)|Required roles to navigate to this route. Note that one match is enough to pass the check.
`title`|String|No|'' (empty string)|The title of the route to show in various components (e.g. sidebar, breadcrumbs). Can be sent to the translation on the component.
`icon`|String|No|'' (empty string)|Icon class for the route link, e.g. `fa fa-tachometer`.
`noCache`|Boolean|No|`false`|When set, the route will not be cached by `<keep-alive>`.
