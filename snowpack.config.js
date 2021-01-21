/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
        /* ... */
        public: { static: true, url: '/' },
        src: '/dist',
    },
    plugins: [
        // '@snowpack/plugin-babel',
        ['@snowpack/plugin-typescript', { tsc: 'yarn tsc' }],
        '@snowpack/plugin-react-refresh',
        '@snowpack/plugin-dotenv',
    ],
    exclude: ['**/node_modules/**/*', '**/*.+(test|stories).*'],
    routes: [
        /* Enable an SPA Fallback in development: */
        { match: 'routes', src: '.*', dest: '/index.html' },
    ],
    optimize: {
        /* Example: Bundle your final build: */
        // "bundle": true,
    },
    packageOptions: {
        polyfillNode: true,
    },
    devOptions: {
        port: 3000,
    },
    buildOptions: {
        /* ... */
        baseUrl: '/',
    },
    alias: {
        components: './src/components',
        assets: './src/assets',
        domains: './src/domains',
        pages: './src/pages',
        contexts: './src/contexts',
        theme: './src/theme',
        layout: './src/layout',
        hooks: './src/hooks',
        icons: './src/icons',
        mock: './src/mock',
        routes: './src/routes',
        types: './src/types.ts',
        utils: './src/utils',
        animations: './src/animations',
    },
};
