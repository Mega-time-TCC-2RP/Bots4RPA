import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../assets/css/assistant.css";

// testar colocar uma lista com informações dos cards/bloquinhos

export default function Assistant() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function Save() {
        //Get the cards inside the dropzone and number them by order.
        let parent = document.getElementById("flow");
        let children = parent.childNodes;


        for (let index = 0; index <= children.length; index++) {
            var child = children[index];
            child.id = index + 1;
            console.log(child);
        }

        // console.log(children);
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
            <div className="boards">
                <div className="board">
                    <h3>Métodos</h3>
                    <div className="dropzone">
                        <div className="card card-email" draggable="true" onClick={handleShow}>
                            <div className="content"> Ler ultimo email</div>
                        </div>
                    </div>
                </div>
                <div className="board">
                    <h3>Fluxo</h3>
                    <div id="flow" className="dropzone">
                        <div className="card card-math" draggable="true" onClick={handleShow}>
                            <div className="content"> Somar</div>
                        </div>
                    </div>
                </div>
                <button onClick={() => Save()}>Salvar</button>

                {/* Modal */}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="hModal">Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="tModal">Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        {/* <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button> */}
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}