import React from 'react';
import PropTypes from 'prop-types';

import Movie from './Movie';

const MovieList = (props) => {
    const movies = props.movies.map((movie) => {
        return <Movie title={movie.title} />;
    });

    return (
        <div>
        <h3>Found {movies.length} item{movies.length==1?'':'s'}</h3>
          <ul>{movies}</ul>
        </div>
    );
};

MovieList.propTypes = {
    movies: PropTypes.array
};

export default MovieList;
