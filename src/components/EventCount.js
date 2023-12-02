import React, { useState } from "react";

import PropTypes from "prop-types";

const EventCount = ({ setCurrentNOE, currentNOE, setErrorAlert }) => {
    const [valueInput, setValueInput] = useState(32);

    const handleOnChange = (event) => {
        const inputValue = event.target.value;
        setValueInput(inputValue);

        if (inputValue === "") {
            setCurrentNOE(32);
        } else {
            setCurrentNOE(parseFloat(inputValue));
        }

        let errorText;
        if (isNaN(inputValue) || inputValue.length <= 0) {
            errorText = "Only positive numbers are allowed";
        } else {
            errorText = "";
        }
        setErrorAlert(errorText);
    };

    console.log("Type of value input: ", isNaN(valueInput));
    console.log("Value Input: ", valueInput);

    return (
        <div id='event-count'>
            <input value={valueInput} onChange={handleOnChange} />
        </div>
    );
};

EventCount.propTypes = {
    setCurrentNOE: PropTypes.func.isRequired,
    currentNOE: PropTypes.number.isRequired,
    setErrorAlert: PropTypes.func.isRequired,
};

export default EventCount;
