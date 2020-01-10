import React from "react";
import success from '../../../img/success.svg'

const ReservationSuccess = () => {
    return (
        <div style={{textAlign: 'center'}}>
            <img
                src={success}
                className="startImage"
                alt="Reservation sent"
            />
            <h2 style={{fontSize: '1.5rem'}}>
                Reservation sent.
                <span className='gradientText'>Please check your mail for confirmation.</span>
            </h2>
        </div>
    );
};

export default ReservationSuccess;
