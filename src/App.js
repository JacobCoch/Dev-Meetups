import React, { useEffect, useState } from "react";

import "./styles/App.css";
import { getEvents, extractLocations } from "./api";
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/Alert";
import CityEventsChart from "./components/CityEventsChart";
import CityPieChart from "./components/CityPieChart";
import CitySearch from "./components/CitySearch";
import EventCount from "./components/EventCount";
import EventList from "./components/EventList";
import Github from "./components/Github";

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

const App = () => {
    const [events, setEvents] = useState([]);
    const [currentNOE, setCurrentNOE] = useState(32);
    const [allLocations, setAllLocations] = useState([]);
    const [currentCity, setCurrentCity] = useState("See all cities");
    const [infoAlert, setInfoAlert] = useState("");
    const [errorAlert, setErrorAlert] = useState("");
    const [warningAlert, setWarningAlert] = useState("");
    let warningText;

    useEffect(() => {
        if (navigator.onLine) {
            warningText = "";
            setWarningAlert(warningText);
        } else {
            warningText =
                "You are offline. Events data will be limited to local cache";
            setWarningAlert(warningText);
        }

        fetchData();
    }, [currentCity, currentNOE]);

    const fetchData = async () => {
        const allEvents = await getEvents();
        const simplifiedLocations =
            extractLocations(allEvents).map(simplifyLocation);
        setAllLocations(simplifiedLocations);

        const filteredEvents =
            currentCity === "See all cities"
                ? allEvents
                : allEvents.filter(
                      (event) =>
                          simplifyLocation(event.location) === currentCity
                  );

        setEvents(filteredEvents.slice(0, currentNOE));
    };

    return (
        <div className='App'>
            <Github />
            <h1 className='dev-meetups-title'>Dev Meetups</h1>
            <div className='alerts-container'>
                {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
                {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
                {warningAlert.length ? (
                    <WarningAlert text={warningAlert} />
                ) : null}
            </div>
            <div className='input-components'>
                <CitySearch
                    allLocations={allLocations}
                    setCurrentCity={setCurrentCity}
                    setInfoAlert={setInfoAlert}
                />
                <EventCount
                    setCurrentNOE={setCurrentNOE}
                    setErrorAlert={setErrorAlert}
                />
            </div>
            <div className='data-charts'>
                <CityPieChart events={events} />
                <CityEventsChart allLocations={allLocations} events={events} />
            </div>

            <EventList events={events} allLocations={allLocations} />
        </div>
    );
};

export default App;
