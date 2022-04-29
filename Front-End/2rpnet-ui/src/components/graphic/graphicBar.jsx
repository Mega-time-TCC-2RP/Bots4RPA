import React, { useState } from 'react';
import BarChart from '../../components/graphic/rendergraphic'
import { UserData } from '../../components/graphic/graphicTest'

export default function Barras() {
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.month),
        datasets: [
            {
                label: "Qtde",
                data: UserData.map((data) => data.amount),
                backgroundColor: [
                    "#3FDA9F",
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