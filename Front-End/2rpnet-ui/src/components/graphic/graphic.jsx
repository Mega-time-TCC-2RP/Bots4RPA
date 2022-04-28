// import React from 'react';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Tooltip, Legend);

// export const data = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };
// export function GraphicHealth() {
//   return <Doughnut data={data} />;
// }


import React, { useState } from 'react';
import BarChart from '../../components/graphic/rendergraphic'
import { UserData } from '../../components/graphic/graphicTest'

export default function Grafico() {
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.month),
        datasets: [
            {
                label: "Lucros",
                data: UserData.map((data) => data.userGain),
                backgroundColor: [
                    "#90F926",
                ],
            },
            {
                label: "Perdas",
                data: UserData.map((data) => data.userLost),
                backgroundColor: [
                    "#F92626",
                ],
            },
        ],
    });

    return (
        <div>

            <div className="container_grafico">
                <BarChart chartData={userData} className="" />
            </div>

        </div>
    )
}
