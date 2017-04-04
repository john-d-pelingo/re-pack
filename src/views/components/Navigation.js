import React from 'react';
import { Link } from 'react-router-dom';

import { paths } from '../routes';

const Navigation = () => (
    <div>
        <ul>
            <li>
                <Link to={ paths.HOME }>Home</Link>
            </li>
            <li>
                <Link to={ paths.CUSTOM }>Custom</Link>
            </li>
            <li>
                <Link to={ paths.FOUR_OH_FOUR }>404 Example</Link>
            </li>
        </ul>
    </div>
);

export default Navigation;
