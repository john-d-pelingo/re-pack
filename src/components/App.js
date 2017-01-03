import React, {Component, PropTypes} from 'react';

class App extends Component {
    render() {
        const {name} = this.props;
        return (
            <h1>Hello {name}!</h1>
        );
    }
}

App.propTypes = {
    name: PropTypes.string.isRequired
};

export default App;
