import React, {Component} from 'react';
import {CSSTransition} from 'react-transition-group';
import '../styles/viewAnimation.css'
import '../styles/globalcss/globalcss.css'

import showtimes from '../api/showtimes';
import reservation from '../api/reservation';

import SearchBar from './contentViews/SearchBar';
import Content from "./contentViews/Content";
import SeatSelectedContainer from "./contentViews/SeatSelectedContainer";
import SeatsSelectedContextProvider from "./contexts/SeatsSelectedContext";
import LoadingOverlay from "./contentViews/LoadingOverlay";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            containerVisible: true,
            // Viewing states
            pageView: 0b0001
        };
    }

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

    onSeatsConfirmation = () => {
        this.setState({
            pageView: 0b00001000
        });
    };

    onReservationSuccess = () => {
        this.setState({
            pageView: 0b00001100,
            cities: '',
            movies: [],
            selectedMovie: '',
            showtimes: [],
            showtimeId: '',
            showtimeDate: '',
            poster: '',
            seats: {},
            customer: {},
            seatsTaken: []
        });
    };


    render() {
        return (
            <div>
                <SeatsSelectedContextProvider>
                    <div>
                        <SearchBar getCities={this.handleCityRequest}
                                   onSubmit={this.onSearchSubmit}
                        />
                        <LoadingOverlay pageView={this.state.pageView}/>
                        <CSSTransition
                            in={this.state.pageView !== 0b0000}
                            appear={true}
                            timeout={300}
                            classNames="view"
                        >
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
                                onReservationSuccess={this.onReservationSuccess}
                                onMovieSelect={this.onMovieSelect}
                                onShowtimeSelect={this.onShowtimeSelect}
                            />
                        </CSSTransition>
                    </div>
                    <SeatSelectedContainer
                        containerVisible={this.state.containerVisible}
                        toggleVisibility={this.toggleVisibility}
                        onSeatsConfirmation={this.onSeatsConfirmation}
                        pageView={this.state.pageView}
                    />
                </SeatsSelectedContextProvider>
            </div>
        );
    }
}

export default App;
