import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { DataGraphic } from './dataGraphic'

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Graphic() {

    const [dataGraphic, setDataGraphic] = useState({
        labels: [],
        datasets: [
            {
                data: [DataGraphic.map((data) => data.exitos), DataGraphic.map((data) => data.falhas)],
                backgroundColor: [
                    '#3FDA9F',
                    '#E41500'
                ],

                borderWidth: 1,
            },
        ],
    });

    return <Doughnut data={dataGraphic} className="GraphicHealth" />;
}