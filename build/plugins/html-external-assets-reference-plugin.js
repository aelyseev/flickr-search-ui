/* eslint-disable import/no-extraneous-dependencies,no-param-reassign */
import invariant from 'invariant';
import {uniq} from 'lodash';

import defaults from './constants';

export default class HTMLExternalAssetsReferencePlugin {
    constructor(options) {
        invariant(
            typeof options === 'object',
            `Plugin options should be an object or nothing, ${typeof options} was provided`
        );

        invariant(
            typeof options.path === 'string',
            `Plugin options.path should be a string, ${options.path} was provided`
        );
        this.options = options;
    }

    apply(compiler) {
        const externalAssets = this.options.path;

        compiler.plugin('compilation', (compilation) => {
            compilation.plugin('html-webpack-plugin-before-html-generation', (htmlPluginData, done) => {
                compiler.inputFileSystem.readFile(externalAssets, (err, assetsString) => {
                    if (err) {
                        return done(null, htmlPluginData);
                    }
                    let assets;
                    try {
                        assets = JSON.parse(assetsString.toString('utf-8'));
                    } catch (e) {
                        assets = defaults;
                    }


                    htmlPluginData.assets.chunks = {
                        ...htmlPluginData.assets.chunks,
                        ...assets.chunks
                    };
                    htmlPluginData.assets.js = uniq(htmlPluginData.assets.js.concat(assets.js));
                    htmlPluginData.assets.css = uniq(htmlPluginData.assets.css.concat(assets.css));
                    return done(null, htmlPluginData);
                });
            });
        });
    }
}
