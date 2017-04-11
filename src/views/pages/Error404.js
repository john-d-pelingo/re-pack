import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    location: PropTypes.object.isRequired
};

const Error404 = ({ location }) => (
    <div>
        No match for { location.pathname }
    </div>
);

Error404.propTypes = propTypes;

export default Error404;
