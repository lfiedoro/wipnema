import React, { Component } from "react";
import PropType from 'prop-types';

import MovieList from "./contentViews/MovieList";
import ShowtimeList from "./contentViews/ShowtimeList";
import Sits from "./contentViews/Sits";
import Reservation from "./contentViews/Reservation";
import {loading} from "./contentViews/constants";

class Content extends Component {

  contentWrapper = {
    height: '100%',
    width: '95%',
    padding: '20px 0',
    zIndex: 2,
    boxSizing: 'border-box',
    overflowY: 'auto'
  };

  render() {
    return (<div className={'maxHeight'} style={this.contentWrapper}>

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
                    <Sits
                        sits={this.props.sits}
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
          onReservationSubmit={this.props.onReservationSubmit}
        /> : null}

                </div>
               );
    }

}

Content.propTypes = {
    pageView: PropType.number,
    sits: PropType.object,
    poster: PropType.string,

    movies: PropType.array,
    selectedMovie: PropType.string,

    showtimes: PropType.array,
    showtimeDate: PropType.string,
    showtimeId: PropType.string,

  onMovieSelect: PropType.func,
  onShowtimeSelect: PropType.func,
  onSitSelect: PropType.func,
  onReservationSubmit: PropType.func
};

export default Content;
