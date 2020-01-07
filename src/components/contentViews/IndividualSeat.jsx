import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import {rowLetters} from "./constants";
import PropType from "prop-types";

const IndividualSeat = (props) => {

    const [open, setOpen] = React.useState(false);

    const selectedSeatChecker = (x, y) => {
        return (props.seatsSelected.find(seat => seat.row === x && seat.column === y)) ? 'secondary' : 'primary';
    };

    const reservedSeatChecker = (x, y) => {
        return (props.seatsTaken.find(seat => seat.row === x && seat.column === y));
    };

    const tooltipResolver = (x, y) => {
        return `${rowLetters[x]}${y + 1}`
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    const handleTooltipClose = () => {
        setOpen(false);
    };

    return (
        <Tooltip
            open={open}
            onClose={handleTooltipClose}
            title={tooltipResolver(props.x, props.y)}
        >
            <Button
                size={"small"}
                disabled={reservedSeatChecker(props.x, props.y)}
                style={{minWidth: '20px'}}
                color={selectedSeatChecker(props.x, props.y)}
                onClick={(event) => {
                    handleTooltipOpen();
                    props.onSitSelect(event, props.x, props.y);
                }}
                variant="contained"
            >
                {props.y + 1}
            </Button>
        </Tooltip>
    );
};

IndividualSeat.propTypes = {
    x: PropType.number,
    y: PropType.number,
    seatsTaken: PropType.array,
    seatsSelected: PropType.array,
    onSitSelect: PropType.func,
};

export default IndividualSeat;
