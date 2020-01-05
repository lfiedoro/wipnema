import React from 'react';
import showtimes from '../api/showtimes';

import SearchBar from './SearchBar';
import Content from "./Content";

// "https://api.internationalshowtimes.com/v4/cities/?location=pl&query=gda"

class App extends React.Component {
    state = {
        cities: '',
        movies: [],
        selectedMovie: '',
        showtimes: [],
        showtimeId: '',
        showtimeDate: '',
        poster: '',
        sits: [
            [0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0],
        ],
        // Viewing states
        pageView: 0b0001
    };

    positionStyle = {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexFlow: 'column nowrap',
        width: '100%',
        height: '90%'
    };

    handleCityRequest = async term => {
        return await showtimes.get('/cities', {
            params: {
                countries: 'pl',
                query: term
            }
        });
    };

    onSearchSubmit = async term => {
        this.setState({
            pageView: 0b0000
        });

        let toDate = new Date();
        toDate.setDate(toDate.getDate() + 7);
        toDate = toDate.toISOString();

        const getMovies = await showtimes.get('/movies', {
            params: {
                city_ids: term,
                time_to: toDate
            }
        });

        this.setState({
            movies: getMovies.data.movies,
            cities: term,
            pageView: 0b0001
        });
    };

    onMovieSelect = async (movieId, movieName, poster) => {
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
            poster: poster,
            pageView: 0b0010
        });
    };

    onShowtimeSelect = (showtimeId, showtimeDate) => {
        this.setState({
            showtimeId,
            showtimeDate,
            pageView: 0b0100
        }, () => console.log(this.state));
    };

    onSitSelect = (row, column) => {
        this.setState({
            pageView: 0b1000
        });
    };

    render() {
        return (
            <div>
                <SearchBar getCities={this.handleCityRequest} onSubmit={this.onSearchSubmit}/>
                <div style={this.positionStyle}>
                    <div className="shader"/>
                    <Content
                        city={this.state.cities}
                        pageView={this.state.pageView}
                        movies={this.state.movies}
                        showtimes={this.state.showtimes}
                        selectedMovie={this.state.selectedMovie}
                        sits={this.state.sits}
                        showtimeDate={this.state.showtimeDate}
                        showtimeId={this.state.showtimeId}
                        poster={this.state.poster}
                        onMovieSelect={this.onMovieSelect}
                        onShowtimeSelect={this.onShowtimeSelect}
                        onSitSelect={this.onSitSelect}
                    />
                    <div className="shader bottom"/>
                </div>
            </div>
        );
    }
}

export default App;
