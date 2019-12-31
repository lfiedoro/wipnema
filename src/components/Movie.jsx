import React from 'react';
import PropType from 'prop-types';

class Movie extends React.Component {
    state = {
        movieName: '',
        movieId: 0,
    }

    onMovieSelect = () => {
        // setState accepts callback when it finishes updateing state
        // so we call onSelect, once state was updated
        this.setState({
            movieName: this.props.title,
            movieId: this.props.id,
        }, () => this.props.onSelect(this.state.movieId, this.state.movieName));
    }

    render() {
        return <li
                 onClick={this.onMovieSelect}
               >
                 {this.props.title}
               </li>;
    }
}

Movie.propTypes = {
    title: PropType.string,
    id: PropType.string,
    onSelect: PropType.func
};

export default Movie;
