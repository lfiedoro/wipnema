import React, {Component, createContext} from "react";

export const SeatsBeingSelectedContext = createContext();

class SeatsBeingSelectedContextProvider extends Component {
    state = {
        seatsBeingSelected: false,
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

    render() {
        return (
            <SeatsBeingSelectedContext.Provider
                value={{
                    ...this.state,
                    toggleSeatsBeingSelected: this.toggleSeatsBeingSelected,
                    onSeatSelect: this.onSeatSelect,
                    onSeatRemove: this.onSeatRemove
                }}
            >
                {this.props.children}
            </SeatsBeingSelectedContext.Provider>
        );
    }
}

export default SeatsBeingSelectedContextProvider;
