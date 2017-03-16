import React from 'react';

const propTypes = {
    location: React.PropTypes.object.isRequired
};

const Error404 = ({ location }) => (
    <div>
        No match for { location.pathname }
    </div>
);

Error404.propTypes = propTypes;

export default Error404;
