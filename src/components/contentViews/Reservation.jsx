import React from 'react';
import PropType from 'prop-types';
import {reservationForm, selectedMovieStyle} from "./styles";
import {dateFormatted, rowLetters, showTimeHourFormatted} from "./constants";
import {SeatsSelectedContext} from "../contexts/SeatsSelectedContext";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

class Reservation extends React.Component {

    state = {
        name: '',
        email: ''
    };

    static contextType = SeatsSelectedContext;


    formattedDate = () => {
        return (
            <h3 className={'gradientText'}>
                {showTimeHourFormatted(this.props)} {dateFormatted(this.props)}
            </h3>
        );
    };

    onReservationSubmit = (event) => {
        event.preventDefault();
        this.props.onReservationSubmit({name: this.state.name, email: this.state.email})
    };

    seatsSelected = () => {
        const {seatsSelected} = this.context;
        return seatsSelected.map(seat => {
            const seatId = `${rowLetters[seat.row]}${seat.column + 1}`;
            return (
                <Chip
                    style={{marginRight: '5px', marginBottom: '3px'}}
                    key={seatId}
                    label={seatId}
                    title={seatId}
                />
            );
        })
    };

    seatsArray = () => {
        return (
            <div className='seatsArray'>
                {this.seatsSelected()}
            </div>
        )
    };

    render() {
        const {seatsSelected} = this.context;
        return (
            <div>
                <div style={selectedMovieStyle(this.props)}>
                    <div className='shader bottom poster'>
                        <h2>{this.props.title}</h2>
                    </div>
                </div>

                <form
                    onSubmit={this.onReservationSubmit}
                    noValidate
                    autoComplete="off"
                    style={reservationForm}
                >
                    <h2 style={{marginBottom: '20px'}}>Reservation for</h2>

                    {this.formattedDate()}

                    <ExpansionPanel
                        defaultExpanded={true}
                        style={{marginBottom: '20px'}}
                    >
                        <ExpansionPanelSummary
                            expandIcon={<i className="material-icons">
                                expand_more
                            </i>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            Selected seats:
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails classes={{root: 'cardBg'}}>
                            {this.seatsArray(seatsSelected)}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <TextField
                        required
                        fullWidth={true}
                        autoComplete={'name'}
                        style={{marginBottom: '20px'}}
                        id="name"
                        label="Name"
                        value={this.state.name}
                        variant={"outlined"}
                        onChange={e => this.setState({name: e.target.value})}
                    />

                    <TextField
                        required
                        fullWidth={true}
                        autoComplete={'email'}
                        style={{marginBottom: '20px'}}
                        type='email'
                        id="email"
                        label="E-mail"
                        value={this.state.email}
                        variant={"outlined"}
                        onChange={e => this.setState({email: e.target.value})}
                    />

                    <Button
                        variant="contained"
                        color="secondary"
                        type='submit'
                    >
                        <i className="material-icons" style={{marginRight:'5px'}}>
                            event_seat
                        </i>
                        Reserve your seats
                    </Button>
                </form>
            </div>
        );
    }
}

Reservation.propTypes = {
    title: PropType.string,
    date: PropType.string,
    id: PropType.string,
    onReservationSubmit: PropType.func
};

export default Reservation;
