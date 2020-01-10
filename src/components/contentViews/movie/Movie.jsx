import React from 'react';
import PropType from 'prop-types';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import noPoster from './../../../img/noposter.jpg'

class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieName: '',
            movieId: 0,
            poster: ''
        };
    }

    onMovieSelect = () => {
        // setState accepts callback when it finishes updateing state
        // so we call onSelect, once state was updated
        this.setState({
            movieName: this.props.title,
            movieId: this.props.id,
            poster: this.moviePosterChecker()
        }, () => this.props.onSelect(this.state.movieId, this.state.movieName, this.moviePosterChecker()));
    };

    moviePosterChecker = () => {
        return (!this.props.poster) ? noPoster : this.props.poster;
    };

    render() {
        return (
            <div style={{margin: '20px auto'}}>
                <Card>
                    <CardActionArea onClick={this.onMovieSelect}>
                        <CardMedia
                            component="img"
                            image={this.moviePosterChecker()}
                            title={this.props.title}
                            height="100"
                        />
                        <CardContent
                            classes={{root: 'cardBg card'}}
                        >
                            <Typography gutterBottom variant="h6" component="h2">
                                {this.props.title}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions
                        classes={{root: 'cardBg movies'}}
                    >
                        <Button
                            onClick={this.onMovieSelect}
                            size="small"
                            color="secondary"
                            className='gradientText'>
                            Check showtimes
                        </Button>

                    </CardActions>
                </Card>
            </div>
        );
    }
}

Movie.propTypes = {
    title: PropType.string,
    id: PropType.string,
    poster: PropType.string,
    onSelect: PropType.func
};

export default Movie;
