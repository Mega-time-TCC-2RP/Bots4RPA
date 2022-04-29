import { Component } from 'react';
import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Navbar from '../../components/menu/Navbar'

//img:
import Azul_Home from '../../assets/img/Azul_Home.png'
import Vermelho_Home from '../../assets/img/Vermelho_Home.png'
import Amarelo_Home from '../../assets/img/Amarelo_Home.png'
import Verde_Home from '../../assets/img/Verde_Home.png'
import Post_Perfil_Photo from '../../assets/img/Post_Perfil_Photo.png'
import Img_Home_Post from '../../assets/img/Img_Home_Post.png'
import Profile from '../../assets/img/profile.jpg'

//css:
import '../../assets/css/components/button.css'
import '../../assets/css/components/fonts.css'
import '../../assets/css/pages/config.css'

//icons:
import * as AiIcons from 'react-icons/ai'
import * as SiIcons from 'react-icons/si'

const steps = [
    {
        id: 'Step1'
    },
    {
        id: 'Step2'
    },
    {
        id: 'Step3'
    },
    {
        id: 'Step4'
    }
];

const configCustomStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '1000px',
        height: '90vh',
        background: 'var(--WHITE)',
        boxShadow: 'var(--darkShadow)',
        borderRadius: '30px'
    },
};

Modal.setAppElement('#root');

export default function Config() {
    const [currentStep, setCurrentStep] = useState(0);
    const [modalConfig, setModalConfig] = useState(false);

    function openModalConfig() {
        setModalConfig(true);
    }

    function closeModalConfig() {
        setModalConfig(false);
    }

    function select(nextStep) {
        setCurrentStep(nextStep)
        switch (nextStep) {
            case 0:
                document.querySelector('.meusTrofeus').classList.toggle('selected')
                document.querySelector('.progresso').classList.remove('selected')
                document.querySelector('.minhasSkins').classList.remove('selected')
                break;
            case 1:
                document.querySelector('.meusTrofeus').classList.remove('selected')
                document.querySelector('.progresso').classList.toggle('selected')
                document.querySelector('.minhasSkins').classList.remove('selected')
                break;
            case 2:
                document.querySelector('.meusTrofeus').classList.remove('selected')
                document.querySelector('.progresso').classList.remove('selected')
                document.querySelector('.minhasSkins').classList.toggle('selected')
                break;
            default:
                break;
        }
    }

    useEffect(() => select(0), [])

    return (
        <div>
            <Navbar />
            <div className='configPage'>
                <h1 className='container h1' alt="configurações">Configurações</h1>
                <nav className='navAreaConfig container'>
                    <span className='h3 meusTrofeus' id='meusTrofeus' onClick={() => select(0)}>Meus troféus</span>
                    <span className='h3 progresso' id='progresso' onClick={() => select(1)}>Progresso</span>
                    <span className='h3 minhasSkins' id='minhasSkins' onClick={() => select(2)}>Minhas skins</span>
                </nav>
                <section className='configContent validUser container'>
                    {
                        steps[currentStep].id === 'Step1' && (
                            <div cAcessibilidadelassName='areaStep'>
                                <h2 alt="MeusTrofeus">Meus troféus</h2>
                            </div>
                        )
                    }
                    {
                        steps[currentStep].id === 'Step2' && (
                            <div cAcessibilidadelassName='areaStep'>
                                <h2 alt="Progresso">Progresso</h2>
                            </div>
                        )
                    }
                    {
                        steps[currentStep].id === 'Step3' && (
                            <div className='scrollDiv' cAcessibilidadelassName='areaStep'>
                                <h2 alt="MinhasSkins">Minhas skins</h2>
                            </div>
                        )
                    }
                </section>
            </div>
        </div>
    );
}