import React, {Component} from "react";
import PropType from 'prop-types';
import CircularProgress from "@material-ui/core/CircularProgress";

import MovieList from "./contentViews/MovieList";
import ShowtimeList from "./contentViews/ShowtimeList";
import Sits from "./contentViews/Sits";
import Reservation from "./contentViews/Reservation";

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
                   <div style={{margin: '20px auto', textAlign: 'center'}}>
                     <CircularProgress size={100} color="secondary"/>
                   </div>
                   : null}

                  {this.props.pageView & 0b0001 ?
                   <MovieList
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
                   /> : null}

                  {this.props.pageView & 0b1000 ?
                   <Reservation
                     title={this.props.selectedMovie}
                     date={this.props.showtimeDate}
                     id={this.props.showtimeId}
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
    onSitSelect: PropType.func
};

export default Content;
