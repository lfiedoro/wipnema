import React, {Component, createContext} from "react";

export const SeatsSelectedContext = createContext();

class SeatsSelectedContextProvider extends Component {
    state = {
        seatsSelected: []
    };


    toggleSeatsBeingSelected = (value) => {
        this.setState({seatsBeingSelected: value})
    };

    onSeatSelect = (seatSelected) => {
        this.setState({seatsSelected: [...this.state.seatsSelected, seatSelected]});
    };

    onSeatRemove = (seatSelected) => {
        const filteredSeatsTakenArray = this.state.seatsSelected.filter(seat => !(seat.row === seatSelected.row && seat.column === seatSelected.column));
        this.setState({seatsSelected: [...filteredSeatsTakenArray]});
    };

    clearSelectedSeats = () => {
        this.setState({seatsSelected: []})
    };

    render() {
        return (
            <SeatsSelectedContext.Provider
                value={{
                    ...this.state,
                    toggleSeatsBeingSelected: this.toggleSeatsBeingSelected,
                    onSeatSelect: this.onSeatSelect,
                    onSeatRemove: this.onSeatRemove,
                    clearSelectedSeats: this.clearSelectedSeats
                }}
            >
                {this.props.children}
            </SeatsSelectedContext.Provider>
        );
    }
}

export default SeatsSelectedContextProvider;
