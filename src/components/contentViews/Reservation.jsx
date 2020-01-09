import React from 'react';
import PropType from 'prop-types';
import {selectedMovieStyle} from "./styles";
import {dateFormatted, showTimeHourFormatted} from "./constants";

class Reservation extends React.Component {

    state = {
        name: '',
        email: ''
    };
    formattedDate = () => {
        return (
            <h3 className={'gradientText'}>
                {showTimeHourFormatted(this.props)} {dateFormatted(this.props)}
            </h3>
        );
    };

    onReservationSubmit = (event) => {
        event.preventDefault();
        console.log(`Off we go to external api with id ${this.props.id}`);
        this.setState({}, () => this.props.onReservationSubmit({name: this.state.name, email: this.state.email}))

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
                <form onSubmit={this.onReservationSubmit}>
                    <h2>Reservation for</h2>
                    <h3>Title: {this.props.title}</h3>
                    <h3>Date: {this.props.date}</h3>
                    <h3>Selected seats: </h3>
                    Name:<br/>
                    <input type="text" name="name" value={this.state.name}
                           onChange={e => this.setState({name: e.target.value})}/>
                    <br/>
                    Email:<br/>
                    <input type="text" name="email" value={this.state.email}
                           onChange={e => this.setState({email: e.target.value})}/>
                    <br></br>
                    <input type="submit" value="Submit"/>
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
