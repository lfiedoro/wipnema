import React, {Component} from "react";
import {loadingOverlay} from "./styles";
import {loading} from "./constants";
import {SeatsBeingSelectedContext} from "../contexts/SeatsBeingSelectedContext";

class LoadingOverlay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            seatsBeingSelected: false
        }
    }

    static contextType = SeatsBeingSelectedContext;

    componentDidMount() {
        const {seatsBeingSelected} = this.context;
        this.setState({seatsBeingSelected: seatsBeingSelected})
    }

    render() {
        console.log(this.state.seatsBeingSelected);
        const loadingOverlayDiv = (
            <div style={loadingOverlay} className='animate'>
                <div>{loading()}</div>
            </div>
        );

        return this.state.seatsBeingSelected ? loadingOverlayDiv : null

    }
}

export default LoadingOverlay;
