import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';

import smoothscroll from 'smoothscroll-polyfill';
import { init } from 'utils/storage';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

dotenv.config();

smoothscroll.polyfill();

function startup() {
    init(); // initializes local storage
    ReactDOM.render(React.createElement(App), document.getElementById('root'));
}

if (import.meta.env.MODE === 'development' && import.meta.env.SNOWPACK_PUBLIC_MSW === 'true') {
    import('mock/browser')
        .then(({ worker }) => worker.start())
        .then(startup)
        .catch(console.error);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    // worker
    //     .start()
    //     .then(() => startup())
    //     // eslint-disable-next-line no-console
    //     .catch(console.error);
} else {
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA

    // serviceWorker.unregister();

    // serviceWorker.register();
    startup();
}

if (import.meta.hot) {
    import.meta.hot.accept();
}
