import "../../../assets/css/pages/chart.scss";
import {
        AreaChart,
        Area,
        XAxis,
        CartesianGrid,
        Tooltip,
        ResponsiveContainer,
} from "recharts";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VLibras from '@djpfs/react-vlibras'
import axios, { Axios } from 'axios';


//Components
import Footer from '../../../components/footer/footer'
import Header from '../../../components/header/header'
import Navbar from '../../../components/menu/Navbar'

//css
import '../../../assets/css/components/fonts.css'


const data = [
        { name: "January", Total: 1200 },
        { name: "February", Total: 2100 },
        { name: "March", Total: 800 },
        { name: "April", Total: 1600 },
        { name: "May", Total: 900 },
        { name: "June", Total: 1700 },
];

const Chart = ({ aspect, title }) => {
        return (
                <div className="chart">
                        <div className="title">{title}</div>
                        <ResponsiveContainer width="100%" aspect={aspect}>
                                <AreaChart
                                        width={730}
                                        height={250}
                                        data={data}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                >
                                        <defs>
                                                <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" stroke="gray" />
                                        <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                                        <Tooltip />
                                        <Area
                                                type="monotone"
                                                dataKey="Total"
                                                stroke="#8884d8"
                                                fillOpacity={1}
                                                fill="url(#total)"
                                        />
                                </AreaChart>
                        </ResponsiveContainer>
                </div>
        );
};

export default Chart;