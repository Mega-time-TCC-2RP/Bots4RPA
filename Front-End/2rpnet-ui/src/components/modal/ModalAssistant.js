import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import "../../components/modal/ModalAssistant.css";
import Azul_Home from '../../assets/img/Azul_Home.png'
import { Link, SettingsApplications } from '@material-ui/icons';
import { props } from 'cypress/types/bluebird';

function CloseModalAssistant() {
    var modal = document.getElementById("modalAssistant");
    modal.style.display = "none";
};

export default function Modal() {

    const navigate = useNavigate();
    const [IdAssistant, setIdAssistant] = useState(0)
    const [assistantName, setAssistantName] = useState("");
    const [assistantDescription, setAssistantDescription] = useState("");


    function createAssistant(event) {
        event.preventDefault();
        var myUrl = "https://2rpnet-rpa.azurewebsites.net/api/Assistants"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "assistantName": assistantName, "assistantDescription": assistantDescription })
        };

        fetch(myUrl, requestOptions)
            .then(response => {
                if (response.status === 201) {
                    console.log(response)
                    return response.json()
                        .then(data => {
                            console.log(data)
                            navigate("/assistant", { state: { id: data.idAssistant, name: data.assistantName } });
                            setAssistantName("");
                            setAssistantDescription("");

                        })
                }
            }).catch(error => console.log(error))
    }

    return (
        <div id={"modalAssistant"} className='modalABackground'>
            <div className='modalAContainer'>
                <div className='modalA-header'>
                    <button
                        className='exitA-button'
                        onClick={(event) => {
                            event.preventDefault()
                            CloseModalAssistant()
                        }}
                    >x
                    </button>
                </div>
                <div className='bodyA-modal'>
                    <div className='Content-modalA '>
                        <img src={Azul_Home} className="assistant-modalA" />
                    </div>

                    <form className='form-modalA'>
                        <div className='box-ModalA'>
                            <div>
                                <label className='Label-ModalA'> Nome do Assistente </label>
                            </div>
                            <input className='Input-ModalA' type="text" name="Name" value={assistantName} onChange={(campo) => setAssistantName(campo.target.value)} placeholder='Insira o nome do Assistente'></input>
                        </div>

                        <div className='box-ModalA'>
                            <div>
                                <label className='Label-ModalA'> Descrição </label>
                            </div>
                            <input className='Input-ModalA ' type="text" name="Description" value={assistantDescription} onChange={(campo) => setAssistantDescription(campo.target.value)} placeholder='Insira a Descrição'></input>
                        </div>
                    </form>
                    <button onClick={createAssistant} className='Button-ModalA'> Criar </button>
                </div>
            </div>
        </div>
    )
}
