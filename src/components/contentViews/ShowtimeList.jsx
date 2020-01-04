import React from 'react';
import PropTypes from 'prop-types';

import Showtime from './Showtime';

const ShowtimeList = (props) => {
    const showtimes = props.showtimes.map((showtime) => {
        return <Showtime
                 key={showtime.id}
                 id={showtime.id}
                 date={showtime.start_at}
                 title={props.showName}
                 onSelect={props.onSelect}
               />;
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
    showName: PropTypes.string,
    onSelect: PropTypes.func
};

export default ShowtimeList;
