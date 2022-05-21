import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "../../assets/css/assistant.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import bolinhas from "../../assets/img/Bolinhas.svg"

import Navbar from '../../components/menu/Navbar'
import Footer from '../../components/footer/footer'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { parseJwt } from "../../services/auth"

import Procedures from '../../services/process';
import { set } from "react-hook-form";

import { API } from "../../services/api";

// testar colocar uma lista com informações dos cards/bloquinhos
export default function Assistant() {

    const [MyProcedures, setMyProcedures] = useState([])
    const [Assistant, setAssistant] = useState("")
    const [proceduresList, setProceduresList] = useState(Procedures);
    const [pValue, setPValue] = useState();
    const [isSaving, setIsSaving] = useState(false);
    const [isExecuting, setIsExecuting] = useState(false);
    const [result, setResult] = useState("oi");

    const location = useLocation();
    var idAssistant = location.state.id;

    function GetProceduresById() {
        fetch('http://localhost:5000/api/AssistantProcedure/Assistant/' + idAssistant, {
            // fetch(API + '/api/AssistantProcedure' + idAssistant, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao'),
            },
        })
            .then((response) => response.json())
            .then((data) =>
                setMyProcedures(data)
                //console.log(data)
            )
            .catch((error) => console.log(error));
    };
    useEffect(GetProceduresById, [])

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

    function Save() {
        //Get the cards inside the dropzone and number them by order.
        let parent = document.getElementById("flow");
        let children = parent.childNodes;
        var child = [];

        var myURL = API + "/api/AssistantProcedure/ProceduresVerification";

        for (let index = 0; index < children.length; index++) {
            setIsSaving(true);
            var child = children[index];

            var splited = child.id.split(";");
            child.id = (index + 1) + ";" + splited[1].toString();
            // console.log(child);

            var myBody = JSON.stringify({
                "idAssistant": idAssistant,
                "procedurePriority": index + 1,
                "procedureName": child.textContent,
                "procedureDescription": "",
                "procedureValue": splited[1]
            });

            // console.log(myBody)

            fetch(myURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: myBody
            })
                .then((response) => {
                    // console.log("before if");
                    if (response.status === 200 || response.status === 201) {
                        // console.log("after if");
                        toast.success('o procedimento ' + child.textContent + ' foi salvo');
                    } else {
                        toast.error("O salvamento deu errado no " + child.textContent + " :/");
                    }
                })
                .catch((erro) => {
                    console.log(erro);
                    toast.error("Alguma coisa deu errado :/");
                });
        }

        // console.log("terminou o for");

        //save the playwright script for the assistant
        var myURL2 = API + "/api/AssistantProcedure/ManipulateScript/" + idAssistant;


        fetch(myURL2, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                // console.log("before if");
                if (response.status === 201) {
                    // console.log("after if");
                    return response.text()
                } else {
                    toast.error(`Houve erros no processo de salvamento do assistente ${idAssistant}`)
                }
            })
            .then((data) => {
                // console.log(data);
                setResult(data);
                toast.success(`o assistente ${idAssistant} foi salvo`)
                setIsSaving(false);
            })
            .catch((erro) => {
                console.log(erro);
                toast.error("O script de salvamento não foi salvo :/");
                setIsSaving(false);
            });
    }

    function GetAssistantById() {
        var myURL = "http://localhost:5000/api/Assistants/" + location.state.id;

        fetch(myURL, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao'),
            },
        })
            .then((response) => response.json())
            .then((data) =>
                setAssistant(data)
                // console.log(data)
            )
            .catch((error) => console.log(error));
    }

    function Execute() {
        setIsExecuting(true);
        // console.log(parseJwt());
        // console.log(parseJwt().email);

        var eURL = API + "/api/Assistant" + idAssistant + "/Post";
        var eBody = JSON.stringify({
            "email": parseJwt().email,
            "emailBody": result
        });

        fetch(eURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: eBody
        })
            .then((response) => {
                // console.log("before if");
                console.log(response)
                if (response.status === 204) {
                    console.log("FUNCIONOU");
                    
                    toast.success("O resultado foi enviado para seu email");
                } else {
                    toast.error("A execução deu errado :/");
                }
                setIsExecuting(false);
            })
            .catch((erro) => {
                console.log(erro)
                toast.error("A execução deu errado :/");
                setIsExecuting(false);
            })
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
        GetAssistantById();

    })

    return (
        <div>
            <header className="header container">
                <h1 className="header__text">{Assistant.assistantName}</h1>
            </header>
            <main className="main-Assistant">
                <Navbar />
                <div className="boards container">
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
                                                    <span onClick={() => handleClose(procedure.IdProcedure)} className="close">&times;</span>
                                                    <div className="modal-header">
                                                        <div className="modal-header--content">
                                                            <p className="modal__text--heading modal__text">Nome:</p>
                                                            <p className="modal__text--heading2 modal__text">{procedure.ProcedureName}</p>
                                                        </div>
                                                        <div className="modal-header--content">
                                                            <p className="modal__text--heading modal__text">Descrição:</p>
                                                            <p className="modal__text--heading2 modal__text">{procedure.ProcedureDescription}</p>
                                                        </div>
                                                    </div>
                                                    <div className="modal-body">
                                                        <label className="modal__text" htmlFor="">Digite aqui o valor necessário:</label>

                                                        <input className="modal__input" type="text" placeholder={"Digite o valor para " + procedure.ProcedureName} value={pValue} onChange={(campo) => {
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
                    </div>
                    <div className="flow">
                        <div className="boards__board">
                            <h3 className="board_title">Fluxo</h3>
                            <div id="flow" className="dropzone">
                                {
                                    MyProcedures.map((p) => {
                                        return (
                                            <div className="card-flow" key={p.idAprocedure}>
                                                <div id={p.idAprocedure + ";" + p.procedureValue} className="box-card-flow" draggable="true" onClick={() => handleShow(p)}>
                                                    <img className="card__balls" src={bolinhas} alt="bolinhas" />
                                                    <div className="card__content">{p.procedureName}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {
                                isSaving === false ? (
                                    <button className="boards__button boards__button--small" onClick={() => Save()}><FontAwesomeIcon icon={faFloppyDisk} size="lg" /><p className="button__text">Salvar</p></button>
                                ) : (
                                    <button disabled className="boards__button boards__button--small" onClick={() => Save()}><FontAwesomeIcon icon={faFloppyDisk} size="lg" /><p className="button__text">Salvando...</p></button>
                                )
                            }
                            {
                                isExecuting === false ? (
                                    <button className="boards__button" onClick={() => Execute()}><FontAwesomeIcon icon={faCirclePlay} size="lg" /> <p className="button__text">Executar assistente</p></button>
                                ) : (
                                    <button disabled className="boards__button" onClick={() => Execute()}><FontAwesomeIcon icon={faSpinner} size="lg" spin /> <p className="button__text">Executando...</p></button>
                                )
                            }
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </main>
            <Footer />
        </div>
    )

}