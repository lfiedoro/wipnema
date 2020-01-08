import React from 'react';

import showtimes from '../api/showtimes';
import reservation from '../api/reservation';

import SearchBar from './SearchBar';
import Content from "./Content";
import { offPositionStyling, positionStyle } from "./contentViews/styles";
import SeatSelectedContainer from "./contentViews/SeatSelectedContainer";

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
        containerVisible: true,
        // Viewing states
        pageView: 0b0001
    };


    toggleVisibility = () => {
        this.setState(prevState => ({
            containerVisible: !prevState.containerVisible
        }));
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
        this.setState({ seatsSelected: [...seatsSelected] });
        console.log(seatsSelected);

    };

    onReservationSubmit = async customer => {
        this.setState({ customer });

        await reservation.post(`/`, {
            customer,
            showtimeId: this.state.showtimeId,
            seats: this.state.seatsSelected
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    onSeatsConfirmation = () => {
        this.setState({
            pageView: 0b00001000
        });
    };

    seatsSelectedContainerToggler = () => {
        const selectedCount = this.state.seatsSelected.length;
        return (
            <div className='animate' style={offPositionStyling(selectedCount)}>
                {selectedCount && this.state.pageView !== 0b00001000 ?
                    <SeatSelectedContainer
                        seatsSelected={this.state.seatsSelected}
                        containerVisible={this.state.containerVisible}
                        toggleVisibility={this.toggleVisibility}
                        onSeatsConfirmation={this.onSeatsConfirmation}
                    />
                    : null
                }
            </div>
        );
    };


    render() {
        return (
            <div>
                <div>
                    <SearchBar getCities={this.handleCityRequest} onSubmit={this.onSearchSubmit} />
                    <div style={positionStyle} className='landscapeMob'>
                        <div className="shader" />
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
                            selectedSeatsCount={this.state.seatsSelected.length}
                            seatsSelected={this.state.seatsSelected}
                            onMovieSelect={this.onMovieSelect}
                            onShowtimeSelect={this.onShowtimeSelect}
                            onSitSelect={this.onSeatSelect}
                            onReservationSubmit={this.onReservationSubmit}
                        />
                        <div className="shader bottom" />
                    </div>
                </div>
                {this.seatsSelectedContainerToggler()}
            </div>
        );
    }
}

export default App;
