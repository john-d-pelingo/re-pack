/* eslint-disable global-require */

import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import reducers from './reducers';

export const history = createHistory();
// Export anonymous function.
// The name of this function when imported can be whatever we want.
export default (initialState = {}) => {
    let middleware = applyMiddleware(thunk);

    // const history = createHistory();
    const builtRouterMiddleware = routerMiddleware(history);
    const appliedRouterMiddleware = applyMiddleware(builtRouterMiddleware);

    middleware = compose(middleware, appliedRouterMiddleware);

    if (process.env.NODE_ENV === 'development') {
        // Configure redux-devtools-extension
        // @see https://github.com/zalmoxisus/redux-devtools-extension
        const devToolsExtension = window.devToolsExtension;
        if (typeof devToolsExtension === 'function') {
            // Compose all of our middleware one after another
            middleware = compose(middleware, devToolsExtension());
        }
    }

    const store = createStore(reducers, initialState, middleware);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(require('./reducers').default);
        });
    }

    return store;
};
