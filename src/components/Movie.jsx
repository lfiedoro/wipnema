import React from 'react';
import PropType from 'prop-types';

const Movie = (props) => {
    return <li>{props.title}</li>;
};

Movie.propTypes = {
    title: PropType.string
};

export default Movie;
