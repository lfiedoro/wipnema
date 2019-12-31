import React from 'react';
import showtimes from '../api/showtimes';

import SearchBar from './SearchBar';
import MovieList from './MovieList';
import ShowtimeList from './ShowtimeList';

//
// "https://api.internationalshowtimes.com/v4/cities/?location=pl&query=gda"

class App extends React.Component {
    state = {
        cities: '',
        movies: [],
        selectedMovie: '',
        showtimes: []
    }

    onSearchSubmit = async term => {
        const getCities = await showtimes.get('/cities', {
            params: {
                countries: 'pl',
                query: term
            }
        });
        console.log(getCities);

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
            cities: citiesIds
        });
    }

    onMovieSelect = async (movieId, movieName) => {
        const getShowtimes = await showtimes.get('/showtimes', {
            params: {
                countries: 'pl',
                city_ids: this.state.cities,
                movie_id: movieId
            }
        });

        this.setState({
            selectedMovie: movieName,
            showtimes: getShowtimes.data.showtimes
        });
    }

    render() {
        return (
            <div>
              <SearchBar onSubmit={this.onSearchSubmit} />
              <MovieList movies={this.state.movies} onSelect={this.onMovieSelect} />
              <ShowtimeList showtimes={this.state.showtimes} showName={this.state.selectedMovie}/>
            </div>
        );
    }
}

export default App;
