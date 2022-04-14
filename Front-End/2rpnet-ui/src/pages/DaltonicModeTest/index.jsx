import { Component } from 'react';
import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import VLibras from '@djpfs/react-vlibras'


//img:
import Logo from '../../assets/img/logo2RP.png'
import Robo from '../../assets/img/roboLandingPage.png'
import Financas from '../../assets/img/financas.png'
import Banco from '../../assets/img/banco.png'
import Admin from '../../assets/img/admin.png'
import PageRepresentation from '../../assets/img/pageRepresentation.png'

//Components:
import Footer from '../../components/footer/footer'

//css:
import '../../assets/css/pages/landingPage.css'
import '../../assets/css/components/button.css'
import '../../assets/css/components/fonts.css'
import Navbar from '../../components/menu/Navbar'

export default function TesteDaltonicMode() {
    const MudarTema = () => {
        let form = document.querySelector('.color_mode');

        form.addEventListener('change', (e) => {
            let mode = e.target.value;

            if (mode === "normal") {
                document.documentElement.classList.toggle("normal")
            }
            else if (mode === "achromatopsia") {
                document.documentElement.classList.toggle("Acromatopsia")
            }
            else if (mode === "protanopia") {
                document.documentElement.classList.toggle("Protanopia")
            }
            else if (mode === "deuteranopia") {
                document.documentElement.classList.toggle("Deuteranopia")
            }
            else if (mode === "tritanopia") {
                document.documentElement.classList.toggle("Tritanopia")
            }
            else {
                document.documentElement.classList.toggle("normal")
            }
        })
    }
    return (
        <div>
            <Navbar />
            <VLibras />
            <div>
                <form onSubmit={() => MudarTema()}>
                    <label for="normal_mode">
                        <input type="radio" name="color_mode" id="normal_mode" value="normal" checked></input>
                        Padrão
                    </label>
                    <label for="normal_mode">
                        <input type="radio" name="color_mode" id="achromatopsia_mode" value="achromatopsia" checked></input>
                        Acromatopsia
                    </label>
                    <label for="normal_mode">
                        <input type="radio" name="color_mode" id="protanopia_mode" value="protanopia" checked></input>
                        Protanopia
                    </label>
                    <label for="normal_mode">
                        <input type="radio" name="color_mode" id="delteranopia_mode" value="deuteranopia" checked></input>
                        Delteranopia
                    </label>
                    <label for="normal_mode">
                        <input type="radio" name="color_mode" id="tritanopia_mode" value="tritanopia" checked></input>
                        Tritanopia
                    </label>
                    <button type="submit" value="Confirmar">AAAAAAAA</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}