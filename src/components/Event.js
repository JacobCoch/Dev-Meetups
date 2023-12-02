import React from "react";

import "../styles/Event.css";
import PropTypes from "prop-types";

const simplifyLocation = (location) => {
    const locationArray = location.split(", ");

    if (locationArray.includes("Dubai - United Arab Emirates")) {
        return "Dubai, United Arab Emirates";
    }
    const simplifiedLocation = `${locationArray[0]}, ${
        locationArray[locationArray.length - 1]
    }`;
    return simplifiedLocation;
};

const Event = ({ event }) => {
    const { summary, location, htmlLink, description, originalStartTime } =
        event;

    const date = new Date(originalStartTime.dateTime).toLocaleDateString(
        "en-US",
        {
            day: "numeric",
            month: "numeric",
            year: "numeric",
        }
    );

    const simplifiedLocation = simplifyLocation(location);

    return (
        <div
            className='col event-card'
            onTouchStart={() => classList.toggle("hover")}
        >
            <div className='container'>
                <div className='front'>
                    <div className='inner'>
                        <p>{summary}</p>
                        <span>{date}</span>
                        <br />
                        <span>{simplifiedLocation}</span>
                    </div>
                </div>
                <div className='back'>
                    <div className='inner'>
                        <div className='back-card'>
                            <h2>About event:</h2>
                            <p>{description}</p>
                            <a href={htmlLink} target='_blank' rel='noreferrer'>
                                See details on Google Calendar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Event.propTypes = {
    event: PropTypes.object.isRequired,
};

export default Event;
