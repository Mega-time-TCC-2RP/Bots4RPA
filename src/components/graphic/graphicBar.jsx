import React, { useState, useEffect } from 'react';
import BarChart from '../../components/graphic/rendergraphic'
import { getUserData } from './dataBar'
// import { UserData } from './dataBar'

// export default function BarGraphic() {
// ------------------------------------------//


export default function GraphicBar() {

    const [chart, setChart] = useState([])

    var baseUrl = "https://grupo8api.azurewebsites.net/api/Run/ListAll"
    var header = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao'),
        },
    }
    useEffect(() => {
        const fetchRun = async () => {
            fetch(baseUrl, header
            ).then((response) => {
                response.json().then((json) => {
                    console.log(json)
                    setChart(json.data)
                })
            }).catch(error => {
                console.log(error);
            })
        }
       
        fetchRun()
    }, [])
   
    const data = {
        // labels: list.map((data) => console.log(data)),
        //  labels: chart..map(x => x.runDate),
         labels: ['oia'],
        datasets: [
            {
                label: "Qtde",
                // data: [chart.ListAll.map(x => x.runQuantity)],
                data: [12],
                backgroundColor: [
                    "#3FDA9F",
                ],
            },
        ],
    }
    return (
        <div>
            <div className="container_grafico">
                <BarChart chartData={data} className="" />
            </div>
        </div>
    )
}
