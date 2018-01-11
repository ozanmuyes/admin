/* eslint-disable */

const req = require.context('./', false, /^(?!.*index).*\.js$/);
// FIXME Use this for dirs '^.\/(?!.*index).*[^\.js]$' // /gm
// const reqDirs = require.context('./', false, /^.\/(?!.*index).*^[\.js]$/m); // FIXME AAAAAAAAAAAAAAA
let currReq = null;
// const arr = [];
let arr = {}; // eslint-disable-line
// debugger;

// // i.e.
// // router = { /* from ./router/ */ }
// let featuresLangs = {}; // eslint-disable-line
// featuresLangs = req.keys().forEach((key) => {
req.keys().forEach((key) => {
// debugger;
  if (!key.startsWith('./_')) {
    if (key.endsWith('.js')) {
      currReq = req(key);
    } else {
      if (key === './') {
        // TODO Do nothing??? - confirmed
      } else {
        currReq = require(`${key}/index.js`);
      }
    }

    if (currReq && currReq.default) {
      if (typeof currReq.default === 'object' && !Array.isArray(currReq.default)) {
        // TODO Get `key` name (e.g. router, layouts etc.)
        let currReqFilename = key.replace(/^.*[\\/]/, ''); // TODO get filename from the path
        currReqFilename = currReqFilename.substring(0, currReqFilename.indexOf('.'));
        if (currReqFilename === 'root') {
          arr = { ...arr, ...currReq.default }; // instead of do this;
        } else {
          arr[currReqFilename] = { ...(arr.currReqFilename || {}), ...currReq.default };
        }
        // arr.push({ router_layouts_etc: currReq.default });
      } else {
        // TODO Throw error
      }
    }
    // Nothing else
  }
  // Nothing else
});



// console.log(featuresLangs);
// if (typeof featuresLangs === 'undefined' || featuresLangs === null) {
//   featuresLangs = {};
// }
//
// export default featuresLangs;
if (typeof arr === 'undefined' || arr === null) {
  arr = {};
}

export default arr;
