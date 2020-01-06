import React from 'react';
import PropTypes from 'prop-types';
import ShowTimeMonthView from "./ShowtimeMonthView";

const ShowtimeList = (props) => {
    const _ = require('lodash');
    const selectedMovieStyle = {
        background: `url(${props.poster}) no-repeat 50% 50% / cover`,
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        height: '140px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'flex-end',
        borderBottom: 'rgb(77, 133, 149) solid 2px',
        position: 'relative'
    };

    const showtimesDates = props.showtimes.map(showtime => new Date(showtime.start_at));
    const showtimesMonth = showtimesDates.map(date => date.getMonth());
    const uniqueMonths = _.uniq(showtimesMonth);

    const showtimeMonths = uniqueMonths.map(month => {
        const filteredShowtimes = props.showtimes.filter(showtime => new Date(showtime.start_at).getMonth() === month);
        const convertDatesToDays = showtimesDates.map(date => date.getDate());
        const uniqueDates = _.uniq(convertDatesToDays);
        return (
            <ShowTimeMonthView
                key={month}
                month={month}
                showtimes={filteredShowtimes}
                dates={uniqueDates}
                title={props.showName}
                poster={props.poster}
                onSelect={props.onSelect}
            />
        )
    });


    return (
        <div>
            <div style={selectedMovieStyle}>
                <div className='shader bottom poster'>
                    <h2>{props.showName}</h2>
                </div>
            </div>
            {showtimeMonths}
        </div>
    );
};

ShowtimeList.propTypes = {
    showtimes: PropTypes.array,
    showName: PropTypes.string,
    poster: PropTypes.string,
    onSelect: PropTypes.func
};

export default ShowtimeList;
