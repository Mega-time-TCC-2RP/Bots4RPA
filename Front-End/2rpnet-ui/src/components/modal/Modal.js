import React, { useState, useEffect } from 'react';
import "../../assets/css/components/Modal.css"
import Azul_Home from '../../assets/img/Azul_Home.png'
import { Assistant } from '@material-ui/icons';
import Graphic from '../../components/graphic/graphic'
import EditIcon from '../icones/edit'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { DataGraphic } from '../graphic/dataGraphic'
// import { run } from 'cypress';
import { API } from '../../../src/services/api'

export default function ModalM({ assistant }) {

    const [Description, setDescription] = useState("");
    // Não está sendo usado no momento:
    const [Run, setRun] = useState([]);
    const [PropsAssistants, setPropsAssistants] = useState([]);

    const [chart, setChart] = useState([])

    var baseUrl = API + "/api/Run/ListQuantity/" + assistant.idAssistant
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
                    // console.log(json)
                    setChart(json)
                })
            }).catch(error => {
                console.log(error);
            })
        }

        fetchRun()
    }, [])

    const data = {
        labels: [],
        datasets: [
            {
                data: [chart.map((data) => data.sucess), chart.map((data) => data.error)],
                backgroundColor: [
                    '#3FDA9F',
                    '#E41500'
                ],
                borderWidth: 1,
            },
        ],
    }

    // function PropsAssistant() {
    //     var baseUrl = "http://localhost:5000/api/Run/ListQuantity/" + assistant.idAssistant
    //     var header = {
    //         headers: {
    //             Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao'),
    //         },
    //     }
    //     fetch(baseUrl, header
    //     ).then((response) => {
    //         response.json().then((json) => {
    //             console.log(json)
    //             setPropsAssistants(json.data)
    //         })
    //     }).catch(error => {
    //         console.log(error);
    //     })
    // }
    // useEffect(PropsAssistant, [])

    function CloseModal(idAssistant) {
        var modal = document.getElementById("modal" + idAssistant);
        modal.style.display = "none";
    };

    function DeleteProcedures() {
        // AProcedure.map((a) => {
        // console.log(a.idAprocedure)
        fetch(API + '/api/AssistantProcedure/' + assistant.idAssistant, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 204) {
                    console.log('Procedures Apagadas');
                }
            })
            .catch((erro) => console.log(erro))
        // }

    };

    function DeleteAssistant(idAssistant) {
        DeleteProcedures()
        // .then(
        fetch(API + '/api/Assistants/' + assistant.idAssistant, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    console.log('Assistente ' + assistant.idAssistant + ' foi excluído!',);
                    CloseModal(assistant.idAssistant)
                }
            })
            .catch((erro) => console.log(erro))
        // )

    };

    function UpdateDescription() {
        console.log('Entrou no método Update')
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao') },
            body: JSON.stringify({ "assistantDescription": Description })
        };

        fetch(API + '/api/Assistants/' + assistant.idAssistant, requestOptions)
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log("Descrição do assistente atualizada");
                    var btn = document.getElementById("btn" + assistant.idAssistant);
                    btn.style.display = "none";

                    var textoDescricao = document.getElementById("texto_desc" + assistant.idAssistant)
                    textoDescricao.style.backgroundColor = "unset"
                }
            }).catch(erro => console.log(erro))
    };

    function permitirTextArea(idAssistant, assistantDescription) {
        console.log("Você está editando a descrição do assistente " + idAssistant)

        var textoDescricao = document.getElementById("texto_desc" + idAssistant)
        textoDescricao.removeAttribute("readOnly");

        textoDescricao.style.backgroundColor = "unset"
        var btn = document.getElementById("btn" + idAssistant);

        if (btn.style.display === "none") {
            btn.style.display = "";
            textoDescricao.style.backgroundColor = "#ffff"
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
                                <textarea
                                    name="texto_desc"
                                    style={{ resize: "none", backgroundColor: "unset" }}
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
                                    <h1>Detalhes da execução:</h1>
                                    {chart.map((m) => {
                                        return (
                                            <div>
                                                <div className='box-label1-health'>
                                                    <div className='square-green'></div>
                                                    <span>Êxitos na execução: {m.sucess}</span>
                                                </div>

                                                <div className='box-label2-health'>
                                                    <div className='square-red'></div>
                                                    <span>Falhas na execução: {m.error}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className='graphic-right-side'>
                                <Doughnut data={data} className="GraphicHealth" />
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
                                        {chart.map((c) =>
                                            c.total != undefined && c.total != null && c.total ?
                                                <span>{c.total}</span> : <span> 0 </span>
                                        )
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}


