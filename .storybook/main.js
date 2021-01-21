const path = require('path');
const snowpackConfig = require('../snowpack.config.js');
const webpack = require('webpack');

module.exports = {
    stories: ['../src/**/*.stories.@(jsx|tsx|mdx)'],
    addons: [
        '@storybook/addon-a11y',
        {
            name: '@storybook/addon-essentials',
            options: {
                docs: false,
            },
        },
        '@storybook/addon-links',
        'storybook-addon-performance/register',
    ],
    typescript: {
        reactDocgen: 'none',
    },
    webpackFinal: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            ...Object.entries(snowpackConfig.alias).reduce(
                (accum, [key, value]) => ({
                    ...accum,
                    [key]: path.resolve(__dirname, `.${value}`),
                }),
                {}
            ),
            'hooks/useSocketio': path.resolve(__dirname, '../src/hooks/__mocks__/useSocketio'),
        };
        config.module.rules.push({
            test: /\.[tj]sx?$/,
            loader: [
                // This assumes snowpack@>=2.9.0
                require.resolve('@open-wc/webpack-import-meta-loader'),
                require.resolve('@snowpack/plugin-webpack/plugins/proxy-import-resolve'),
            ],
        });
        config.plugins.push(
            new webpack.DefinePlugin({
                __SNOWPACK_ENV__: JSON.stringify(process.env),
            })
        );
        return config;
    },
    babel: async (options) => {
        return {
            ...options,
            plugins: [
                ...options.plugins,
                [
                    'babel-plugin-import',
                    {
                        libraryName: '@material-ui/core',
                        // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                        libraryDirectory: 'esm',
                        camel2DashComponentName: false,
                    },
                    'core',
                ],
                [
                    'babel-plugin-import',
                    {
                        libraryName: '@material-ui/icons',
                        // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                        libraryDirectory: 'esm',
                        camel2DashComponentName: false,
                    },
                    'icons',
                ],
                [
                    'babel-plugin-import',
                    {
                        libraryName: '@material-ui/lab',
                        // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                        libraryDirectory: 'esm',
                        camel2DashComponentName: false,
                    },
                    'lab',
                ],
            ],
        };
    },
};
