/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import {uniq} from 'lodash';
import invariant from 'invariant';

import defaults from './constants';

export default class HTMLExternalAssetsPlugin {
    constructor(options) {
        invariant(
            typeof options === 'object',
            `Plugin options should be an object, ${typeof options} was provided`
        );

        invariant(
            typeof options.path === 'string',
            `Plugin options.path should be a string, ${options.path} was provided`
        );
        this.options = options;
    }

    static appendHash(url, hash) {
        return url ? url + (url.indexOf('?') === -1 ? '?' : '&') + hash : url;
    }

    apply(compiler) {
        compiler.plugin('emit', (compilation, done) => {
            const {chunks, hash} = compilation;
            invariant(
                typeof compilation.options.output.publicPath !== 'undefined',
                'options.output.publicPath should be defined'
            );

            const publicPath = compilation.mainTemplate.getPublicPath({hash}).replace(/([^/]$)/, '$1/');

            const assetsChunks = {};
            const assetsJs = [];
            const assetsCss = [];

            chunks.forEach((chunk) => {
                const chunkName = chunk.name;
                const chunkFiles = [].concat(chunk.files).map(chunkFile => (
                    this.options.hash ? this.appendHash(publicPath + chunkFile, hash) : publicPath + chunkFile
                ));
                const entry = chunkFiles[0];
                const css = chunkFiles.filter(chunkFile => /.css($|\?)/.test(chunkFile));

                assetsChunks[chunkName] = {
                    entry,
                    hash: chunk.hash,
                    css
                };

                assetsJs.push(entry);
                assetsCss.push(...css);
            });

            compiler.inputFileSystem.readFile(this.options.path, (err, assetsString) => {
                let assets;
                if (err) {
                    assets = {
                        ...defaults,
                        publicPath
                    };
                } else {
                    try {
                        assets = JSON.parse(assetsString.toString('utf-8'));
                    } catch (e) {
                        assets = {
                            ...defaults,
                            publicPath
                        };
                    }
                }

                assets.chunks = {
                    ...assets.chunks,
                    ...assetsChunks
                };
                assets.js = uniq(assets.js.concat(assetsJs));
                assets.css = uniq(assets.css.concat(assetsCss));
                compiler.outputFileSystem.mkdirp(path.dirname(this.options.path), (error) => {
                    if (error) {
                        done(error);
                        return;
                    }
                    compiler.outputFileSystem.writeFile(this.options.path, Buffer.from(JSON.stringify(assets), 'utf8'), done);
                });
            });
        });
    }
}
