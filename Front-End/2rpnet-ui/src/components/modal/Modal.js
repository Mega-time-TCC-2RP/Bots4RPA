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
                        }}>X
                    </button>
                </div>

                <div className='body'>
                    <div className='assistant-info'>
                        <div>
                            <img src={Azul_Home} className="assistant-modal" />
                            <h5>Assistente 1</h5>
                        </div>

                    </div>

                    <div className='assistant-graphics'>
                      
                       {/* <div className='grafico 1'>

                           </div>

                           <div className='gráfico 2'>

                           </div> */}
                    </div>



                </div>
            </div>
        </div >
    )
}

export default Modal