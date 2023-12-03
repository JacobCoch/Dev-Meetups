import React, { useState, useEffect } from "react";

import "../styles/CitySearch.css";
import PropTypes from "prop-types";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChanged = (event) => {
        const { value } = event.target;
        const filteredLocations = allLocations
            ? allLocations.filter((location) => {
                  return (
                      location.toUpperCase().indexOf(value.toUpperCase()) > -1
                  );
              })
            : [];

        setQuery(value);
        setSuggestions(filteredLocations);

        let infoText;
        if (filteredLocations.length === 0) {
            infoText =
                "We can not find the city you are looking for. Please try another city";
        } else {
            infoText = "";
        }
        setInfoAlert(infoText);
    };
    const handleItemClicked = (event) => {
        const value = event.target.textContent;

        if (value === "See all cities") {
            setQuery("");
        } else {
            setQuery(value);
        }

        setShowSuggestions(false);
        setCurrentCity(value);
        setInfoAlert("");
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false);
        }, 100);
    };

    useEffect(() => {
        setSuggestions(allLocations);
    }, [allLocations]);

    return (
        <div id='city-search'>
            <input
                type='text'
                className='city'
                placeholder='Location'
                value={query}
                onFocus={() => setShowSuggestions(true)}
                onBlur={handleInputBlur}
                onChange={handleInputChanged}
            />
            {showSuggestions ? (
                <ul className='suggestions'>
                    {suggestions.map((suggestion) => {
                        return (
                            <li key={suggestion}>
                                <button
                                    className='suggestion-button'
                                    type='button'
                                    onClick={handleItemClicked}
                                    onKeyDown={handleItemClicked}
                                >
                                    {suggestion}
                                </button>
                            </li>
                        );
                    })}
                    <li key='See all cities'>
                        <button
                            type='button'
                            onClick={handleItemClicked}
                            onKeyDown={handleItemClicked}
                        >
                            <b>See all cities</b>
                        </button>
                    </li>
                </ul>
            ) : null}
        </div>
    );
};

CitySearch.propTypes = {
    allLocations: PropTypes.array.isRequired,
    setCurrentCity: PropTypes.func.isRequired,
    setInfoAlert: PropTypes.func.isRequired,
};

export default CitySearch;
