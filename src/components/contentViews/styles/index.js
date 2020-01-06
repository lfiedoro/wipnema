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
        borderBottom: 'rgb(77, 133, 149) solid 2px',
        position: 'relative'
    }
};

export const overflowDiv = {
    position: 'relative',
    height: '100%',
    width: '100%',
    zIndex: '2'
};

export const rowStyles = {
    borderSpacing: '5px'
};
