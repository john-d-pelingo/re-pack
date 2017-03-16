import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './app';
import { Home, Error404 } from './pages';

const propTypes = {
    getState: React.PropTypes.func.isRequired
};

export const paths = {
    ROOT: '/',
    HOME: '/',
    CUSTOM: '/custom'
};

const Routes = ({ getState }) => (
    <App>
        <Switch>
            <Route exact path={ paths.ROOT } component={ Home } />
            <Route path={ paths.CUSTOM } render={ () => <div>Rendered by using the render property. Location: { getState().router.location.pathname }</div> } />
            <Route component={ Error404 } />
        </Switch>
    </App>
);

Routes.propTypes = propTypes;

export default Routes;
