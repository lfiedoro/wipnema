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

export const contentWrapper = {
    height: '100%',
    width: '95%',
    padding: '10px 0',
    zIndex: 2,
    boxSizing: 'border-box',
    overflowY: 'auto'
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
