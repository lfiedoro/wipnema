import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import InputAdornment from "@material-ui/core/InputAdornment";

class SearchBar extends React.Component {
    state = {term: ''};

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.term);
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <TextField
                        variant="filled"
                        color={'secondary'}
                        autoFocus={true}
                        fullWidth={true}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <i className="material-icons">
                                        location_city
                                    </i>
                                </InputAdornment>
                            ),
                        }}
                        value={this.state.term} label="Provide a city to look for movies"
                        onChange={(e) => this.setState({term: e.target.value})}
                    />
                </form>
            </div>
        );
    }
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func
};

export default SearchBar;
