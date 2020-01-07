import React from "react";
import Button from "@material-ui/core/Button";

const IndividualSeat = (props) => {

    const selectedSeatChecker = (x, y) => {
        return (props.seatsSelected.find(seat => seat.row === x && seat.column === y)) ? 'secondary' : 'primary';
    };

    const reservedSeatChecker = (x, y) => {
        return (props.seatsTaken.find(seat => seat.row === x && seat.column === y));
    };

    return (
        <Button size={"small"}
                disabled={reservedSeatChecker(props.x, props.y)}
                style={{minWidth: '20px'}}
                color={selectedSeatChecker(props.x, props.y)}
                onClick={(event) => props.onSitSelect(event, props.x, props.y)}
                variant="contained"
        >
            {props.y + 1}
        </Button>
    );
};

export default IndividualSeat;
