import React from 'react';
import PropType from 'prop-types';
import {overflowDiv, rowStyles, selectedMovieStyle} from "./styles";
import {dateFormatted, rowLetters, showTimeHourFormatted} from "./constants";
import Button from "@material-ui/core/Button";

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

        console.log(this.state.seatsSelected.find(seat => seat.row === seatSelected.row && seat.column === seatSelected.column));
        if (!this.state.seatsSelected.find(seat => seat.row === seatSelected.row && seat.column === seatSelected.column)) {
            this.setState({
                seatsSelected: [...this.state.seatsSelected, seatSelected]
            });
            console.log(this.state.seatsSelected);
        } else {
            const filteredSeatsTakenArray = this.state.seatsSelected.filter(seat => !(seat.row === seatSelected.row && seat.column === seatSelected.column));
            console.log(filteredSeatsTakenArray);
            this.setState({
                seatsSelected: [...filteredSeatsTakenArray]
            })
        }

    };

    selectedSeatChecker = (x, y) => {
        return (this.state.seatsSelected.find(seat => seat.row === x && seat.column === y)) ? 'secondary' : 'primary';
    };


    createEmpty(seats) {
        for (let x = 0; x < this.props.seats.rowLength; x++) {
            seats[x] = [];
            for (let y = 0; y < this.props.seats.rows; y++) {
                seats[x][y] = (
                    <Button size={"small"}
                            style={{minWidth: '20px'}}
                            color={this.selectedSeatChecker(x, y)}
                            onClick={(event) => this.onSitSelect(event, x, y)}
                            variant="contained"
                    >
                        {y + 1}
                    </Button>
                );
            }
        }
    }

    markTaken(seats) {
        for (let seat of this.props.seats.seatsTaken) {
            seats[seat.row][seat.number] = "🐈";
        }
    }

    seatsGridDrawer = () => {
        const seats = [];
        this.createEmpty(seats);
        this.markTaken(seats);

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
