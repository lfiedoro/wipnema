import React from "react";
import Showtime from "./Showtime";


const ShowTimeDateView = (props) => {
    const showtimeHours = props.showtimes.map(showtime => {
        return (
            <Showtime
                key={showtime.id}
                id={showtime.id}
                date={showtime.start_at}
                title={props.title}
                poster={props.poster}
                onSelect={props.onSelect}
            />
        );
    });

    return (
        <div className='dayCard'>
            <div className='day'>
                {props.date}
            </div>
            <div className='hours'>
                {showtimeHours}
            </div>
        </div>
    );
};

export default ShowTimeDateView;
