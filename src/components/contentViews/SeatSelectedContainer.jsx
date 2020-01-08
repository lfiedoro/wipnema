import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import PropType from "prop-types";
import {rowLetters} from "./constants";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";

const SeatSelectedContainer = (props) => {

    const seatsSelected = props.seatsSelected.map(seat => {
        const seatId = `${rowLetters[seat.row]}${seat.column + 1}`;
        return (
            <Chip
                style={{marginRight: '5px'}}
                key={seatId}
                label={seatId}
                title={seatId}
            />
        );
    });
    const seatsArray = () => {
        return (
            <div className='seatsArray'>
                {seatsSelected}
            </div>
        )
    };

    return (
        <div style={props.containerVisible ? {maxHeight: '100%'} : {maxHeight: '90px'}}
             className='selectedSeatContainer animate'>
            <div>
                <div onClick={props.toggleVisibility}>
                    <IconButton

                        aria-label="delete">
                        <i style={props.containerVisible ? {transform: 'rotate(0deg)'} : {transform: 'rotate(180deg)'}}
                           className="material-icons animate">
                            expand_more
                        </i>
                    </IconButton>
                    <h3 className='gradientText' style={{fontSize: '1rem', cursor: 'pointer'}}>Selected
                        seats {props.containerVisible ? ':' : `(${props.seatsSelected.length})`}</h3>
                </div>
                {props.containerVisible ? seatsArray() : null}
            </div>
            <Tooltip
                title="Reserve selected seats"
            >
                <Button onClick={props.onSeatsConfirmation} variant="contained" color="secondary">
                    <i className="material-icons">
                        event_seat
                    </i>
                </Button>
            </Tooltip>
        </div>
    );

};

SeatSelectedContainer.propTypes = {
    seatsSelected: PropType.array,
    containerVisible: PropType.bool,
    toggleVisibility: PropType.func,
    onSeatsConfirmation: PropType.func
};

export default SeatSelectedContainer;
