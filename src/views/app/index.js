/* eslint-disable react/prefer-stateless-function */

import React from 'react';

import { Navigation } from '../components';

const propTypes = {
    children: React.PropTypes.object.isRequired
};

class App extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <div>
                <Navigation />
                <main>
                    { children }
                </main>
            </div>

        );
    }
}

App.propTypes = propTypes;

export default App;
