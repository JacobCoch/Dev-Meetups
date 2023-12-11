import React, { useEffect, useState } from "react";

import "../styles/CityEventsChart.css";
import PropTypes from "prop-types";
import {
    CartesianGrid,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const CityEventsChart = ({ allLocations, events }) => {
    useEffect(() => {
        function getData() {
            const data = allLocations.map((location) => {
                const count = events.filter(
                    (event) => event.location === location
                ).length;
                const city = location.split(", ")[0].substring(0, 15);
                return { city, count };
            });
            return data;
        }
        console.log("data", data);
        console.log("All locations", allLocations, "Events", events);

        setData(() => getData(events, allLocations));
    }, [events, allLocations]);

    const [data, setData] = useState([]);

    return (
        <ResponsiveContainer height={400}>
            <ScatterChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid />
                <XAxis
                    type='category'
                    dataKey='city'
                    name='city'
                    stroke='black'
                    angle={60}
                    interval={0}
                    tick={{ dx: 20, dy: 40, fontSize: 14 }}
                />
                <YAxis
                    type='number'
                    dataKey='count'
                    name='number of events'
                    allowDecimals={false}
                    stroke='black'
                />
                <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    wrapperStyle={{ color: "white", background: "#333" }}
                    labelStyle={{ color: "white" }}
                    contentStyle={{ backgroundColor: "#333", border: "none" }}
                    itemStyle={{ color: "white", textTransform: "capitalize" }}
                />
                <Scatter data={data} fill='black' />
            </ScatterChart>
        </ResponsiveContainer>
    );
};

CityEventsChart.propTypes = {
    allLocations: PropTypes.array.isRequired,
    events: PropTypes.array.isRequired,
};

export default CityEventsChart;
