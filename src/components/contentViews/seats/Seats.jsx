import React from 'react';
import PropType from 'prop-types';
import {overflowDiv, rowStyles, selectedMovieStyle} from "../../../styles";
import {dateFormatted, rowLetters, showTimeHourFormatted} from "../constants";
import IndividualSeat from "./IndividualSeat";
import {SeatsSelectedContext} from "../../contexts/SeatsSelectedContext";

class Seats extends React.Component {


    state = {
        seatsTaken: []
    };

    static contextType = SeatsSelectedContext;


    formattedDate = () => {
        return (
            <h3 className={'gradientText'}>
                {showTimeHourFormatted(this.props)} {dateFormatted(this.props)}
            </h3>
        );
    };


    onSitSelect = (event, x, y) => {
        const {seatsSelected, onSeatSelect, onSeatRemove} = this.context;
        const seatSelected = {row: x, column: y};

        if (!seatsSelected.find(seat => seat.row === seatSelected.row && seat.column === seatSelected.column)) {
            onSeatSelect(seatSelected)
        } else {
            onSeatRemove(seatSelected)
        }
    };

    createEmpty(seats) {
        const {seatsSelected, toggleSeatsBeingSelected} = this.context;
        for (let x = 0; x < this.props.seats.rowLength; x++) {
            seats[x] = [];
            for (let y = 0; y < this.props.seats.rows; y++) {
                seats[x][y] = (
                    <IndividualSeat
                        x={x}
                        y={y}
                        seatsTaken={this.state.seatsTaken}
                        seatsSelected={seatsSelected}
                        onSitSelect={this.onSitSelect}
                        toggleSeatsBeingSelected={toggleSeatsBeingSelected}
                    />
                );
            }
        }
    }

    seatsGridDrawer = () => {
        const seats = [];
        this.createEmpty(seats);
        let key = 0;

        return seats.map((row, index) => {
            return (
                <tr style={rowStyles} key={key++}>
                    <td className='gradientText'>
                        {rowLetters[index]}
                    </td>
                    {row.map((s) => {
                        return <td style={{verticalAlign: 'middle'}} key={key++}>{s}</td>;
                    })}
                </tr>
            );
        });
    };

    render() {
        return (
            <div>
                <div style={selectedMovieStyle(this.props)}>
                    <div className='shader bottom poster'>
                        <h2>{this.props.title}</h2>
                        {this.formattedDate()}
                    </div>
                </div>
                <div style={overflowDiv}>
                    <table id='seatsTable' style={{borderCollapse: 'separate'}}>
                        <tbody>
                        {this.seatsGridDrawer()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    componentDidMount = () => {
        this.setState({
            seatsTaken: [...this.props.seats.seatsTaken]
        });
    }

}

Seats.propTypes = {
    seats: PropType.object,
    title: PropType.string,
    poster: PropType.string,
};

export default Seats;
