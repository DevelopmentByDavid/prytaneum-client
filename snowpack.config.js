/** @type {import("snowpack").SnowpackUserConfig } */

// snowpack.config.js
const httpProxy = require('http-proxy');
const proxy = httpProxy.createServer({ target: 'http://localhost:3001', ws: true, changOrigin: true });

// Listen for the `error` event on `proxy`.
// if I don't have this here, proxy crashes
// the app on connection reset with websockets
proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain',
    });

    res.end('Something went wrong. And we are reporting a custom error message.');
});

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
        { src: '/api/.*', dest: (req, res) => proxy.web(req, res) },
        { src: '/socket.io/.*', dest: (req, res) => proxy.web(req, res) },
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
        '@app': './src',
        // components: './src/components',
        // assets: './src/assets',
        // domains: './src/domains',
        // pages: './src/pages',
        // contexts: './src/contexts',
        // theme: './src/theme',
        // layout: './src/layout',
        // hooks: './src/hooks',
        // icons: './src/icons',
        // mock: './src/mock',
        // routes: './src/routes',
        // types: './src/types.ts',
        // utils: './src/utils',
        // animations: './src/animations',
    },
};
