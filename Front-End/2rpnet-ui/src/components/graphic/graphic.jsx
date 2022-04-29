import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Graphic() {
    const data = {
        labels: [],
        datasets: [
            {
                data: [43, 13 ],
                backgroundColor: [
                    '#3FDA9F',
                    '#E41500'
                ],
             
                borderWidth: 1,
            },
        ],
    };

    return <Doughnut data={data} className="GraphicHealth" />;
}







