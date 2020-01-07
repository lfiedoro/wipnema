import React from 'react';

import showtimes from '../api/showtimes';
import reservation from '../api/reservation';

import SearchBar from './SearchBar';
import Content from "./Content";
import {positionStyle} from "./contentViews/styles";

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
        seats: {},
        customer: {},
        seatsTaken: [],
        seatsSelected: [],
        // Viewing states
        pageView: 0b0001
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

    onShowtimeSelect = async (showtimeId, showtimeDate) => {
        this.setState({
            pageView: 0b0000
        });

        const getSits = await reservation.get(`/showtime/${showtimeId}`);

        this.setState({
            showtimeId,
            showtimeDate,
            seats: getSits.data,
            pageView: 0b00000100
        });
    };

    onSeatSelect = (seatsSelected) => {
        this.setState({seatsSelected: [...seatsSelected]});

        // this.setState({
        //     pageView: 0b00001000
        // });
    };

    onReservationSubmit = async customer => {
        // this.setState({ customer });

        await reservation.post(`/`, {
            customer,
            showtimeId: this.state.showtimeId,
            seats: this.state.seatsTaken
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    pageViewSplitter = () => {
        return this.state.seatsSelected.length > 0 ? '90%' : '100%'
    };

    render() {
        return (
            <div>


                <div style={{maxHeight: this.pageViewSplitter()}} className='animate'>
                    <SearchBar getCities={this.handleCityRequest} onSubmit={this.onSearchSubmit}/>
                    <div style={positionStyle} className='landscapeMob'>
                        <div className="shader"/>
                        <Content
                            city={this.state.cities}
                            pageView={this.state.pageView}
                            movies={this.state.movies}
                            showtimes={this.state.showtimes}
                            selectedMovie={this.state.selectedMovie}
                            seats={this.state.seats}
                            showtimeDate={this.state.showtimeDate}
                            showtimeId={this.state.showtimeId}
                            poster={this.state.poster}
                            onMovieSelect={this.onMovieSelect}
                            onShowtimeSelect={this.onShowtimeSelect}
                            onSitSelect={this.onSeatSelect}
                            onReservationSubmit={this.onReservationSubmit}
                        />
                        <div className="shader bottom"/>
                    </div>
                </div>
                <div className='animate'
                     style={{maxHeight: (this.state.seatsSelected.length > 0) ? '10%' : '0%'}}>{this.state.seatsSelected.length}</div>
            </div>
        );
    }
}

export default App;
