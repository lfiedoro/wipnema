import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

export const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export const rowLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q",
    "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Aa", "Ab", "Ac", "Ad"];

export const dateFormatted = (props) => {
    const date = new Date(props.date);
    const dateOrdinal = () => {
        const dateLastDigit = +date.getDate().toString()[date.getDate().toString().length - 1];
        switch (dateLastDigit) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th'
        }
    };
    return `${monthNames[date.getMonth()]} ${date.getDate()}${dateOrdinal()}`;
};

export const showTimeHourFormatted = (props) => {
    const showtimeHour = new Date(props.date);
    return `${showtimeHour.getHours()}:${(showtimeHour.getMinutes().toString().length === 1)
        ? `0${showtimeHour.getMinutes()}`
        : showtimeHour.getMinutes()}`;
};

export const loading = () => {
    return (
        <div style={{margin: '20px auto', textAlign: 'center'}}>
            <CircularProgress size={170} color="secondary"/>
        </div>
    );
};
