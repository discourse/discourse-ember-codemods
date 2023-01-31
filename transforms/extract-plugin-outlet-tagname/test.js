'use strict';

const { runTransformTest } = require('codemod-cli');

runTransformTest({
  name: 'extract-plugin-outlet-tagname',
  path: require.resolve('./index.js'),
  fixtureDir: `${__dirname}/__testfixtures__/`,
});
