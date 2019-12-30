import React from 'react';
import showtimes from '../api/showtimes';

import SearchBar from './SearchBar';
import MovieList from './MovieList';

//
// "https://api.internationalshowtimes.com/v4/cities/?location=pl&query=gda"

class App extends React.Component {
    state = { movies: [] }

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

        const citiesIds = getCities.data.cities.map(c => c.id);
        console.log(citiesIds);

        const getMovies = await showtimes.get('/movies', {
            params: {
                city_ids: citiesIds.join(),
                time_to: toDate
            }
        });

        this.setState({ movies: getMovies.data.movies });
    }

    render() {
        return (
            <div>
              <SearchBar onSubmit={this.onSearchSubmit} />
              <MovieList movies={this.state.movies} />
            </div>
        );
    }
}

export default App;
