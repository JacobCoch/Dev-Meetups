import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const CityPieChart = ({ events }) => {
    const [data, setData] = useState([]);
    const COLORS = ["#ffbdaf", "#ff9c8a", "#ff7b62", "#ee4e34", "#c6351d"];

    useEffect(() => {
        const newData = getData();
        setData(newData);
    }, [events]);

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill='white'
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline='central'
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const getData = () => {
        const genres = ["React", "JavaScript", "Node", "jQuery", "Angular"];

        const fetchData = genres.map((genre, index) => {
            const value = events.filter(({ summary }) => {
                // Check if the lowercased summary includes "angular" or the lowercased genre
                return summary.toLowerCase().includes(genre.toLowerCase());
            }).length;

            return { name: genre, value, fill: COLORS[index] };
        });

        return fetchData;
    };

    return (
        <ResponsiveContainer height={400}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey='value'
                    nameKey='name'
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={160}
                    labelPosition='outside'
                    label={renderCustomizedLabel}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Legend layout='horizontal' />
                <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{ backgroundColor: "#333", border: "none" }}
                    labelStyle={{ color: "white" }}
                    itemStyle={{ color: "white" }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

CityPieChart.propTypes = {
    events: PropTypes.array.isRequired,
};

export default CityPieChart;
