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
    const SetTema = () => {
        let mode = localStorage.getItem('temaApp');
        if (mode === "normal") {
            document.documentElement.classList.toggle("normal")
            document.documentElement.classList.remove("Acromatopsia")
            document.documentElement.classList.remove("Protanopia")
            document.documentElement.classList.remove("Deuteranopia")
            document.documentElement.classList.remove("Tritanopia")
            localStorage.setItem('temaApp', mode);
        }
        else if (mode === "achromatopsia") {
            document.documentElement.classList.toggle("Acromatopsia")
            document.documentElement.classList.remove("default")
            document.documentElement.classList.remove("Protanopia")
            document.documentElement.classList.remove("Deuteranopia")
            document.documentElement.classList.remove("Tritanopia")
            localStorage.setItem('temaApp', mode);
        }
        else if (mode === "protanopia") {
            document.documentElement.classList.toggle("Protanopia")
            document.documentElement.classList.remove("Acromatopsia")
            document.documentElement.classList.remove("default")
            document.documentElement.classList.remove("Deuteranopia")
            document.documentElement.classList.remove("Tritanopia")
            localStorage.setItem('temaApp', mode);
        }
        else if (mode === "deuteranopia") {
            document.documentElement.classList.toggle("Deuteranopia")
            document.documentElement.classList.remove("Acromatopsia")
            document.documentElement.classList.remove("Protanopia")
            document.documentElement.classList.remove("default")
            document.documentElement.classList.remove("Tritanopia")
            localStorage.setItem('temaApp', mode);
        }
        else if (mode === "tritanopia") {
            document.documentElement.classList.toggle("Tritanopia")
            document.documentElement.classList.remove("Acromatopsia")
            document.documentElement.classList.remove("Protanopia")
            document.documentElement.classList.remove("Deuteranopia")
            document.documentElement.classList.remove("default")
            localStorage.setItem('temaApp', mode);
        }
        else {
            document.documentElement.classList.toggle("normal")
            document.documentElement.classList.remove("Acromatopsia")
            document.documentElement.classList.remove("Protanopia")
            document.documentElement.classList.remove("Deuteranopia")
            document.documentElement.classList.remove("Tritanopia")
            localStorage.setItem('temaApp', "normal");
        }
      }

    const MudarTema = (theme) => {
        let mode = theme;

        if (mode === "normal") {
            document.documentElement.classList.toggle("normal")
            document.documentElement.classList.remove("Acromatopsia")
            document.documentElement.classList.remove("Protanopia")
            document.documentElement.classList.remove("Deuteranopia")
            document.documentElement.classList.remove("Tritanopia")
            localStorage.setItem('temaApp', mode);
        }
        else if (mode === "achromatopsia") {
            document.documentElement.classList.toggle("Acromatopsia")
            document.documentElement.classList.remove("default")
            document.documentElement.classList.remove("Protanopia")
            document.documentElement.classList.remove("Deuteranopia")
            document.documentElement.classList.remove("Tritanopia")
            localStorage.setItem('temaApp', mode);
        }
        else if (mode === "protanopia") {
            document.documentElement.classList.toggle("Protanopia")
            document.documentElement.classList.remove("Acromatopsia")
            document.documentElement.classList.remove("default")
            document.documentElement.classList.remove("Deuteranopia")
            document.documentElement.classList.remove("Tritanopia")
            localStorage.setItem('temaApp', mode);
        }
        else if (mode === "deuteranopia") {
            document.documentElement.classList.toggle("Deuteranopia")
            document.documentElement.classList.remove("Acromatopsia")
            document.documentElement.classList.remove("Protanopia")
            document.documentElement.classList.remove("default")
            document.documentElement.classList.remove("Tritanopia")
            localStorage.setItem('temaApp', mode);
        }
        else if (mode === "tritanopia") {
            document.documentElement.classList.toggle("Tritanopia")
            document.documentElement.classList.remove("Acromatopsia")
            document.documentElement.classList.remove("Protanopia")
            document.documentElement.classList.remove("Deuteranopia")
            document.documentElement.classList.remove("default")
            localStorage.setItem('temaApp', mode);
        }
        else {
            document.documentElement.classList.toggle("normal")
            document.documentElement.classList.remove("Acromatopsia")
            document.documentElement.classList.remove("Protanopia")
            document.documentElement.classList.remove("Deuteranopia")
            document.documentElement.classList.remove("Tritanopia")
            localStorage.setItem('temaApp', "normal");
        }
    }
    return (
        <div>
            <Navbar />
            <VLibras />
            <select onChange={(e) => MudarTema(e.target.value)}>
                <optgroup>
                    {
                        localStorage.getItem('temaApp') === "normal" ?
                        <option value="normal" selected>Padrão</option> : <option value="normal">Padrão</option>
                    }
                    {
                        localStorage.getItem('temaApp') === "tritanopia" ?
                        <option value="tritanopia" selected>Tritanopia</option> : <option value="tritanopia">Tritanopia</option>
                    }
                    {
                        localStorage.getItem('temaApp') === "deuteranopia" ?
                        <option value="deuteranopia" selected>Deuteranopia</option> : <option value="deuteranopia">Deuteranopia</option>
                    }
                    {
                        localStorage.getItem('temaApp') === "protanopia" ?
                        <option value="protanopia" selected>Protanopia</option> : <option value="protanopia">Protanopia</option>
                    }
                    {
                        localStorage.getItem('temaApp') === "achromatopsia" ?
                        <option value="achromatopsia" selected>Acromatopsia</option> : <option value="achromatopsia">Acromatopsia</option>
                    }
                </optgroup>
            </select>
            <Footer />
        </div>
    );
}