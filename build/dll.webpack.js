/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import entries from './entries';
import HTMLExternalAssetsPlugin from './plugins/html-external-assets-plugin';

import {paths, uglifyOptions} from './constants';

const {assetsManifest, dllManifest, dist} = paths;

const shim = {
  name: 'shim',
  entry: {
    shim: entries.shim,
  },
  output: {
    filename: '[name].[hash].js',
    path: dist,
    publicPath: '',
    chunkFilename: '[name].[hash].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HTMLExternalAssetsPlugin({path: assetsManifest}),
    new webpack.optimize.UglifyJsPlugin(uglifyOptions),
  ],
};

const vendors = {
  name: 'vendor',
  entry: {
    dll: entries.vendors,
  },
  output: {
    path: dist,
    publicPath: '',
    filename: 'vendor.[hash].js',
    library: 'vendor__[hash]',
  },
  plugins: [
    new HTMLExternalAssetsPlugin({path: assetsManifest}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.DllPlugin({
      name: 'vendor__[hash]',
      path: dllManifest,
    }),
    new webpack.optimize.UglifyJsPlugin(uglifyOptions),
  ],
};

module.exports = [shim, vendors];
