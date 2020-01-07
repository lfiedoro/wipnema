export const selectedMovieStyle = (props) => {
    const height = !props.date ? '140px' : '80px';


    return {
        background: `url(${props.poster}) no-repeat 50% 50% / cover`,
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        height: height,
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'flex-end',
        position: 'relative'
    }
};

export const offPositionStyling = (seatsCount) => {

    const handleToggleView = seatsCount ? 'translateY(5%)' : 'translateY(150%)';

    return {
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        minHeight: '10%',
        margin: '0 auto',
        zIndex: 5,
        transform: handleToggleView
    }
};

export const positionStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexFlow: 'column nowrap',
    width: '100%',
    height: '90%'
};

export const contentWrapper = (selectedSeatsCount) => {
    return {
        height: '100%',
        width: '95%',
        padding: '10px 0',
        zIndex: 2,
        boxSizing: 'border-box',
        overflowY: 'auto',
        paddingBottom: selectedSeatsCount ? '80px' : 'unset'
    }
};

export const formStyles = {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center'
};

export const overflowDiv = {
    position: 'relative',
    height: '100%',
    width: '100%',
    zIndex: '2',
    overflow: 'auto'
};

export const rowStyles = {
    borderSpacing: '5px'
};
