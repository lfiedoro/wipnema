import React from 'react';
import PropType from 'prop-types';
import {reservationForm, selectedMovieStyle} from "../../../styles";
import {dateFormatted, rowLetters, showTimeHourFormatted} from "../constants";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import reservation from "../../../api/reservation";
import * as Yup from 'yup';
import {Formik} from "formik";

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};


const Reservation = (props) => {

    const formattedDate = () => {
        return (
            <h3 className={'gradientText'}>
                {showTimeHourFormatted(props)} {dateFormatted(props)}
            </h3>
        );
    };


    const seatsSelected = () => {
        return props.seatsSelected.map(seat => {
            const seatId = `${rowLetters[seat.row]}${seat.column + 1}`;
            return (
                <Chip
                    style={{marginRight: '5px', marginBottom: '3px'}}
                    key={seatId}
                    label={seatId}
                    title={seatId}
                />
            );
        })
    };

    const seatsArray = () => {
        return (
            <div className='seatsArray'>
                {seatsSelected()}
            </div>
        )
    };

    const [open, setOpen] = React.useState(false);

    const handleOpenError = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);


    };


    const baseProps = props;
    return (
        <>
            <Formik
                initialValues={{email: '', name: ''}}
                onSubmit={async (values, {setSubmitting}) => {

                    setSubmitting(true);

                    await reservation.post(`/`, {
                        customer: values,
                        showtimeId: baseProps.id,
                        seats: baseProps.seatsSelected
                    })
                        .then(res => {
                            props.onReservationSuccess()
                        })
                        .catch(err => {
                            handleOpenError();
                            console.log(err);
                        })
                }}

                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email()
                        .required('Required'),
                    name: Yup.string()
                        .required('Required')
                })}
            >

                {(props) => {
                    const {
                        values,
                        touched,
                        errors,
                        isValid,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    } = props;

                    return (
                        <div>
                            <div style={selectedMovieStyle(baseProps)}>
                                <div className='shader bottom poster'>
                                    <h2>{baseProps.title}</h2>
                                </div>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                noValidate
                                autoComplete="off"
                                style={reservationForm}
                            >
                                <h2 style={{marginBottom: '20px'}}>Reservation for</h2>
                                {formattedDate()}
                                <ExpansionPanel
                                    defaultExpanded={true}
                                    style={{marginBottom: '20px'}}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={
                                            <i className="material-icons">
                                                expand_more
                                            </i>
                                        }
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        Selected seats:
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails classes={{root: 'cardBg'}}>
                                        {seatsArray(props.seatsSelected)}
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                                <TextField
                                    required
                                    error={errors.name && touched.name}
                                    fullWidth={true}
                                    autoComplete={'name'}
                                    style={{marginBottom: '20px'}}
                                    id="name"
                                    label="Name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.name && touched.name) && errors.name}
                                    variant={"outlined"}
                                />

                                <TextField
                                    required
                                    fullWidth={true}
                                    error={errors.email && touched.email}
                                    autoComplete={'email'}
                                    style={{marginBottom: '20px'}}
                                    id="email"
                                    label="E-mail"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.email && touched.email) && errors.email}
                                    variant={"outlined"}
                                />

                                <Button
                                    variant="contained"
                                    size={"large"}
                                    color="secondary"
                                    type='submit'
                                    style={{marginBottom: '20px'}}
                                    disabled={!dirty || !isValid || isSubmitting}
                                >
                                    <i className="material-icons" style={{marginRight: '5px'}}>
                                        event_seat
                                    </i>
                                    Reserve your seats
                                </Button>
                            </form>

                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error">
                                    There was a problem while sending your reservation. Try again.
                                </Alert>
                            </Snackbar>
                        </div>
                    );
                }}
            </Formik>
        </>
    )
        ;
};


Reservation.propTypes = {
    title: PropType.string,
    date: PropType.string,
    id: PropType.string,
    seatsSelected: PropType.array,
    onReservationSuccess: PropType.func
};

export default Reservation;
