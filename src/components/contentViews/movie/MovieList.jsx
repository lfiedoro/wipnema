import React from 'react';
import PropTypes from 'prop-types';
import seat from './../../../img/seat.svg';
import noMovie from './../../../img/no-movie.svg'

import Movie from './Movie';

const MovieList = (props) => {
    const movies = props.movies.map((movie) => {
        return <Movie
            key={movie.id}
            id={movie.id}
            poster={movie.poster_image_thumbnail}
            title={movie.title}
            onSelect={props.onSelect}
        />;
    });


    const moviesFoundCount = () => {
        if (movies.length) {
            return (
                <h3>Found {movies.length} item{movies.length === 1 ? '' : 's'}</h3>
            )
        }
    };

    const movieScreen = () => {
        if (!movies.length && props.city === '') {
            return (
                <div style={{textAlign: 'center'}}>
                    <img
                        src={seat}
                        className="startImage"
                        alt="Search a city to look for movies"
                    />
                    <h2 style={{fontSize: '1.5rem'}}>
                        Select a city and reserve
                        <span className='gradientText'>a seat today :)</span>
                    </h2>
                </div>
            )
        } else if (!movies.length && props.city !== '') {
            return (
                <div style={{textAlign: 'center'}}>
                    <img
                        src={noMovie}
                        className="startImage"
                        alt="Search a city to look for movies"
                    />
                    <h2 style={{fontSize: '1.5rem'}}>
                        No showtimes avaiable at this city.
                    </h2>
                </div>
            )
        }
    };


    return (
        <div>
            {moviesFoundCount()}
            {movieScreen()}
            <div className='moviesGrid'>
                {movies}
            </div>
        </div>
    );
};

MovieList.propTypes = {
    city: PropTypes.string,
    movies: PropTypes.array,
    onSelect: PropTypes.func
};

export default MovieList;
