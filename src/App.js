import React, { useEffect, useState } from "react";

import "./styles/App.css";
import { getEvents, extractLocations } from "./api";
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/Alert";
import CitySearch from "./components/CitySearch";
import EventCount from "./components/EventCount";
import EventList from "./components/EventList";

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
        const filteredEvents =
            currentCity === "See all cities"
                ? allEvents
                : allEvents.filter((event) => event.location === currentCity);
        setEvents(filteredEvents.slice(0, currentNOE));
        setAllLocations(extractLocations(allEvents));
        console.log(allLocations);
    };

    return (
        <div className='App'>
            <div className='alerts-container'>
                {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
                {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
                {warningAlert.length ? (
                    <WarningAlert text={warningAlert} />
                ) : null}
            </div>
            <div className='input-content'>
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
            <EventList events={events} />
        </div>
    );
};

export default App;
