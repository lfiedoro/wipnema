import React, {Component} from "react";
import PropType from 'prop-types';

import MovieList from "./contentViews/MovieList";
import ShowtimeList from "./contentViews/ShowtimeList";
import Seats from "./contentViews/Seats";
import Reservation from "./contentViews/Reservation";
import {loading} from "./contentViews/constants";
import {contentWrapper} from "./contentViews/styles";

class Content extends Component {


    render() {
        return (
            <div className={'maxHeight'} style={contentWrapper(this.props.selectedSeatsCount)}>
                {!this.props.pageView ?
                    loading()
                    : null}

                {this.props.pageView & 0b0001 ?
                    <MovieList
                        city={this.props.city}
                        movies={this.props.movies}
                        onSelect={this.props.onMovieSelect}
                    /> : null}

                {this.props.pageView & 0b0010 ?
                    <ShowtimeList
                        showtimes={this.props.showtimes}
                        showName={this.props.selectedMovie}
                        poster={this.props.poster}
                        onSelect={this.props.onShowtimeSelect}
                    /> : null}

                {this.props.pageView & 0b0100 ?
                    <Seats
                        seats={this.props.seats}
                        onSelect={this.props.onSitSelect}
                        poster={this.props.poster}
                        date={this.props.showtimeDate}
                        title={this.props.selectedMovie}
                    /> : null}

                {this.props.pageView & 0b1000 ?
                    <Reservation
                        title={this.props.selectedMovie}
                        date={this.props.showtimeDate}
                        id={this.props.showtimeId}
                        seatsSelected={this.props.seatsSelected}
                        onReservationSubmit={this.props.onReservationSubmit}
                    /> : null}
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
    onSitSelect: PropType.func,
    selectedSeatsCount: PropType.number,
    onReservationSubmit: PropType.func
};

export default Content;
