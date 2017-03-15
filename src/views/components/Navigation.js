import React from 'react';

import { Link } from 'react-router-dom';

const propTypes = {
    paths: React.PropTypes.object.isRequired
};

const Navigation = ({ paths }) => (
    <div>
        <ul>
            <li>
                <Link to={ paths.HOME }>Home</Link>
            </li>
            <li>
                <Link to={ paths.CUSTOM }>Custom</Link>
            </li>
        </ul>
    </div>
);

Navigation.propTypes = propTypes;

export default Navigation;
