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
        height: '100%'
    };


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
    };

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
    };

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
    };

    onSitSelect = (row, column) => {
        this.setState({
            pageView: 0b1000
        });
    };


    render() {
        return (
            <div>
                <SearchBar onSubmit={this.onSearchSubmit}/>
                <div style={this.positionStyle}>
                    <div className="shader"/>
                    <Content
                        pageView={this.state.pageView}
                        movies={this.state.movies}
                        showtimes={this.state.showtimes}
                        selectedMovie={this.state.selectedMovie}
                        sits={this.state.sits}
                        showtimeDate={this.state.showtimeDate}
                        showtimeId={this.state.showtimeId}
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
