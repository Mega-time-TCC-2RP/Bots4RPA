import React, { useState, useEffect } from 'react';
import BarChart from '../../components/graphic/rendergraphic'
import { UserData } from './dataBar'

export default function BarGraphic() {

    const [ExecutionsList, setExecutionsList] = useState([]);

    function GetRunQuantity() {
        fetch('https://grupo8api.azurewebsites.net/api/Run/ListAll', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao'),
            },
        })
            .then((response) => response.json())

            .then((d) =>
                setExecutionsList(d),
                // console.log(d)
            )
            .catch((error) => console.log(error));
    };

    useEffect(GetRunQuantity, [])


    // Fazer isso funcionar 

    const dataRun = ExecutionsList.map((da) => da.runDate)
    console.log('é esse', { dataRun })

    // ------------------------------------------//


    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.month),

        datasets: [
            {
                label: "Qtde",
                // data: ExecutionsList.map((data) => data.RunQuantity),
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