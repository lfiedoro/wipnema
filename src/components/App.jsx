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
        sits: [],
        // Viewing states
        pageView: 0b00000001
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

    onSearchSubmit = async term => {
        this.setState({
            pageView: 0b01000000
        });

        const getCities = await showtimes.get('/cities', {
            params: {
                countries: 'pl',
                query: term
            }
        });

        //If no movies found, bail out
        if(!getCities.data.meta_info.total_count) {
            console.log(getCities.data.meta_info.total_count);
            this.setState({
                pageView: 0b10000000
            });
            return;
        }

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
            pageView: 0b00000001
        });
    };

    onMovieSelect = async (movieId, movieName, poster) => {
        this.setState({
            pageView: 0b01000000
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
            pageView: 0b00000010,
            poster: poster
        });
    };

    onShowtimeSelect = async (showtimeId, showtimeDate) => {
        this.setState({
            pageView: 0b01000000
        });

        const getSits = await reservation.get(`/bookings/${showtimeId}`);

        this.setState({
            showtimeId,
            showtimeDate,
            sits: getSits.data,
            pageView: 0b00000100
        }, () => console.log(this.state));
    };

    onSitSelect = (row, column) => {
        this.setState({
            pageView: 0b00001000
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
