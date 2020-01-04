import React from "react";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ShowTimeDateView from "./ShowTimeDateView";

const ShowTimeMonthView = (props) => {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const showtimesFilteredByDay = props.dates.map(date => {
        const filteredShowtimes = props.showtimes.filter(showtime => new Date(showtime.start_at).getDate() === date)
        return (
            <ShowTimeDateView
                key={date}
                showtimes={filteredShowtimes}
                date={date}
                title={props.title}
                onSelect={props.onSelect}
            />
        );
    });

    const expanded = new Date(Date.now()).getMonth() === props.month;

    return (
        <ExpansionPanel defaultExpanded={expanded}>
            <ExpansionPanelSummary
                expandIcon={<i className="material-icons">
                    expand_more
                </i>}
            >
                <Typography>{monthNames[props.month]}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
                classes={{root: 'cardBg'}}
            >
                {showtimesFilteredByDay}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default ShowTimeMonthView;
