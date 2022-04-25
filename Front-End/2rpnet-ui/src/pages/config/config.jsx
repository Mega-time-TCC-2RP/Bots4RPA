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

    const MudarTema = (theme) => {
        let mode = theme;

        if (mode === "normal") {
            document.documentElement.classList.toggle("normal")
            document.documentElement.classList.remove("Acromatopsia")
            document.documentElement.classList.remove("Protanopia")
            document.documentElement.classList.remove("Deuteranopia")
            document.documentElement.classList.remove("Tritanopia")

            document.documentElement.classList.remove("Acromatomalia")
            document.documentElement.classList.remove("Tritanomalia")
            document.documentElement.classList.remove("Deuteranomalia")
            document.documentElement.classList.remove("Protanomalia")

            document.documentElement.classList.remove("Dark")

            localStorage.setItem('temaApp', mode);
        }
        else if (mode === "darkMode") {
            document.documentElement.classList.toggle("Dark")
            document.documentElement.classList.remove("Acromatopsia")
            document.documentElement.classList.remove("Protanopia")
            document.documentElement.classList.remove("Deuteranopia")
            document.documentElement.classList.remove("Tritanopia")

            document.documentElement.classList.remove("Acromatomalia")
            document.documentElement.classList.remove("Tritanomalia")
            document.documentElement.classList.remove("Deuteranomalia")
            document.documentElement.classList.remove("Protanomalia")

            document.documentElement.classList.remove("normal");

            localStorage.setItem('temaApp', mode);
        }
        else if (mode === "achromatopsia") {
            document.documentElement.classList.toggle("Acromatopsia")
            document.documentElement.classList.remove("normal")
            document.documentElement.classList.remove("Protanopia")
            document.documentElement.classList.remove("Deuteranopia")
            document.documentElement.classList.remove("Tritanopia")

            document.documentElement.classList.remove("Acromatomalia")
            document.documentElement.classList.remove("Tritanomalia")
            document.documentElement.classList.remove("Deuteranomalia")
            document.documentElement.classList.remove("Protanomalia")

            document.documentElement.classList.remove("Dark");

            localStorage.setItem('temaApp', mode);
        }
        else if (mode === "protanopia") {
            document.documentElement.classList.toggle("Protanopia")
            document.documentElement.classList.remove("Acromatopsia")
            document.documentElement.classList.remove("normal")
            document.documentElement.classList.remove("Deuteranopia")
            document.documentElement.classList.remove("Tritanopia")

            document.documentElement.classList.remove("Acromatomalia")
            document.documentElement.classList.remove("Tritanomalia")
            document.documentElement.classList.remove("Deuteranomalia")
            document.documentElement.classList.remove("Protanomalia")

            document.documentElement.classList.remove("Dark");

            localStorage.setItem('temaApp', mode);
        }
        else if (mode === "deuteranopia") {
            document.documentElement.classList.toggle("Deuteranopia")
            document.documentElement.classList.remove("Acromatopsia")
            document.documentElement.classList.remove("Protanopia")
            document.documentElement.classList.remove("normal")
            document.documentElement.classList.remove("Tritanopia")

            document.documentElement.classList.remove("Acromatomalia")
            document.documentElement.classList.remove("Tritanomalia")
            document.documentElement.classList.remove("Deuteranomalia")
            document.documentElement.classList.remove("Protanomalia")

            document.documentElement.classList.remove("Dark");

            localStorage.setItem('temaApp', mode);
        }
        else if (mode === "tritanopia") {
            document.documentElement.classList.toggle("Tritanopia")
            document.documentElement.classList.remove("Acromatopsia")
            document.documentElement.classList.remove("Protanopia")
            document.documentElement.classList.remove("Deuteranopia")
            document.documentElement.classList.remove("normal")

            document.documentElement.classList.remove("Acromatomalia")
            document.documentElement.classList.remove("Tritanomalia")
            document.documentElement.classList.remove("Deuteranomalia")
            document.documentElement.classList.remove("Protanomalia")

            document.documentElement.classList.remove("Dark");

            localStorage.setItem('temaApp', mode);
        }
        else if (mode === "achromatomaly") {
            document.documentElement.classList.toggle("Acromatomalia")
            document.documentElement.classList.remove("Acromatopsia")
            document.documentElement.classList.remove("Protanopia")
            document.documentElement.classList.remove("Deuteranopia")
            document.documentElement.classList.remove("Tritanopia")

            document.documentElement.classList.remove("normal")
            document.documentElement.classList.remove("Tritanomalia")
            document.documentElement.classList.remove("Deuteranomalia")
            document.documentElement.classList.remove("Protanomalia")

            document.documentElement.classList.remove("Dark");

            localStorage.setItem('temaApp', mode);
        }
        else if (mode === "tritanomaly") {
            document.documentElement.classList.toggle("Tritanomalia")
            document.documentElement.classList.remove("Acromatopsia")
            document.documentElement.classList.remove("Protanopia")
            document.documentElement.classList.remove("Deuteranopia")
            document.documentElement.classList.remove("Tritanopia")

            document.documentElement.classList.remove("Acromatomalia")
            document.documentElement.classList.remove("normal")
            document.documentElement.classList.remove("Deuteranomalia")
            document.documentElement.classList.remove("Protanomalia")

            document.documentElement.classList.remove("Dark");

            localStorage.setItem('temaApp', mode);
        }
        else if (mode === "protanomaly") {
            document.documentElement.classList.toggle("Protanomalia")
            document.documentElement.classList.remove("Acromatopsia")
            document.documentElement.classList.remove("Protanopia")
            document.documentElement.classList.remove("Deuteranopia")
            document.documentElement.classList.remove("Tritanopia")

            document.documentElement.classList.remove("Acromatomalia")
            document.documentElement.classList.remove("Tritanomalia")
            document.documentElement.classList.remove("Deuteranomalia")
            document.documentElement.classList.remove("normal")

            document.documentElement.classList.remove("Dark");

            localStorage.setItem('temaApp', mode);
        }
        else if (mode === "deuteranomaly") {
            document.documentElement.classList.toggle("Deuteranomalia")
            document.documentElement.classList.remove("Acromatopsia")
            document.documentElement.classList.remove("Protanopia")
            document.documentElement.classList.remove("Deuteranopia")
            document.documentElement.classList.remove("Tritanopia")

            document.documentElement.classList.remove("Acromatomalia")
            document.documentElement.classList.remove("Tritanomalia")
            document.documentElement.classList.remove("normal")
            document.documentElement.classList.remove("Protanomalia")

            document.documentElement.classList.remove("Dark");

            localStorage.setItem('temaApp', mode);
        }
        else {
            document.documentElement.classList.toggle("normal")
            document.documentElement.classList.remove("Acromatopsia")
            document.documentElement.classList.remove("Protanopia")
            document.documentElement.classList.remove("Deuteranopia")
            document.documentElement.classList.remove("Tritanopia")

            document.documentElement.classList.remove("Acromatomalia")
            document.documentElement.classList.remove("Tritanomalia")
            document.documentElement.classList.remove("Deuteranomalia")
            document.documentElement.classList.remove("Protanomalia")

            document.documentElement.classList.remove("Dark");

            localStorage.setItem('temaApp', "normal");
        }
    }

    useEffect(() => select(0), [])

    return (
        <div>
            <Navbar />
            <div className='configPage'>
                <h1 className='container h1' alt="configurações">Configurações</h1>
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
                                <button className='button' onClick={() => setModalConfig(true)}>Atualizar Dados</button>
                                <Modal
                                    isOpen={modalConfig}
                                    onRequestClose={closeModalConfig}
                                    style={configCustomStyles}
                                    class="ReactModal"
                                    closeTimeoutMS={2000}
                                >
                                    <div className='modalConfig areaStep'>
                                        <div className='profileImageArea'>
                                            <div className='maskProfile'><img src={Profile} alt="Imagem de Perfil" className='profileImage editProfileImage' /></div>
                                            <AiIcons.AiOutlineClose className='closeModal iconConfig2' onClick={() => closeModalConfig()} />
                                        </div>
                                        <div className='inputsModalArea'>
                                            <div className='inputsModal'>
                                                <label className='h5' htmlFor='emailModals'>Nome</label>
                                                <input id='emailModals' className='input placeholder-text' type="text" name="name" placeholder='Insira seu Nome...' />
                                                <label className='h5' htmlFor='cpf'>CPF</label>
                                                <input id='cpf' className='input placeholder-text' type="text" name="name" placeholder='Insira seu CPF...' />
                                                <label className='h5' htmlFor='dataNascimento'>Data de Nascimento</label>
                                                <input id='dataNascimento' className='input placeholder-text' type="text" name="name" placeholder='Insira sua Data de Nascimento...' />
                                            </div>
                                            <div className='inputsModal'>
                                                <label className='h5' htmlFor='email'>Email</label>
                                                <input id='email' className='input placeholder-text' type="text" name="name" placeholder='Insira seu Email...' />
                                                <label className='h5' htmlFor='rg'>RG</label>
                                                <input id='rg' className='input placeholder-text' type="text" name="name" placeholder='Insira seu RG...' />
                                                <label className='h5' htmlFor='telefone'>Telefone</label>
                                                <input id='telefone' className='input placeholder-text' type="text" name="name" placeholder='Insira seu Telefone...' />
                                            </div>
                                        </div>
                                        <button className='button'>Salvar Alterações</button>
                                    </div>
                                </Modal>
                            </div>
                        )
                    }
                    {
                        steps[currentStep].id === 'Step2' && (
                            <div>
                                <h2 alt="Acessibilidade">Selecionar tema</h2>
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



                                        {
                                            localStorage.getItem('temaApp') === "achromatomaly" ?
                                                <option value="achromatomaly" selected>Acromatomalia</option> : <option value="achromatomaly">Acromatomalia</option>
                                        }
                                        {
                                            localStorage.getItem('temaApp') === "tritanomaly" ?
                                                <option value="tritanomaly" selected>Tritanomalia</option> : <option value="tritanomaly">Tritanomalia</option>
                                        }
                                        {
                                            localStorage.getItem('temaApp') === "protanomaly" ?
                                                <option value="protanomaly" selected>Protanomalia</option> : <option value="protanomaly">Protanomalia</option>
                                        }
                                        {
                                            localStorage.getItem('temaApp') === "deuteranomaly" ?
                                                <option value="deuteranomaly" selected>Deuteranomalia</option> : <option value="deuteranomaly">Deuteranomalia</option>
                                        }
                                        {
                                            localStorage.getItem('temaApp') === "darkMode" ?
                                                <option value="darkMode" selected>Tema escuro</option> : <option value="darkMode">Tema escuro</option>
                                        }
                                    </optgroup>
                                </select>
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