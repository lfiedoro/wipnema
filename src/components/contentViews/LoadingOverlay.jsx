import React, {Component} from "react";
import {loadingOverlay} from "./styles";
import {loading} from "./constants";
import {SeatsBeingSelectedContext} from "../contexts/SeatsBeingSelectedContext";

class LoadingOverlay extends Component {

    static contextType = SeatsBeingSelectedContext;

    loadingOverlayDiv = (
        <div style={loadingOverlay} className='animate'>
            <div>{loading()}</div>
        </div>
    );


    render() {
        const {seatsBeingSelected} = this.context;
        return seatsBeingSelected ? this.loadingOverlayDiv : null
    }
}

export default LoadingOverlay;
