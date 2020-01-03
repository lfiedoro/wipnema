import React from 'react';

import showtimes from '../api/showtimes';
import reservation from '../api/reservation';

import SearchBar from './SearchBar';
import MovieList from './MovieList';
import ShowtimeList from './ShowtimeList';
import Sits from './Sits';
import Reservation from './Reservation';

// "https://api.internationalshowtimes.com/v4/cities/?location=pl&query=gda"

class App extends React.Component {
    state = {
        cities: '',
        movies: [],
        selectedMovie: '',
        showtimes: [],
        showtimeId: '',
        showtimeDate: '',
        sits: [
            [0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0],
        ],
        // Viewing states
        pageView: 0b0001
    }

    onSearchSubmit = async term => {
        this.setState({
            pageView: 0b0000
        });

        const getCities = await showtimes.get('/cities', {
            params: {
                countries: 'pl',
                query: term
            }
        });

        let toDate = new Date();
        toDate.setDate(toDate.getDate() + 7);
        toDate = toDate.toISOString();

        const citiesIds = getCities.data.cities.map(c => c.id).join();

        const getMovies = await showtimes.get('/movies', {
            params: {
                city_ids: citiesIds,
                time_to: toDate
            }
        });

        this.setState({
            movies: getMovies.data.movies,
            cities: citiesIds,
            pageView: 0b0001
        });
    }

    onMovieSelect = async (movieId, movieName) => {
        this.setState({
            pageView: 0b0000
        });

        const getShowtimes = await showtimes.get('/showtimes', {
            params: {
                countries: 'pl',
                city_ids: this.state.cities,
                movie_id: movieId
            }
        });

        this.setState({
            selectedMovie: movieName,
            showtimes: getShowtimes.data.showtimes,
            pageView: 0b0010
        });
    }

    onShowtimeSelect = (showtimeId, showtimeDate) => {
        // const getShowtimes = await showtimes.get('/showtimes', {
        //     params: {
        //         countries: 'pl',
        //         city_ids: this.state.cities,
        //         movie_id: showtimeId
        //     }
        // });
        this.setState({
            showtimeId,
            showtimeDate,
            pageView: 0b0100
        }, () => console.log(this.state));
    }

    onSitSelect = (row, column) => {
        this.setState({
            pageView: 0b1000
        });
    }


    render() {
        return (
            <div>
              <SearchBar onSubmit={this.onSearchSubmit} />
              {!this.state.pageView ?
               <p>
               Loading...
               </p> : null}

              {this.state.pageView & 0b0001 ?
               <MovieList
                 movies={this.state.movies}
                 onSelect={this.onMovieSelect}
               /> : null}

              {this.state.pageView & 0b0010 ?
               <ShowtimeList
                 showtimes={this.state.showtimes}
                 showName={this.state.selectedMovie}
                 onSelect={this.onShowtimeSelect}
               /> : null}

              {this.state.pageView & 0b0100 ?
               <Sits
                 sits={this.state.sits}
                 onSelect={this.onSitSelect}
               /> : null}

              {this.state.pageView & 0b1000 ?
               <Reservation
                 title={this.state.selectedMovie}
                 date={this.state.showtimeDate}
                 id={this.state.showtimeId}
               /> : null}
            </div>
        );
    }
}

export default App;
