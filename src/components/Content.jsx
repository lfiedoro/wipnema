import React, {Component} from "react";
import PropType from 'prop-types';

import MovieList from "./contentViews/MovieList";
import ShowtimeList from "./contentViews/ShowtimeList";
import Seats from "./contentViews/Seats";
import Reservation from "./contentViews/Reservation";
import {contentWrapper, positionStyle} from "./contentViews/styles";
import {SeatsSelectedContext} from "./contexts/SeatsSelectedContext";

class Content extends Component {
    static contextType = SeatsSelectedContext;

    contentViews = () => {
        if (this.props.pageView) {
            switch (this.props.pageView) {
                case 0b0001:
                    return (
                        <MovieList
                            city={this.props.city}
                            movies={this.props.movies}
                            onSelect={this.props.onMovieSelect}
                        />
                    );
                case 0b0010:
                    return (
                        <ShowtimeList
                            showtimes={this.props.showtimes}
                            showName={this.props.selectedMovie}
                            poster={this.props.poster}
                            onSelect={this.props.onShowtimeSelect}
                        />
                    );
                case 0b0100:
                    return (
                        <Seats
                            seats={this.props.seats}
                            poster={this.props.poster}
                            date={this.props.showtimeDate}
                            title={this.props.selectedMovie}
                        />
                    );
                case 0b1000:
                    return (
                        <Reservation
                            title={this.props.selectedMovie}
                            date={this.props.showtimeDate}
                            id={this.props.showtimeId}
                            seatsSelected={this.props.seatsSelected}
                            onReservationSubmit={this.props.onReservationSubmit}
                        />
                    );
                default:
                    return null;
            }
        }
    };

    render() {
        const {seatsSelected} = this.context;
        return (
            <div style={positionStyle} className='landscapeMob'>
                <div className="shader"/>
                <div className='maxHeight' style={contentWrapper(seatsSelected.length)}>
                    {this.contentViews()}
                </div>
                <div className="shader bottom"/>
            </div>
        );
    }

}

Content.propTypes = {
    pageView: PropType.number,
    seats: PropType.object,
    seatsSelected: PropType.array,
    poster: PropType.string,

    movies: PropType.array,
    selectedMovie: PropType.string,

    showtimes: PropType.array,
    showtimeDate: PropType.string,
    showtimeId: PropType.string,

    onMovieSelect: PropType.func,
    onShowtimeSelect: PropType.func,
    onReservationSubmit: PropType.func
};

export default Content;
