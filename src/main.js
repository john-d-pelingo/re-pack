/* eslint-disable no-shadow, global-require */

import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import configureStore, { history } from './core/store';

import Root from './views/root';
import './views/styles/style.scss';

const store = configureStore();

function render(Root) {
    ReactDOM.render(
        <AppContainer>
            <Root history={ history } store={ store } />
        </AppContainer>,
        document.getElementById('root')
    );
}

// For react-hot-loader
if (module.hot) {
    module.hot.accept('./views/root', () => {
        const NextApp = require('./views/root').default;
        render(NextApp);
    });
}

render(Root);
