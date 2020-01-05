import React from 'react';
import PropType from 'prop-types';
import Chip from "@material-ui/core/Chip";

class Showtime extends React.Component {
    state = {
        showtimeId: '',
        showtimeDate: ''
    };

    disabled = Date.now() > new Date(this.props.date);


    onDateSelect = () => {
        this.setState({
            showtimeId: this.props.id,
            showtimeDate: this.props.date
        }, () => this.props.onSelect(this.state.showtimeId,
            this.state.showtimeDate));
    };


    render() {
        const showtimeHour = new Date(this.props.date);
        const showTimeHourFormatted = `${showtimeHour.getHours()}:${(showtimeHour.getMinutes().toString().length === 1)
            ? `0${showtimeHour.getMinutes()}`
            : showtimeHour.getMinutes()}`;

        return <Chip
            onClick={this.onDateSelect}
            label={showTimeHourFormatted}
            disabled={this.disabled}
        />
    }
}

Showtime.propTypes = {
    title: PropType.string,
    id: PropType.string,
    date: PropType.string,
    onSelect: PropType.func
};

export default Showtime;
