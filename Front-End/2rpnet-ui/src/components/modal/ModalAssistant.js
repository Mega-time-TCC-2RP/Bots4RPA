import React from 'react'
import "../../components/modal/ModalAssistant.css";
import Azul_Home from '../../assets/img/Azul_Home.png'

function CloseModalAssistant() {
    var modal = document.getElementById("modalAssistant");
    // console.log(id)
    modal.style.display = "none";
};

export default function Modal() {


    // function createAssistant(event) {
    //     event.preventDefault();
    //     fetch("http://localhost:5000/api/Consultas", {
    //         idAssistant: idPaciente,
    //         idMedico: idMedico,
    //         idSituacao: idSituacao,
    //         dataConsulta: dataConsulta,
    //         descricaoConsulta: descricaoConsulta
    //     }, {
    //         headers: {
    //             'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
    //         }
    //     })
    //         .then(resposta => {
    //             if (resposta.status === 201) {
    //                 console.log("consulta cadastrada");
    //                 buscarConsultas();
    //                 setIdPaciente(0);
    //                 setIdMedico(0);
    //                 setIdSituacao(0);
    //                 setDataConsulta("");
    //                 setDescricaoConsulta("");
    //             }
    //         }).catch(erro => console.log(erro))
    // }

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
                            <input className='Input-ModalA' type="text" name="Name" placeholder='Insira o nome do Assistente'></input>
                        </div>

                        <div className='box-ModalA'>
                            <div>
                            <label className='Label-ModalA'> Descrição </label>
                            </div>
                            <input className='Input-ModalA ' type="text" name="Name" placeholder='Insira a Descrição'></input>
                        </div>
                    </form>
                    <button className='Button-ModalA'> Criar </button>
                </div>
            </div>
        </div>
    )
}
