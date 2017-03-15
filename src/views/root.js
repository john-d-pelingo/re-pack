import React from 'react';

import { Provider } from 'react-redux';
import { ConnectedRouter /* , push*/ } from 'react-router-redux';

import Routes from './routes';

const propTypes = {
    history: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired
};

const Root = ({ history, store }) => (
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <Routes getState={ store.getState } />
        </ConnectedRouter>
    </Provider>
);

Root.propTypes = propTypes;

export default Root;
