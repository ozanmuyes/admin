'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const fs = require('fs-extra');

function rtrim(theString) {
  return theString.replace(/\s+$/, '');
}

const CAKE_DEST = process.env.CAKE_DEST
  ? rtrim(process.env.CAKE_DEST, '/')
  : null;

const CAKE_NAME = process.env.CAKE_NAME
  ? rtrim(process.env.CAKE_NAME, '/')
  : 'index';

if (CAKE_DEST === null) {
  console.error('CakePHP project path wasn\'t given (CAKE_DEST environment variable).');
  console.log('Terminating...');

  return;
}

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))

    // Copy dist/ directory to CAKE_DEST
    fs.copySync('dist', CAKE_DEST);

    // TODO Rename index.html to index.html.hbs in CAKE_DEST
    fs.removeSync(`${CAKE_DEST}/${CAKE_NAME}.hbs`);
    fs.moveSync(`${CAKE_DEST}/index.html`, `${CAKE_DEST}/${CAKE_NAME}.hbs`);
  })
})
