import React from 'react'
import "../../components/modal/Modal.css";
import Azul_Home from '../../assets/img/Azul_Home.png'

function Modal({ closeModal }) {
    return (
        <div className='modalBackground'>
            <div className='modalContainer'>
                <div className='modal-header'>
                    <button
                        className='exit-button'
                        onClick={(event) => {
                            event.preventDefault()
                            closeModal(false)
                        }}>x
                    </button>
                </div>

                <div className='body-modal'>

                    <div className='box-modal-assistant'>

                        <div className='assistant-id'>
                            <img src={Azul_Home} className="assistant-modal" />
                            <h3>Assistente 1</h3>
                        </div>

                        <div className='assistant-info'>
                            <div className='box-description'>
                                <h4>Descrição:</h4>
                            </div>

                            <div className='box-paragraph'>
                                <p> Esse assistênte exerce a função de executar uma operação matemática
                                    com os dados fornecidos pela equipe de RH, logo após é gerado um arquivo
                                    que é enviado para o email do gerente geral.</p>
                            </div>

                            <div className='assistant-date'>
                                <span className='span1'> Útima vez executado: </span>
                                <span className='span2'> 12/04/2022 </span>
                            </div>

                        </div>

                    </div>

                    <div className='assistant-graphics'>

                        <div className='graphic-1'>
                            <div>

                            </div>
                        </div>

                        <div className='graphic-2'>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Modal