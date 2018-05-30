/* eslint-disable import/no-extraneous-dependencies */
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import nanoid from 'nanoid';

const path = require('path');
const packageJSON = require('../package.json');

const root = path.resolve(__dirname, '../');
const tmp = path.resolve(root, '.tmp');

export const uglifyOptions = {
    compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
    },
    mangle: false,
    sourceMap: true,
    output: {
        comments: false
    }
};

const paths = {
    root,
    app: path.resolve(root, 'app'),
    appEntry: process.env.NODE_ENV === 'development' ? path.resolve(root, 'app') : path.resolve(root, 'app', 'index.production'),
    tmp,
    icons: path.resolve(root, 'favicons'),
    assets: path.resolve(root, 'app/assets'),
    dist: path.resolve(root, 'dist'),
    normalizeCss: require.resolve('normalize.css'),
    babelCacheDir: path.join(root, '.cache'),
    assetsManifest: path.join(tmp, `dll-assets.${nanoid()}.json`),
    dllManifest: path.join(tmp, `dll-manifest.${nanoid()}.json`),
    publicPath: '/'
};

const mainExtractPlugin = disable => new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    allChunks: true,
    disable
});

module.exports = {
    paths,
    packageVersion: packageJSON.version,
    babelConfig: packageJSON.babel,
    mainExtractPlugin,
    sourceDirs: [
        paths.app
    ],
    globalStylesDir: [
        path.resolve(paths.assets, 'styles')
    ]
};
