const theRoot = {
  // Add items to overwrite the root
};

const req = require.context('./', false, /^(?!.*index).*\.js$/);

// const children = {
//   router: {
//     // FIXME What about 'app' and 'auth'? LATEST
//   },
// };
let children = {};
let currReq = null;
req.keys().forEach((key) => {
  currReq = req(key);
debugger;
  if (currReq.default && typeof currReq.default === 'object' && !Array.isArray(currReq.default)) {
    /*
     * [NTSLTMRG]: not slot (add new object key) merge
    let currReqFilename = key.replace(/^.*[\\/]/, ''); // TODO get filename from the path
    currReqFilename = currReqFilename.substring(0, currReqFilename.indexOf('.'));
    children[currReqFilename] = currReq.default;
    */
    children = { ...children, ...currReq.default };
  }
  // Nothing to do here
});

export default { ...theRoot, ...children };
