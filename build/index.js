/* eslint-disable import/no-extraneous-dependencies,func-names,no-console */
import webpack from 'webpack';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import dllWebpack from './dll.webpack';
import HTMLExternalAssetsReferencePlugin from './plugins/html-external-assets-reference-plugin';
import {paths} from './constants';

const merge = require('webpack-merge');
const common = require('./config/common');
const development = require('./config/development');
const production = require('./config/production');

const getConfig = (lifeCycle) => {
  switch (lifeCycle) {
    case 'dev':
    case 'dev:webpack':
    case 'start':
      console.log('Developing...');
      return merge.smart(development, common);

    case 'build':
      console.log('Creating production build...');
      production.dependencies = ['vendor', 'shim'];
      production.plugins.push(
        new HTMLExternalAssetsReferencePlugin({path: paths.assetsManifest}),
        new webpack.DllReferencePlugin({manifest: paths.dllManifest})
      );
      return [...dllWebpack, merge.smart(production, common)];

    case 'build:analyze-bundle':
      console.log('Analyzing with webpack-bundle-analyzer...');
      common.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerPort: 9000,
          openAnalyzer: true,
        })
      );
      production.dependencies = ['vendor', 'shim'];
      production.plugins.push(
        new HTMLExternalAssetsReferencePlugin({path: paths.assetsManifest}),
        new webpack.DllReferencePlugin({manifest: paths.dllManifest})
      );
      return [...dllWebpack, merge.smart(production, common)];

    default:
      throw Error('Nonexistent lifecycle event name');
  }
};

const config = getConfig(process.env.npm_lifecycle_event);
module.exports = config;
