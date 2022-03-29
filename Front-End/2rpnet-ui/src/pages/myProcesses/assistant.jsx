import "../../assets/css/assistant.css";
import React from "react";
import { useEffect, UseState } from "react";

export default function Assistant() {

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
            this.classList.remove('over')
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
                        <div className="card card-email" draggable="true">
                            <div className="content"> Ler ultimo email</div>
                        </div>
                    </div>
                </div>
                <div className="board">
                    <h3>Fluxo</h3>
                    <div className="dropzone">
                        <div className="card card-math" draggable="true">
                            <div className="content"> Somar</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}