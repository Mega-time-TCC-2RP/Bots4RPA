import React, { useState, useEffect } from 'react';
import "../../components/modal/Modal.css";
import Azul_Home from '../../assets/img/Azul_Home.png'
import { Assistant } from '@material-ui/icons';
import Graphic from '../../components/graphic/graphic'
import EditIcon from '../icones/edit'

import axios from "axios";
// import { run } from 'cypress';

export default function Modal({ assistant }) {

    function CloseModal(idAssistant) {
        var modal = document.getElementById("modal" + idAssistant);
        // console.log(id)
        modal.style.display = "none";
    };

    const [AssistantsList, setAssistantsList] = useState([]);
    const [Run, setRun] = useState([]);
    const [Description, setDescription] = useState("");

    function RunQuantity() {
        fetch('http://localhost:5000/api/Run/' + assistant.idAssistant, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao'),
            },
        })
            .then((response) => response.json())
            .then((data) =>
                setRun(data)
                // console.log(data)
            )
            .catch((error) => console.log(error));
    };
    useEffect(RunQuantity, [])

    function DeleteAssistant(idAssistant) {
        fetch('http://localhost:5000/api/Assistants/' + assistant.idAssistant, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    // console.log('Assistente ' + assistant.idAssistant + ' foi excluído!',);
                    CloseModal(assistant.idAssistant)
                }
            })
            .catch((erro) => console.log(erro))
    };


    function UpdateDescription() {
        console.log('entrou')

        const requestOptions = {
            method: 'PUT',
            headers: {  'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao') },
            body: JSON.stringify({"assistantDescription": Description }) 
        };

        fetch('http://localhost:5000/api/Assistants/' + assistant.idAssistant, requestOptions)
            .then(resposta => {
                console.log(resposta)
                if (resposta.status === 200) {
                    console.log("descricao do assistente atualizada");
                    // document.getElementById(idConsulta).setAttribute("readOnly");
                    // var btn = document.getElementById("btn" + assistant.idAssistant)
                    // btn.style.display = "none";
                    //  setDescription("")
                }
            }).catch(erro => console.log(erro))
        // console.log('entrou na função Update')
    };



    function permitirTextArea(idAssistant, assistantDescription) {
        console.log("Você está editando a descrição do assistente " + idAssistant)

        setDescription(assistant.assistantDescription);
        var textoDescricao = document.getElementById("texto_desc" + idAssistant)
        textoDescricao.removeAttribute("readOnly");

        // if (textoDescricao.style.display === "flex") {
        //     textoDescricao.style.display = "";
        // } else {
        //     textoDescricao.style.display = "flex";
        // }

        var btn = document.getElementById("btn" + idAssistant);

        if (btn.style.display === "none") {
            btn.style.display = "";
        }
        else {
            btn.style.display = "none";
        }

    }
    useEffect(() => {
        setDescription(assistant.assistantDescription);
      }, [])

    return (
        <div id={"modal" + assistant.idAssistant} className='SmodalBackground'>
            <div className='SmodalContainer'>
                <div className='Smodal-header'>
                    <button
                        className='Sexit-button'
                        onClick={(event) => {
                            event.preventDefault()
                            CloseModal(assistant.idAssistant)
                        }}
                    >x
                    </button>
                </div>
                <div className='Sbody-modal'>
                    <div className='Sbox-modal-assistant'>
                        <div className='assistant-id'>
                            <div className='box-img-modal'>
                                <img src={Azul_Home} className="assistant-modal" />
                                <button
                                    className='button-edit'
                                    onClick={() => permitirTextArea(assistant.idAssistant, assistant.assistantDescription)}
                                    type="button">
                                    <EditIcon />
                                </button>
                            </div>
                            <div className='Sbox-assistantName'>
                                <h3>{assistant.assistantName}</h3>
                            </div>
                        </div>

                        <div className='assistant-info'>
                            <div className='box-description'>
                                <h4>Descrição:</h4>
                            </div>
                            <div className='box-paragraph'>
                                {/* <textarea>{assistant.assistantDescription}</textarea> */}
                                <textarea
                                    name="texto_desc"
                                    style={{ resize: "none"}}
                                    id={"texto_desc" + assistant.idAssistant}
                                    readOnly value={Description} onChange={(campo) => setDescription(campo.target.value)}>
                                    {assistant.assistantDescription}
                                </textarea>
                                <button
                                    className='btn-save-modal'
                                    onClick={(event) => {
                                        event.preventDefault()
                                        UpdateDescription()
                                    }}
                                    id={"btn" + assistant.idAssistant}
                                    style={{ display: "none" }}>
                                    Salvar
                                </button>
                            </div>
                            <div className='assistant-date'>
                                <span className='span1'> Data da última alteração: </span>
                                <span className='span2'> {Intl.DateTimeFormat("pt-BR", {
                                    year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric"
                                }).format(new Date(assistant.alterationDate))} </span>
                            </div>
                            <button onClick={(event) => {
                                event.preventDefault()
                                DeleteAssistant(assistant.idAssistant)
                            }}
                                className='button-delete'>Excluir</button>
                        </div>
                    </div>
                    <div className='assistant-graphics'>

                        <div className='graphic-1'>

                            <div className='graphic-left-side'>
                                <div className='container-left'>
                                    <h1>Detalhes execução:</h1>
                                    <div>
                                        <div className='box-label1-health'>
                                            <div className='square-green'></div>
                                            <span>Êxitos na execução</span>
                                        </div>

                                        <div className='box-label2-health'>
                                            <div className='square-red'></div>
                                            <span>Falhas na execução</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='graphic-right-side'>
                                <Graphic />
                            </div>
                        </div>

                        <div className='graphic-2'>
                            <div className='container-graphic'>

                                <div className='box-quantity'>
                                    <h1>Quantidade de execuções:</h1>
                                    <div className='subtitle-quantity'>
                                        <div className='square-blue'></div>
                                        <span>Quantidade</span>
                                    </div>
                                </div>
                                <div className='graphic2-right-side'>
                                    <div className='box-graphic-quantity'>
                                        {
                                            Run.runQuantity != undefined && Run.runQuantity != null && Run.runQuantity ?
                                                <span>{Run.runQuantity}</span> : <span> 0 </span>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}


