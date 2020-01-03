import React from 'react';
import PropType from 'prop-types';

class Reservation extends React.Component {
    onReservationSubmit = (event) => {
        event.preventDefault();
        console.log(`Off we go to external api with id ${this.props.id}`);
    }

    render() {
        return (
            <form onSubmit={this.onReservationSubmit}>
              <h2>Reservation for</h2>
              <h3>Title: {this.props.title}</h3>
              <h3>Date: {this.props.date}</h3>
              First name:<br/>
              <input type="text" name="name" value="" />
              <br/>
              Last name:<br/>
              <input type="text" name="email" value="" />
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
    row: PropType.number,
    column: PropType.number
};

export default Reservation;
