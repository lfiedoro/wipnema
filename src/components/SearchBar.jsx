import React from 'react';
import PropTypes from 'prop-types';

class SearchBar extends React.Component {
    state = { term: '' };

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.term);
    }

    render() {
        return (
            <div className="place-form">
              <form onSubmit={this.onFormSubmit}>
                <label>Where?</label>
                <input type="text"
                       value={this.state.term}
                       onChange={(e) => this.setState({ term: e.target.value })} />
              </form>
            </div>
        );
    }
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func
};

export default SearchBar;
