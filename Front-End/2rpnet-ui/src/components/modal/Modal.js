import React from 'react'
import "../../components/modal/Modal.css";
import Azul_Home from '../../assets/img/Azul_Home.png'
import { Assistant } from '@material-ui/icons';
import Graphic from '../../components/graphic/graphic'
import BarChart from '../../components/graphic/graphicBar'

function CloseModal(idAssistant) {
    var modal = document.getElementById("modal" + idAssistant);
    // console.log(id)
    modal.style.display = "none";
};

export default function Modal({ assistant }) {
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
                            <img src={Azul_Home} className="assistant-modal" />
                            <h3>{assistant.assistantName}</h3>
                        </div>

                        <div className='assistant-info'>
                            <div className='box-description'>
                                <h4>Descrição:</h4>
                            </div>
                            <div className='box-paragraph'>
                                <p>
                                    {assistant.assistantDescription}
                                </p>
                            </div>
                            <div className='assistant-date'>
                                <span className='span1'> Última alteração: </span>
                                <span className='span2'> {Intl.DateTimeFormat("pt-BR", {
                                    year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric"
                                }).format(new Date(assistant.alterationDate))} </span>
                            </div>
                        </div>
                    </div>
                    <div className='assistant-graphics'>

                        <div className='graphic-1'>

                            <div className='graphic-left-side'>
                                <div className='container-left'>
                                    <h1>Falhas ao execultar</h1>
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
                            <div className='container-grafico'>  
                                {/* <BarChart /> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
