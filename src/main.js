import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';
import './views/styles/style.scss';

function render(App) {
    ReactDOM.render(
        <AppContainer>
            <App name="John" />
        </AppContainer>,
        document.getElementById('root')
    );
}

// For react-hot-loader
if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;
        render(NextApp);
    });
}

render(App);
