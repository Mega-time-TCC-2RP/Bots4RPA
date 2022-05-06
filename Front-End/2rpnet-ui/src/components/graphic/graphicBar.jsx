import React, { useState, useEffect } from 'react';
import BarChart from '../../components/graphic/rendergraphic'
import { getUserData } from './dataBar'
// import { UserData } from './dataBar'

export default function BarGraphic() {
    // ------------------------------------------//

    var List = []; 

    function getUserData() {
        fetch('https://grupo8api.azurewebsites.net/api/Run/ListAll', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao'),
            },
        })
            .then((response) =>{
                console.log("antes");
                console.log(response.json());
                response.json()
            })
            .catch((error) => console.log(error));

    }
    
    useEffect(setUserData(getUserData()), [])

    let userData = [];

    function setUserData(list){
        console.log(list);

        userData =
        {
            labels: list.map((data) => console.log(data)),
    
            datasets: [
                {
                    label: "Qtde",
                    data: "2",
                    // data: "33",
                    backgroundColor: [
                        "#3FDA9F",
                    ],
                },
            ],
        }
    }

   


    return (
        <div>
            <div className="container_grafico">
                {
                     console.log(List)
                }
                <BarChart chartData={userData} className="" />
            </div>
        </div>
    )
}