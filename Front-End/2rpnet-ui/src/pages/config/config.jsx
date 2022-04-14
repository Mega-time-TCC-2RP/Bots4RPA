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

//css:
import '../../assets/css/components/button.css'
import '../../assets/css/components/fonts.css'

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

    return (
        <div>
            {/* <Navbar /> */}
            <div className='configPage'>
                <h1 className='container h1'>Configurações</h1>
                <nav>
                    <span onClick={() => setCurrentStep(0)}>Meus Dados</span>
                    <span onClick={() => setCurrentStep(1)}>Acessibilidade</span>
                    <span onClick={() => setCurrentStep(2)}>Validar usuários</span>
                    <span onClick={() => setCurrentStep(3)}>Validar Empresas</span>
                </nav>
                <section>
                    {
                        steps[currentStep].id === 'Step1' && (
                            <div>
                                <div>
                                    <h2>Meus Dados</h2>
                                    <div>
                                        <div>
                                            <h3>Email</h3>
                                            <h3>Nome</h3>
                                            <h3>Idade</h3>
                                        </div>
                                        <div>
                                            <h3>CPF</h3>
                                            <h3>RG</h3>
                                            <h3>Telefone</h3>
                                        </div>
                                    </div>
                                    <img src="" alt="" />
                                </div>
                                <button>Atualizar Dados</button>
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
                            <div>
                                <h2>Validar Usuários</h2>
                                <div>
                                    <div>
                                        <span>Email <p>LoremIpsum</p></span>
                                        <span>CPF <p>LoremIpsum</p></span>
                                        <span>Nome <p>LoremIpsum</p></span>
                                        <span>RG <p>LoremIpsum</p></span>
                                        <span>Telefone <p>LoremIpsum</p></span>
                                        <span>Data de Nascimento <p>LoremIpsum</p></span>
                                    </div>
                                    <div>
                                        <SiIcons.SiVerizon />
                                        <AiIcons.AiOutlineClose />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        steps[currentStep].id === "Step4" && (
                            <div>
                                <h2>Validar Empresas</h2>
                                <div>
                                    <div>
                                        <span>CNPJ <p>LoremIpsum</p></span>
                                        <span>Razão Social <p>LoremIpsum</p></span>
                                        <span>Nome Fantasia <p>LoremIpsum</p></span>
                                    </div>
                                    <div>
                                        <SiIcons.SiVerizon />
                                        <AiIcons.AiOutlineClose />
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