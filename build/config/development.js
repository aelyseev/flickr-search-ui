/* eslint-disable import/no-extraneous-dependencies,prefer-arrow-callback,func-names,no-console */
import webpack from 'webpack';
import {babelConfig, paths, sourceDirs, mainExtractPlugin as extract} from '../constants';
import entries from '../entries';

const port = 8000;
const mainExtractPlugin = extract(true);

module.exports = {
    name: 'app',
    entry: {
        app: [
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://0.0.0.0:${port}`,
            'webpack/hot/only-dev-server'
        ].concat(entries.app)
    },
    output: {
        filename: '[name].[hash].js',
        path: paths.dist,
        publicPath: paths.publicPath,
        chunkFilename: '[name].[hash].js'
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
        disableHostCheck: true,
        watchOptions: {
            aggregateTimeout: 500,
            poll: 1000
        },
        historyApiFallback: true,
        stats: {
            assets: false,
            env: true,
            colors: true,
            entrypoints: true,
            reasons: false
        },
        host: '0.0.0.0',
        port,
        // contentBase: paths.dist,
        publicPath: paths.publicPath
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: sourceDirs,
                use: [
                    {
                        loader: 'babel-loader',
                        options: Object.assign(
                            babelConfig,
                            {plugins: ['react-hot-loader/babel'].concat(babelConfig.plugins)},
                            {cacheDirectory: paths.babelCacheDir}
                        )
                    }
                ]
            },
            {
                test: /\.css$/,
                include: [paths.normalizeCss],
                use: mainExtractPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'resolve-url-loader'
                    ]
                })
            },
            {
                test: /\.(scss|css)$/,
                include: sourceDirs,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[local]-[hash:base64:3]'
                        }
                    },
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded'
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpg|svg)$/,
                include: sourceDirs,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100000,
                            name: '[path][name].[ext]?[hash]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        mainExtractPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};
