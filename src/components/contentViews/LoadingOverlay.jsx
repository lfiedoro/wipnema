import React, {Component} from "react";
import {loadingOverlay} from "./styles";
import {loading} from "./constants";
import {SeatsBeingSelectedContext} from "../contexts/SeatsBeingSelectedContext";

class LoadingOverlay extends Component {

    static contextType = SeatsBeingSelectedContext;

    render() {

        const {seatsBeingSelected} = this.context;

        const loadingOverlayDiv = (

            <div style={loadingOverlay} className='animate'>
                <div>{loading()}</div>
            </div>
        );

        return seatsBeingSelected ? loadingOverlayDiv : null

    }
}

export default LoadingOverlay;
