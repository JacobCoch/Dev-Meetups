import React, { useState } from "react";

import PropTypes from "prop-types";

const Event = ({ event }) => {
    const { summary, created, location, htmlLink, description } = event;
    const [hidden, setHidden] = useState(true);

    const handleOnClick = () => {
        setHidden(!hidden);
    };

    return (
        <div>
            <li className='eventCard'>
                <h3 className='eventTitle'>{summary}</h3>
                <p>{created}</p>
                <p>{location}</p>
                {hidden ? null : (
                    <div>
                        <h4>About event:</h4>
                        <a href={htmlLink} target='_blank' rel='noreferrer'>
                            See details on Google Calendar
                        </a>
                        <p>{description}</p>
                    </div>
                )}
                <button
                    onClick={handleOnClick}
                    className='details-btn'
                    type='button'
                >
                    {hidden ? "Show details" : "Hide details"}
                </button>
            </li>
        </div>
    );
};

Event.propTypes = {
    event: PropTypes.object.isRequired,
};

export default Event;
