import React from 'react';
import PropType from 'prop-types';

class Showtime extends React.Component {
    state = {
        showtimeId: '',
        showtimeDate: ''
    }

    onDateSelect = () => {
        // setState accepts callback when it finishes updateing state
        // so we call onSelect, once state was updated
        this.setState({
            showtimeId: this.props.id,
            showtimeDate: this.props.date
        }, () => this.props.onSelect(this.state.showtimeId,
                                     this.state.showtimeDate));
    }

    render() {
        return <li
                 onClick={this.onDateSelect}
               >
                 <p>{this.props.title}</p>
                 <p>{this.props.date}</p>
               </li>;
    }
}

Showtime.propTypes = {
    title: PropType.string,
    id: PropType.string,
    date: PropType.string,
    onSelect: PropType.func
};

export default Showtime;
