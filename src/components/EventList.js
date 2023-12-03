import React from "react";

import PropTypes from "prop-types";

import "../styles/EventList.css";
import Event from "./Event";

const EventList = ({ events, allLocations }) => (
    <ul id='event-list'>
        {events
            ? events.map((event) => (
                  <Event
                      key={event.id}
                      event={event}
                      allLocations={allLocations}
                  />
              ))
            : null}
    </ul>
);

EventList.propTypes = {
    events: PropTypes.array.isRequired,
    allLocations: PropTypes.array.isRequired,
};

export default EventList;
