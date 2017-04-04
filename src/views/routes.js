import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';

import App from './app';
import { Home, Error404 } from './pages';

const propTypes = {
    getState: React.PropTypes.func.isRequired
};

export const paths = {
    ROOT: '/',
    HOME: '/',
    CUSTOM: '/custom',
    FOUR_OH_FOUR: '/fourohfour'
};

ReactGA.initialize('UA-70753213-3');
const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
    return null;
};

const Routes = ({ getState }) => (
    <App>
        <Route component={ logPageView } />
        <Switch>
            <Route exact path={ paths.ROOT } component={ Home } />
            <Route exact path={ paths.CUSTOM } render={ () => <div>Rendered by using the render property. Location: { getState().router.location.pathname }</div> } />
            <Route component={ Error404 } />
        </Switch>
    </App>
);

Routes.propTypes = propTypes;

export default Routes;
