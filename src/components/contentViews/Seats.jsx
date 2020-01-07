import React from 'react';
import PropType from 'prop-types';
import {overflowDiv, rowStyles, selectedMovieStyle} from "./styles";
import {dateFormatted, rowLetters, showTimeHourFormatted} from "./constants";
import IndividualSeat from "./IndividualSeat";

class Seats extends React.Component {
    state = {
        seatsSelected: [],
        seatsTaken: []
    };


    formattedDate = () => {
        return (
            <h3 className={'gradientText'}>
                {showTimeHourFormatted(this.props)} {dateFormatted(this.props)}
            </h3>
        );
    };


    onSitSelect = (event, x, y) => {
        const seatSelected = {row: x, column: y};

        if (!this.state.seatsSelected.find(seat => seat.row === seatSelected.row && seat.column === seatSelected.column)) {
            this.setState({
                seatsSelected: [...this.state.seatsSelected, seatSelected]
            },() => this.props.onSelect(this.state.seatsSelected));
        } else {
            const filteredSeatsTakenArray = this.state.seatsSelected.filter(seat => !(seat.row === seatSelected.row && seat.column === seatSelected.column));
            this.setState({
                seatsSelected: [...filteredSeatsTakenArray]
            }, () => this.props.onSelect(filteredSeatsTakenArray))
        }
    };

    createEmpty(seats) {
        for (let x = 0; x < this.props.seats.rowLength; x++) {
            seats[x] = [];
            for (let y = 0; y < this.props.seats.rows; y++) {
                seats[x][y] = (
                    <IndividualSeat
                        x={x}
                        y={y}
                        seatsTaken={this.state.seatsTaken}
                        seatsSelected={this.state.seatsSelected}
                        onSitSelect={this.onSitSelect}
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
                    <table style={{borderCollapse: 'separate'}}>
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
        })
    }

}

Seats.propTypes = {
    seats: PropType.object,
    title: PropType.string,
    poster: PropType.string,
    onSelect: PropType.func
};

export default Seats;
