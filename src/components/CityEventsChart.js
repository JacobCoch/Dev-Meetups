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
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(() => getData());
    }, [events, allLocations]);

    const getData = () => {
        const fetchData = allLocations.map((location) => {
            const count = events.filter((event) =>
                event.location.startsWith(location.split(",")[0])
            ).length;
            const city = location.split(", ")[0].substring(0, 15);
            return { city, count };
        });
        return fetchData;
    };

    return (
        <ResponsiveContainer height={400} width='80%'>
            <ScatterChart>
                <CartesianGrid />
                <XAxis
                    type='category'
                    dataKey='city'
                    name='city'
                    stroke='black'
                    interval={0}
                    angle={50}
                    tick={{ fontSize: 16, fill: "black", dy: 30 }}
                    label={{
                        value: "Cities",
                        position: "insideBottom",
                        dy: 5,
                        fontSize: 20,
                        fill: "black",
                        fontWeight: "bold",
                    }}
                    height={100}
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
