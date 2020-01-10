import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import PropType from "prop-types";
import {rowLetters} from "./constants";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import {offPositionStyling} from "../../styles";
import {SeatsSelectedContext} from "../contexts/SeatsSelectedContext";

class SeatSelectedContainer extends Component {

    static contextType = SeatsSelectedContext;


    seatsSelected = () => {
        const {onSeatRemove, seatsSelected} = this.context;
        return seatsSelected.map(seat => {
            const seatId = `${rowLetters[seat.row]}${seat.column + 1}`;
            return (
                <Chip
                    style={{marginRight: '5px', marginBottom: '3px'}}
                    onDelete={() => onSeatRemove(seat)}
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


    seatContainer = () => {
        const {seatsSelected} = this.context;
        return (
            <div className='animate landscapeContainer' style={offPositionStyling(seatsSelected.length)}>
                <div style={this.props.containerVisible ? {maxHeight: '100%'} : {maxHeight: '90px'}}
                     className='selectedSeatContainer animate'>
                    <div>
                        <div onClick={this.props.toggleVisibility}>
                            <IconButton aria-label="delete">
                                <i style={this.props.containerVisible ? {transform: 'rotate(0deg)'} : {transform: 'rotate(180deg)'}}
                                   className="material-icons animate">
                                    expand_more
                                </i>
                            </IconButton>
                            <h3 className='gradientText' style={{fontSize: '1rem', cursor: 'pointer'}}>Selected
                                seats</h3>
                        </div>
                        {this.props.containerVisible ? this.seatsArray(seatsSelected) : null}
                    </div>
                    <Tooltip title="Reserve selected seats">
                        <Button onClick={this.props.onSeatsConfirmation} variant="contained" color="secondary">
                            <i className="material-icons">
                                event_seat
                            </i>
                        </Button>
                    </Tooltip>
                </div>
            </div>
        );
    };


    render() {
        const {seatsSelected} = this.context;
        return seatsSelected.length && this.props.pageView === 0b0100 ? this.seatContainer() : null;
    }
}

SeatSelectedContainer.propTypes = {
    pageView: PropType.number,
    containerVisible: PropType.bool,
    toggleVisibility: PropType.func,
    onSeatsConfirmation: PropType.func
};

export default SeatSelectedContainer;
