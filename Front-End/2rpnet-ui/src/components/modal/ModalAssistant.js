import React, { useState, useEffect } from 'react';
import "../../components/modal/ModalAssistant.css";
import Azul_Home from '../../assets/img/Azul_Home.png'

function CloseModalAssistant() {
    var modal = document.getElementById("modalAssistant");
    // console.log(id)
    modal.style.display = "none";
};

export default function Modal() {

    // Foi comentado o que não será utilizado : 

    // const [idEmployee, setIdEmployee] = useState(0);
    // const [creationDate, setCreationDate] = useState(new Date());
    // const [alterationDate, setAlterationDate] = useState(new Date())
    const [assistantName, setAssistantName] = useState("");
    const [assistantDescription, setAssistantDescription] = useState("");

    function createAssistant(event) {
        event.preventDefault();
        fetch("http://localhost:5000/api/Consultas", {
            assistantName: assistantName,
            assistantDescription: assistantDescription
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao'),
              },
        })
            .then(resposta => {
                if (resposta.status === 201) {
                    console.log("assistente criado");

                    setAssistantName("");
                    setAssistantDescription("");
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

                    <form onSubmit={createAssistant} className='form-modalA'>
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
                    <button type='submit' className='Button-ModalA'> Criar </button>
                </div>
            </div>
        </div>
    )
}
