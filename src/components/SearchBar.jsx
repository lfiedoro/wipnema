import React from 'react';
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {formStyles} from "./contentViews/styles";

class SearchBar extends React.Component {

    state = {
        term: '',
        cities: []
    };


    citiesItems = [];

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.term);
    };

    handleFindCurrentLocation = () => {

        navigator.geolocation.getCurrentPosition(position => {
            const _ = require('lodash');

            const fractionDigit = 1;

            const lat = position.coords.latitude.toFixed(fractionDigit);
            const lon = position.coords.longitude.toFixed(fractionDigit);
            const location = {lat: +lat, lon: +lon};


            const proximity = this.state.cities.map(city => {
                return {
                    id: city.id,
                    lat: Math.abs(city.lat.toFixed(fractionDigit) - location.lat),
                    lon: Math.abs(city.lon.toFixed(fractionDigit) - location.lon)
                }
            });

            const closest = _.sortBy(proximity, ['lat', 'lon'])[0].id;
            this.setState({term: closest});
        });


    };

    handlePopulateSelect = () => {
        const _ = require('lodash');
        const sortedCities = _.sortBy(this.state.cities, "name");
        this.citiesItems = [...sortedCities.map(city => {
            return (
                <MenuItem
                    key={city.id}
                    value={city.id}
                    button={true}
                >
                    {city.name}
                </MenuItem>
            );
        })];
    };


    componentDidMount = async () => {
        const getCities = await this.props.getCities('');
        this.setState({
            cities: [...getCities.data.cities]
        });
    };

    render() {
        this.handlePopulateSelect();
        return (
            <div>
                <form>
                    <div style={formStyles} className="formClass">
                        <Button
                            disabled={!this.citiesItems.length}
                            onClick={this.handleFindCurrentLocation}
                            style={{marginRight: '5px'}}
                            variant="contained"
                            size={"large"}
                            color="primary"
                        >
                            <i className="material-icons">
                                my_location
                            </i>
                        </Button>
                        <FormControl
                            disabled={!this.citiesItems.length}
                            size={"small"}
                            fullWidth={true}
                            variant="filled"
                        >
                            <InputLabel>Select a city</InputLabel>
                            <Select value={this.state.term}
                                    onChange={(e) => this.setState({term: e.target.value})}>
                                {this.citiesItems}
                            </Select>
                        </FormControl>
                        <Button
                            disabled={!this.state.term}
                            onClick={this.onFormSubmit}
                            style={{marginLeft: '5px'}}
                            variant="contained"
                            size={"large"}
                            color="secondary"
                        >
                            <i className="material-icons">
                                local_movies
                            </i>
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func
};

export default SearchBar;
