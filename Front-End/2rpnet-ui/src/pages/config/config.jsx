import { Component } from 'react';
import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
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

export default function Config() {
    const [currentStep, setCurrentStep] = useState(0);

    function select(nextStep) {
        setCurrentStep(nextStep)
        switch (nextStep) {
            case 0:
                document.querySelector('.myData').classList.toggle('selected')
                document.querySelector('.Acessibilidade').classList.remove('selected')
                document.querySelector('.validarUsuarios').classList.remove('selected')
                document.querySelector('.validarEmpresas').classList.remove('selected')
                break;
            case 1:
                document.querySelector('.myData').classList.remove('selected')
                document.querySelector('.Acessibilidade').classList.toggle('selected')
                document.querySelector('.validarUsuarios').classList.remove('selected')
                document.querySelector('.validarEmpresas').classList.remove('selected')
                break;
            case 2:
                document.querySelector('.myData').classList.remove('selected')
                document.querySelector('.Acessibilidade').classList.remove('selected')
                document.querySelector('.validarUsuarios').classList.toggle('selected')
                document.querySelector('.validarEmpresas').classList.remove('selected')
                break;
            case 3:
                document.querySelector('.myData').classList.remove('selected')
                document.querySelector('.Acessibilidade').classList.remove('selected')
                document.querySelector('.validarUsuarios').classList.remove('selected')
                document.querySelector('.validarEmpresas').classList.toggle('selected')
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <Navbar />
            <div className='configPage'>
                <h1 className='container h1'>Configurações</h1>
                <nav className='navAreaConfig container'>
                    <span className='h3 myData' id='myData' onClick={() => select(0)}>Meus Dados</span>
                    <span className='h3 Acessibilidade' id='Acessibilidade' onClick={() => select(1)}>Acessibilidade</span>
                    <span className='h3 validarUsuarios' id='validarUsuarios' onClick={() => select(2)}>Validar usuários</span>
                    <span className='h3 validarEmpresas' id='validarEmpresas' onClick={() => select(3)}>Validar Empresas</span>
                </nav>
                <section className='configContent validUser container'>
                    {
                        steps[currentStep].id === 'Step1' && (
                            <div className='areaStep'>
                                <div className='contentAreaConfig'>
                                    <div className='mainContentArea'>
                                        <div className='contentConfig'>
                                            <h3 className='h5'>Email: <p>LoremIpsum</p></h3>
                                            <h3 className='h5'>Nome: <p>LoremIpsum</p></h3>
                                            <h3 className='h5'>Idade: <p>LoremIpsum</p></h3>
                                        </div>
                                        <div className='contentConfig'>
                                            <h3 className='h5'>CPF: <p>LoremIpsum</p></h3>
                                            <h3 className='h5'>RG: <p>LoremIpsum</p></h3>
                                            <h3 className='h5'>Telefone: <p>LoremIpsum</p></h3>
                                        </div>
                                    </div>
                                    <img src={Profile} className='profileImage' alt="Imagem de perfil" />
                                </div>
                                <button className='button'>Atualizar Dados</button>
                            </div>
                        )
                    }
                    {
                        steps[currentStep].id === 'Step2' && (
                            <div>
                                <h2>Acessibilidade</h2>
                            </div>
                        )
                    }
                    {
                        steps[currentStep].id === 'Step3' && (
                            <div className='scrollDiv'>
                                <div className='mainContentArea contentValidUser'>
                                    <div className='contentConfig'>
                                        <h3>Email <p>LoremIpsum</p></h3>
                                        <h3>CPF <p>LoremIpsum</p></h3>
                                        <h3>Nome <p>LoremIpsum</p></h3>
                                        <h3>RG <p>LoremIpsum</p></h3>
                                        <h3>Telefone <p>LoremIpsum</p></h3>
                                        <h3>Data de Nascimento <p>LoremIpsum</p></h3>
                                    </div>
                                    <div>
                                        <SiIcons.SiVerizon className='iconConfig' />
                                        <AiIcons.AiOutlineClose className='iconConfig2' />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        steps[currentStep].id === "Step4" && (
                            <div className='scrollDiv'>
                                <div className='mainContentArea contentValidCompany'>
                                    <div className='contentConfig'>
                                        <h3>CNPJ <p>LoremIpsum</p></h3>
                                        <h3>Razão Social <p>LoremIpsum</p></h3>
                                        <h3>Nome Fantasia <p>LoremIpsum</p></h3>
                                    </div>
                                    <div>
                                        <SiIcons.SiVerizon className='iconConfig' />
                                        <AiIcons.AiOutlineClose className='iconConfig2' />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </section>
            </div>
        </div>
    );
}