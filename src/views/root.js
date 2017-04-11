import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter /* , push*/ } from 'react-router-redux';

import Routes from './routes';

const propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
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
