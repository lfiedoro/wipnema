import React, {Component, createContext} from "react";

export const SeatsBeingSelectedContext = createContext();

class SeatsBeingSelectedContextProvider extends Component {
    state = {
        seatsBeingSelected: false
    };


    toggleSeatsBeingSelected = (value) => {
        this.setState({seatsBeingSelected: value})
    };


    render() {
        return (
            <SeatsBeingSelectedContext.Provider
                value={{...this.state, toggleSeatsBeingSelected: this.toggleSeatsBeingSelected}}>
                {this.props.children}
            </SeatsBeingSelectedContext.Provider>
        );
    }
}

export default SeatsBeingSelectedContextProvider;
