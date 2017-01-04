import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';
import './views/styles/style.scss';

// eslint-disable-next-line no-shadow
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
        // eslint-disable-next-line global-require
        const NextApp = require('./components/App').default;
        render(NextApp);
    });
}

render(App);
