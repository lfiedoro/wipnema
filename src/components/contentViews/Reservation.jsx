import React from 'react';
import PropType from 'prop-types';



class Reservation extends React.Component {
    state = {
        name: '',
        email: ''
    };

    onReservationSubmit = (event) => {
        event.preventDefault();
        console.log(`Off we go to external api with id ${this.props.id}`);
        this.setState({
        }, () => this.props.onReservationSubmit({ name: this.state.name, email: this.state.email }))

    };

    render() {
        return (
            <form onSubmit={this.onReservationSubmit}>
                {console.log(this.props.seatsSelected)}
                <h2>Reservation for</h2>
                <h3>Title: {this.props.title}</h3>
                <h3>Date: {this.props.date}</h3>
                <h3>Selected seats: </h3>
                Name:<br />
                <input type="text" name="name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                <br />
                Email:<br />
                <input type="text" name="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                <br></br>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

Reservation.propTypes = {
    title: PropType.string,
    date: PropType.string,
    id: PropType.string,
    seatsSelected: PropType.array,

    onReservationSubmit: PropType.func
};

export default Reservation;
