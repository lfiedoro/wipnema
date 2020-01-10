import React, {Component} from "react";
import PropType from 'prop-types';

import MovieList from "./movie/MovieList";
import ShowtimeList from "./showtimes/ShowtimeList";
import Seats from "./seats/Seats";
import Reservation from "./reservation/Reservation";
import {contentWrapper, positionStyle} from "../../styles";
import {SeatsSelectedContext} from "../contexts/SeatsSelectedContext";
import ReservationSuccess from "./reservation/ReservationSuccess";

class Content extends Component {
    static contextType = SeatsSelectedContext;

    contentViews = () => {
        const {seatsSelected} = this.context;

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
                            poster={this.props.poster}
                            onReservationSuccess={this.props.onReservationSuccess}
                            seatsSelected={seatsSelected}
                        />
                    );
                case 0b00001100:
                    return (
                        <ReservationSuccess/>
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
                <div className='maxHeight' style={contentWrapper(seatsSelected.length, this.props.pageView)}>
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
    onReservationSuccess: PropType.func,
    onShowtimeSelect: PropType.func,
};

export default Content;
