import React from 'react';
import PropTypes from 'prop-types';

const ShowtimeList = (props) => {
    console.log(props);
    const showtimes = props.showtimes.map((showtime) => {
        return <li key={showtime.id}>{showtime.start_at}</li>;
    });

    return (
        <div>
          <h2>For {props.showName}</h2>
          <h3>Found {showtimes.length} show{showtimes.length===1?'':'s'}</h3>
          <ul>{showtimes}</ul>
        </div>
    );
};

ShowtimeList.propTypes = {
    showtimes: PropTypes.array,
    showName: PropTypes.string
};

export default ShowtimeList;
