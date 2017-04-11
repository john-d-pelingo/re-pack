/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string
};

class Home extends React.Component {
    render() {
        const name = 'Johnny Boy';
        return (
            <h1>Hello {name}!</h1>
        );
    }
}

Home.propTypes = propTypes;

export default Home;
