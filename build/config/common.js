/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import path from 'path';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import {babelConfig, paths, sourceDirs} from '../constants';

const DEVELOPMENT_MODE = process.env.NODE_ENV === 'development';

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [paths.app, 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: sourceDirs,
        use: [
          {
            loader: 'babel-loader',
            options: Object.assign(babelConfig, {cacheDirectory: paths.babelCacheDir}),
          },
        ],
      },
      {
        test: /\.(ico|png)/,
        include: paths.icons,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: '[name]-[hash:4].[ext]',
              outputPath: 'meta/',
            },
          },
        ],
      },
      {
        test: /\.path/,
        include: sourceDirs,
        use: ['raw-loader'],
      },
      {
        test: /\.ya?ml/,
        include: sourceDirs,
        use: ['json-loader', 'yaml-loader'],
      },
      {
        test: /\.(ttf|eot|woff|woff2|otf)$/,
        include: sourceDirs,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: '[path][name].[ext]?[hash]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'es6-promise',
      Map: 'core-js/es6/map',
      Set: 'core-js/es6/set',
    }),
    new webpack.DefinePlugin({
      DEBUG: JSON.stringify(DEVELOPMENT_MODE),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new CopyWebpackPlugin([{from: path.join(paths.root, 'favicons'), to: paths.dist, flatten: true}]),
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true,
      shorthands: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.app, 'index.html'),
      inject: false,
      minify: DEVELOPMENT_MODE ? false : {removeComments: false, collapseWhitespace: true},
    }),
  ],
};
