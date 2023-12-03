import React from "react";

import "../styles/Event.css";
import PropTypes from "prop-types";

const matchFirstWord = (eventLocation, allLocations) => {
    const firstWordEventLocation = eventLocation
        .split(",")[0]
        .trim()
        .toLowerCase();

    // Find the matching location in the allLocations array
    const matchingLocation = allLocations.find((location) => {
        const firstWordAllLocation = location
            .split(",")[0]
            .trim()
            .toLowerCase();
        return firstWordEventLocation === firstWordAllLocation;
    });

    return matchingLocation || eventLocation; // If no match found, use the original event location
};

const Event = ({ event, allLocations }) => {
    const { summary, htmlLink, description, originalStartTime } = event;

    const matchedLocation = matchFirstWord(event.location, allLocations);
    const date = new Date(originalStartTime.dateTime).toLocaleDateString(
        "en-US",
        {
            day: "numeric",
            month: "numeric",
            year: "numeric",
        }
    );

    return (
        <div
            className='col event-card'
            onTouchStart={(e) => e.currentTarget.classList.toggle("hover")}
        >
            <div className='container'>
                <div className='front'>
                    <div className='inner'>
                        <p>{summary}</p>
                        <span>{date}</span>
                        <br />
                        <span>{matchedLocation}</span>
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
    allLocations: PropTypes.array.isRequired,
};

export default Event;
