import React from "react";
import {loadingOverlay} from "./styles";
import {loading} from "./constants";

const LoadingOverlay = (props) => {


    const loadingOverlayDiv = (
        <div style={loadingOverlay} className='animate'>
            <div>{loading()}</div>
        </div>
    );

    return !props.pageView ? loadingOverlayDiv : null

};

export default LoadingOverlay;
