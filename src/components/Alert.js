import React from "react";

import PropTypes from "prop-types";

const Alert = ({ text, color, bgColor }) => {
    const getStyle = () => {
        return {
            color,
            backgroundColor: bgColor,
            borderWidth: "2px",
            fontWeight: "bolder",
            borderRadius: "7px",
            textAlign: "center",
            margin: "10px 0",
            top: "0",
            left: "20px",
            width: "250px",
            zIndex: "1000",
            position: "fixed",
            fontSize: "14px",
        };
    };

    return (
        <div className='alert'>
            <p style={getStyle()}>{text}</p>
        </div>
    );
};

const InfoAlert = ({ text }) => {
    return (
        <Alert
            text={text}
            color='rgb(0, 0, 255)'
            bgColor='rgb(220, 220, 255)'
        />
    );
};

const ErrorAlert = ({ text }) => {
    return (
        <Alert
            text={text}
            color='rgb(255, 0, 0)'
            bgColor='rgb(255, 220, 220)'
        />
    );
};

const WarningAlert = ({ text }) => {
    return (
        <Alert
            text={text}
            color='rgb(255, 255, 0)'
            bgColor='rgb(255, 255, 220)'
        />
    );
};

Alert.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
};
InfoAlert.propTypes = {
    text: PropTypes.string.isRequired,
};
ErrorAlert.propTypes = {
    text: PropTypes.string.isRequired,
};
WarningAlert.propTypes = {
    text: PropTypes.string.isRequired,
};

export { InfoAlert, ErrorAlert, WarningAlert };
