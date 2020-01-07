import React from 'react';
import PropType from 'prop-types';
import Chip from "@material-ui/core/Chip";
import {showTimeHourFormatted} from "./constants";

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
        return <Chip
            onClick={this.onDateSelect}
            label={showTimeHourFormatted(this.props)}
            title={`${showTimeHourFormatted(this.props)} - ${this.props.title}`}
            poster={this.props.poster}
            date={this.props.date}
            disabled={this.disabled}
        />
    }
}

Showtime.propTypes = {
    title: PropType.string,
    poster: PropType.string,
    id: PropType.string,
    date: PropType.string,
    onSelect: PropType.func
};

export default Showtime;
