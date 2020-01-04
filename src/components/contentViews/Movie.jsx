import React from 'react';
import PropType from 'prop-types';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

class Movie extends React.Component {
    state = {
        movieName: '',
        movieId: 0,
        poster: ''
    };

    onMovieSelect = () => {
        // setState accepts callback when it finishes updateing state
        // so we call onSelect, once state was updated
        this.setState({
            movieName: this.props.title,
            movieId: this.props.id,
            poster: this.props.poster
        }, () => this.props.onSelect(this.state.movieId, this.state.movieName));
    };

    moviePosterChecker = () => {
        return (!this.props.poster) ? '/img/noposter.jpg' : this.props.poster;
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
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.title}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
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
