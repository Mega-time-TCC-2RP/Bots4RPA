import React from "react";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "../../assets/css/assistant.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

import bolinhas from "../../assets/img/Bolinhas.svg"


import Procedures from '../../services/process';

// testar colocar uma lista com informações dos cards/bloquinhos

export default function Assistant() {

    const [proceduresList, setProceduresList] = useState(Procedures);
    const [pValue, setPValue] = useState();
    const [value, setValue] = useState(0);

    var result = 0;

    function AtualizarResultado(FinalResult) {
        document.getElementById("result").innerHTML = `Resultado: ${FinalResult}`;
    };

    function DefineIValue(number) {
        result = number;
        AtualizarResultado(result);
        // console.log(result);
    }

    function Sum(number) {
        result = result + number;
        AtualizarResultado(result);
        // console.log(result);
    }

    function Subtract(number) {
        result = result - number;
        AtualizarResultado(result);
        // console.log(result);
    }

    function Multiply(number) {
        result = result * number;
        AtualizarResultado(result);
        // console.log(result);
    }

    function handleShow(p) {
        var modal = document.getElementById("modal" + p.IdProcedure);
        // console.log(modal)
        modal.style.display = "block";
        if (pValue != p.ProcedureValue) {
            if (p.ProcedureValue != 0 || p.ProcedureValue != "") {
                setPValue(p.ProcedureValue);
            }
            else {
                setPValue("");
            }
        }
    };

    function handleClose(id) {
        var modal = document.getElementById("modal" + id);
        // console.log(id)
        modal.style.display = "none";
    };

    const SaveAndExecute = () => {
        //Get the cards inside the dropzone and number them by order.
        let parent = document.getElementById("flow");
        let children = parent.childNodes;
        var child = [];

        for (let index = 0; index <= children.length; index++) {
            var child = children[index];

            var splited = child.id.split(";");
            child.id = (index + 1) + ";" + splited[1].toString();
            console.log(child);

            //Pega a função de acordo com o texto presente no elemento card, sendo este por padrão o nome do procedimento
            switch (child.textContent) {
                case "Numero Inicial":
                    DefineIValue(parseInt(splited[1]));
                    break;
                case "Somar":
                    Sum(parseInt(splited[1]));
                    break;
                case "Subtrair":
                    Subtract(parseInt(splited[1]));
                    break;
                case "Multiplicar":
                    Multiply(parseInt(splited[1]));
                    break;
                default:
                    console.log("deu erro viu");
                    break;
            }

        }

        setValue(result);
    }

    function configDragnDrop() {
        const cards = document.querySelectorAll('.card')
        const dropzones = document.querySelectorAll('.dropzone')


        /** our cards */
        cards.forEach(card => {
            card.addEventListener('dragstart', dragstart)
            card.addEventListener('drag', drag)
            card.addEventListener('dragend', dragend)
        })

        function dragstart() {
            // log('CARD: Start dragging ')
            dropzones.forEach(dropzone => dropzone.classList.add('highlight'))

            // this = card
            this.classList.add('is-dragging')
        }

        function drag() {
            // log('CARD: Is dragging ')
        }

        function dragend() {
            // log('CARD: Stop drag! ')
            dropzones.forEach(dropzone => dropzone.classList.remove('highlight'))

            // this = card
            this.classList.remove('is-dragging')
        }

        /** place where we will drop cards */
        dropzones.forEach(dropzone => {
            dropzone.addEventListener('dragenter', dragenter)
            dropzone.addEventListener('dragover', dragover)
            dropzone.addEventListener('dragleave', dragleave)
            dropzone.addEventListener('drop', drop)
        })

        function dragenter() {
            // log('DROPZONE: Enter in zone ')
        }

        function dragover() {
            // this = dropzone
            this.classList.add('over')

            // get dragging card
            const cardBeingDragged = document.querySelector('.is-dragging')

            // this = dropzone
            this.appendChild(cardBeingDragged)
        }

        function dragleave() {
            // log('DROPZONE: Leave ')
            // this = dropzone
            this.classList.remove('over')

        }

        function drop() {
            // log('DROPZONE: dropped ')
            this.classList.remove('over');

        }
    }

    useEffect(() => {
        configDragnDrop();
    })


    return (
        <div>
            <header className="header">
                <h1 className="header__text">Assistant</h1>
            </header>
            <main>
                <div className="boards">
                    <div className="boards__board boards__board--pointy">
                        <h3 className="board_title">Métodos</h3>
                        <div className="dropzone">
                            {
                                proceduresList.map((procedure) => {
                                    return (
                                        <div key={procedure.IdProcedure}>
                                            <div id={procedure.IdProcedure + ";" + procedure.ProcedureValue} className={"card-" + procedure.ProcedureType + " card"} draggable="true" onClick={() => handleShow(procedure)}>
                                                <img className="card__balls" src={bolinhas} alt="bolinhas" />
                                                <div className="card__content">{procedure.ProcedureName}</div>
                                            </div>

                                            <div id={"modal" + procedure.IdProcedure} className="modal">
                                                {/* Modal content */}
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <span onClick={() => handleClose(procedure.IdProcedure)} className="close">&times;</span>
                                                        <div className="modal-header--content">
                                                            <p className="modal__text--heading">Nome:</p>
                                                            <p className="modal__text--heading2">{procedure.ProcedureName}</p>
                                                        </div>
                                                        <div className="modal-header--content">
                                                            <p className="modal__text--heading">Descrição:</p>
                                                            <p className="modal__text--heading2">{procedure.ProcedureDescription}</p>
                                                        </div>
                                                    </div>
                                                    <div className="modal-body">
                                                        <label className="modal__text" htmlFor="">Digite aqui o valor necessário:</label>

                                                        <input className="modal__input" type="text" value={pValue} onChange={(campo) => {
                                                            setPValue(campo.target.value, procedure.ProcedureValue = campo.target.value);
                                                            //   console.log(procedure.ProcedureValue)
                                                        }} />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })

                            }

                        </div>
                        <button className="boards__button boards__button--small" onClick={() => SaveAndExecute()}><FontAwesomeIcon icon={faFloppyDisk} size="lg" /><p className="button__text">Salvar</p></button>
                    </div>
                    <div className="flow">
                        <div className="boards__board">
                            <h3 className="board_title">Fluxo</h3>
                            <div id="flow" className="dropzone">
                            </div>
                            <button className="boards__button" onClick={() => SaveAndExecute()}><FontAwesomeIcon icon={faCirclePlay} size="lg" /> <p className="button__text">Executar assistente</p></button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}