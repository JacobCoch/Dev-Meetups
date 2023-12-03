import React, { useState } from "react";

import PropTypes from "prop-types";

const EventCount = ({ setCurrentNOE, setErrorAlert }) => {
    const [valueInput, setValueInput] = useState(32);

    const handleOnChange = (event) => {
        const inputValue = event.target.value;
        setValueInput(inputValue);

        let errorText;
        if (inputValue === "") {
            setCurrentNOE(32);
        } else {
            setCurrentNOE(parseFloat(inputValue));
        }

        if (isNaN(inputValue)) {
            errorText = "Only positive numbers are allowed";
        } else {
            errorText = "";
        }
        setErrorAlert(errorText);
    };

    return (
        <div id='event-count'>
            <input value={valueInput} onChange={handleOnChange} type='number' />
        </div>
    );
};

EventCount.propTypes = {
    setCurrentNOE: PropTypes.func.isRequired,
    setErrorAlert: PropTypes.func.isRequired,
};

export default EventCount;
