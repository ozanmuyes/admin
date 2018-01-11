// TODO Collect every file that is not 'index'.

/**
 * Export these key/value pairs to them to be
 * injected to language entry's root. That
 * is the entries of the `asRoot` are un-
 * related with any route directly.
 * Please note the they can be overriden by
 * other router language files. Also they
 * may override final language entry.
 */
const initialRoot = {
  'N/A': 'N/A',
  dashboard: 'Dashboard',
};

const reqCtx = require.context('./', false, /^(?!.*index).*\.js$/);

const keys = reqCtx.keys();

const childrenArrs = (() => {
  // TODO Use `keys` here
  // TODO Do NOT be 'async'
})();

export default Object.create({}, initialRoot, childrenArrs);

// export default new Promise((resolve, reject) => {
//   const retVal = [];
// debugger;
//   keys
//     .map(item => item)
//     .reduce((arr, item) => {
//       arr.push(item);

//       return arr;
//     }, retVal);

//     resolve(retVal);
//   // return retVal;
// });
