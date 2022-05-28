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
    const [proceduresList, setProceduresList] = useState([]);
    const [pValue, setPValue] = useState();
    const [eRValue, setERValue] = useState();
    const [eSValue, setESValue] = useState();
    const [eBValue, setEBValue] = useState();
    const [isSaving, setIsSaving] = useState(false);
    const [isExecuting, setIsExecuting] = useState(false);
    const [result, setResult] = useState("oi");
    const [resultEmail, setResultEmail] = useState("");


    const location = useLocation();
    var idAssistant = location.state.id;


    function GetProceduresById() {
        fetch(API + '/api/AssistantProcedure/Assistant/' + idAssistant, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao'),
            },
        })
            .then((response) => response.json())
            .then((data) =>
                setMyProcedures(data)
                // console.log(data)
            )
            .catch((error) => console.log(error));
    };
    useEffect(GetProceduresById, [])

    function returnModalEmail(procedure) {
        if (procedure.procedureName != "Enviar email para alguem") {
            return (
                <input className="modal__input" type="text" placeholder={"Digite o valor para " + procedure.procedureName} value={pValue} onChange={(campo) => {
                    setPValue(campo.target.value, procedure.procedureValue = campo.target.value);
                    //   console.log(procedure.procedureValue)
                }} />
            )
        } else {

            return (
                <form className="form__input">
                    <input className="modal__input" type="text" placeholder={"Digite o destinatário"} value={eRValue} onChange={(campo) => {
                        setERValue(campo.target.value, procedure.emailReceiver = campo.target.value);
                    }} />
                    <input className="modal__input" type="text" placeholder={"Digite o assunto do email"} value={eSValue} onChange={(campo) => {
                        setESValue(campo.target.value, procedure.emailSubject = campo.target.value);
                    }} />
                    <input className="modal__input" type="text" placeholder={"Digite o corpo do email"} value={eBValue} onChange={(campo) => {
                        setEBValue(campo.target.value, procedure.emailBody = campo.target.value);
                    }} />
                </form>
            )
        }
    }

    function handleShow(p) {
        var modal = document.getElementById("modal" + p.idAprocedure);
        // console.log(modal)
        // console.log(p)
        modal.style.display = "block";

        if (p.procedureName != "Enviar email para alguem") {
            if (pValue != p.procedureValue) {
                if (p.procedureValue != 0 || p.procedureValue != "") {
                    setPValue(p.procedureValue);
                }
                else {
                    setPValue("");
                }
            }

        } else {
            if (eRValue != p.emailReceiver) {
                if (p.emailReceiver != "") {
                    setERValue(p.emailReceiver);
                } else {
                    setERValue("")
                }
            }
            if (eSValue != p.emailSubject) {
                if (p.emailSubject != "") {
                    setESValue(p.emailSubject);
                } else {
                    setESValue("")
                }
            }
            if (eBValue != p.emailBody) {
                if (p.emailBody != "") {
                    setEBValue(p.emailBody);
                } else {
                    setEBValue("")
                }
            }
            // console.log(p);
        }
    };

    function handleClose(p) {
        var modal = document.getElementById("modal" + p.idAprocedure);
        // console.log(p);
        modal.style.display = "none";
        if (p.procedureName == "Enviar email para alguem") {
            p.procedureValue = `${p.emailReceiver}/${p.emailSubject}/${p.emailBody}`;
            setResultEmail(`${p.emailReceiver}/${p.emailSubject}/${p.emailBody}`);
        }
    };

    function SaveProcedures() {
        //Get the cards inside the dropzone and number them by order.
        setIsSaving(true);
        let parent = document.getElementById("flow");
        let children = parent.childNodes;
        var child = [];
        
        var myURL = API + "/api/AssistantProcedure/" + idAssistant;

        for (let index = 0; index < children.length; index++) {
            setTimeout(() => {

                var child = children[index];

                var splited = child.id.split(";");
                child.id = (index+1) + ";" + splited[1].toString();

                var myBody = JSON.stringify({
                    "idAssistant": idAssistant,
                    "procedurePriority": index+1,
                    "procedureName": child.textContent,
                    "procedureDescription": "",
                    "procedureValue": splited[1]
                });

                fetch(myURL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: myBody
                })
                    .then((response) => {
                        if (response.status === 200 || response.status === 201) {
                            toast.success('o procedimento ' + child.textContent + ' foi salvo');
                        } else {
                            toast.error("O salvamento deu errado no " + child.textContent + " :/");
                        }
                    })
                    .catch((erro) => {
                        console.log(erro);
                        toast.error("Alguma coisa deu errado :/");
                    });

            }, 100);
        }

    }

    function ManipulateScript() {
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

    function Save() {
       SaveProcedures();
       ManipulateScript();
    }

    function GetAssistantById() {
        var myURL = API + "/api/Assistants/" + location.state.id;

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

        var getURL = API + "/api/AssistantProcedure/Assistant/" + idAssistant;
        fetch(getURL, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                return response.json()
                    .then((data) => {
                        console.log(data);
                        data.map((procedure) => {
                            console.log(procedure);
                            console.log(procedure.procedureName);

                            if (procedure.procedureName == "Enviar email para alguem") {
                                console.log(procedure.procedureValue);
                                var splitEmail = procedure.procedureValue.split("/");
                                console.log(splitEmail);

                                var epURL = API + "/api/Assistants/EnviarEmailUsuario";
                                var epBody = JSON.stringify({
                                    "emailTitle": splitEmail[1],
                                    "email": splitEmail[0],
                                    "emailBody": splitEmail[2]
                                });

                                fetch(epURL, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: epBody
                                })
                                    .then((response) => {
                                        // console.log("before if");
                                        console.log(response)
                                        if (response.status === 200) {
                                            console.log("FUNCIONOU");
                                            toast.success("O email que você escreveu foi enviado");
                                        } else {
                                            toast.error("Houve um problema no envio de seu email :/");
                                        }
                                        setIsExecuting(false);
                                    })
                                    .catch((erro) => {
                                        console.log(erro)
                                        toast.error("Houve um problema no envio de seu email :/");
                                        setIsExecuting(false);
                                    })
                            }
                        })
                    })
            });

        // console.log(parseJwt());
        // console.log(parseJwt().email);

        var eURL = API + "/api/Assistant" + idAssistant + "/Post";
        var eBody = JSON.stringify({
            "emailTitle": "",
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
        setProceduresList(Procedures);
    })

    return (
        <div>
            <header className="header containerAssistant">
                <h1 className="header__text">{Assistant.assistantName}</h1>
            </header>
            <main className="main-Assistant">
                <Navbar />
                <div className="boards containerAssistant">
                    <div className="boards__board boards__board--pointy">
                        <h3 className="board_title">Métodos</h3>
                        <div className="dropzone">
                            {
                                proceduresList.map((procedure) => {
                                    return (
                                        <div key={procedure.idAprocedure}>
                                            <div id={procedure.idAprocedure + ";" + procedure.procedureValue} className={"card-flow" + " card"} draggable="true" onClick={() => handleShow(procedure)}>
                                                <img className="card__balls" src={bolinhas} alt="bolinhas" />
                                                <div className="card__content">{procedure.procedureName}</div>
                                            </div>

                                            <div id={"modal" + procedure.idAprocedure} className="modal">
                                                {/* Modal content */}
                                                <div className="modal-content">
                                                    <span onClick={() => handleClose(procedure)} className="close">&times;</span>
                                                    <div className="modal-headerA">
                                                        <div className="modal-header--content">
                                                            <p className="modal__text--heading modal__text">Nome:</p>
                                                            <p className="modal__text--heading2 modal__text">{procedure.procedureName}</p>
                                                        </div>
                                                        <div className="modal-header--content">
                                                            <p className="modal__text--heading modal__text">Descrição:</p>
                                                            <p className="modal__text--heading2 modal__text">{procedure.procedureDescription}</p>
                                                        </div>
                                                    </div>
                                                    <div className="modal-body">
                                                        <label className="modal__text" htmlFor="">Digite aqui o valor necessário:</label>
                                                        {
                                                            returnModalEmail(procedure)
                                                        }
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
                                            <div key={p.idAprocedure}>

                                                <div key={p.idAprocedure}>
                                                    <div id={p.idAprocedure + ";" + p.procedureValue} className={"card-flow" + " card"} draggable="true" onClick={() => handleShow(p)}>
                                                        <img className="card__balls" src={bolinhas} alt="bolinhas" />
                                                        <div className="card__content">{p.procedureName}</div>
                                                    </div>
                                                </div>

                                                <div id={"modal" + p.idAprocedure} className="modal">
                                                    <div className="modal-content">
                                                        <span onClick={() => handleClose(p)} className="close">&times;</span>
                                                        <div className="modal-headerA">
                                                            <div className="modalA-header--content">
                                                                <p className="modal__text--heading modal__text">Nome:</p>
                                                                <p className="modal__text">{p.procedureName}</p>
                                                            </div>
                                                            <div className="modalA-header--content">
                                                                <p className="modal__text--heading modal__text">Descrição:</p>
                                                                <p className="modal__text">{p.procedureDescription}</p>
                                                            </div>
                                                        </div>
                                                        <div className="modal-body">
                                                            <label className="modal__text modal__text--heading" htmlFor="">Digite aqui o valor necessário:</label>
                                                            {
                                                                returnModalEmail(p)
                                                            }
                                                        </div>
                                                    </div>
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