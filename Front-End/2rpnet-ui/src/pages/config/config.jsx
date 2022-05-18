import { Component } from 'react';
import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Navbar from '../../components/menu/Navbar'
import { parseJwt, usuarioAutenticado } from '../../services/auth';

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

//components:
import Header from '../../components/header/header'

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
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [userLogado, setUserLogado] = useState({});
    const [invalidUsers, setInvalidUsers] = useState([]);
    const [invalidCorporations, setInvalidCorporations] = useState([]);
    const [userAlterado, setUserAlterado] = useState({})


    function listUser() {
        document.querySelector('.myData').classList.toggle('selected')

        axios('https://grupo7.azurewebsites.net/api/UserNames/GetMe', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
            }
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    setUserLogado(resposta.data)
                    console.log(resposta.data)
                }
            })
            .catch((erro) => console.log(erro))
    }

    useEffect(listUser, []);

    const autorizeUser = (idUser) => {
        if (parseJwt().Role == '2') {
            axios.patch("http://grupo7.azurewebsites.net/api/UserNames/Validate/" + idUser, {}, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
                }
            })
                .then((resposta) => {
                    if (resposta.status === 204) {
                        console.log("Funcionou")
                        listInvalidUsers()
                    }
                })
                .catch((erro) => console.log(erro))
        }
    }

    const deleteUser = (idUser) => {
        axios.delete("http://grupo7.azurewebsites.net/api/Usernames/" + idUser, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
            }
        })
            .then((resposta) => {
                if (resposta.status === 204) {
                    console.log("empresa deletada")
                    listInvalidUsers()
                }
            })
            .catch((erro) => console.log(erro))
    }

    const autorizeCorporation = (idUser) => {
        axios.patch("http://grupo7.azurewebsites.net/api/UserNames/Validate/" + idUser, {}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
            }
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    console.log("Corporação e usuário dela autorizados")
                    listInvalidCorporation()
                }
            })
            .catch((erro) => console.log(erro))
    }

    const deleteCorporation = (idCorporation) => {
        axios.delete("http://grupo7.azurewebsites.net/api/Corporations/" + idCorporation, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
            }
        })
            .then((resposta) => {
                if (resposta.status === 204) {
                    console.log("empresa deletada")
                    listInvalidCorporation()
                }
            })
            .catch((erro) => console.log(erro))
    }

    const alterUserData = (event) => {
        event.preventDefault()
        var formData = new FormData()
        formData.append('userName1', userAlterado.userName1)
        formData.append('cpf', userAlterado.cpf)
        formData.append('BirthDate', userAlterado.birthDate)
        formData.append('Email', userAlterado.email)
        formData.append('Phone', userAlterado.phone)
        formData.append('Rg', userAlterado.rg)
        formData.append('IdCorporation', userLogado.employees[0].idCorporation)
        formData.append('IdUserType', userLogado.idUserType)
        formData.append('Passwd', userLogado.passwd)
        formData.append('IdOffice', userLogado.employees[0].idOffice)
        formData.append('File', userLogado.photoUser)
        axios({
            method: "PUT",
            url: "http://grupo7.azurewebsites.net/api/UserNames",
            data: formData,
            headers: { "Content-type": "multipart/form-data", 'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao') },
        })
            .then((resposta) => {
                if (resposta.status === 204) {
                    closeModalConfig();
                    console.log("alterado com sucesso")
                }
            })
            .catch((erro) => console.log(erro))
    }

    function listInvalidUsers() {
        if (parseJwt().Role == 2) {
            axios('http://grupo7.azurewebsites.net/api/Corporations/UsuariosInvalidos', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
                }
            })
                .then((resposta) => {
                    if (resposta.status === 200) {
                        setInvalidUsers(resposta.data)
                        console.log(resposta.data)
                    }
                })
                .catch((erro) => console.log(erro))
        }
    }

    useEffect(listInvalidUsers, [])

    function listInvalidCorporation() {
        if (parseJwt().Role == 1) {
            axios('http://grupo7.azurewebsites.net/api/Corporations/EmpresasInvalidas', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
                }
            })
                .then((resposta) => {
                    if (resposta.status === 200) {
                        setInvalidCorporations(resposta.data)
                        console.log(resposta.data)
                    }
                })
                .catch((erro) => console.log(erro))
        }
    }
    useEffect(listInvalidCorporation, [])

    function openModalConfig() {
        setModalConfig(true);
        setUserAlterado(userLogado)
        console.log(userAlterado)
    }

    function closeModalConfig() {
        setModalConfig(false);
        setUserAlterado(userLogado)
        document.querySelector('.myData').classList.toggle('selected')
        listUser();
    }

    // function openModalPassword() {
    //     setModalPassword(true)
    // }

    // function closeModalPassword() {
    //     setModalPassword(false);
    // }

    function select(nextStep) {
        if (currentStep != nextStep) {
            setCurrentStep(nextStep)
            switch (nextStep) {
                case 0:
                    document.querySelector('.myData').classList.toggle('selected')
                    document.querySelector('.Acessibilidade').classList.remove('selected')
                    if (parseJwt().Role == 2) {
                        document.querySelector('.validarUsuarios').classList.remove('selected')
                    }
                    if (parseJwt().Role == 1) {
                        document.querySelector('.validarEmpresas').classList.remove('selected')
                    }
                    break;
                case 1:
                    document.querySelector('.myData').classList.remove('selected')
                    document.querySelector('.Acessibilidade').classList.toggle('selected')
                    if (parseJwt().Role == 2) {
                        document.querySelector('.validarUsuarios').classList.remove('selected')
                    }
                    if (parseJwt().Role == 1) {
                        document.querySelector('.validarEmpresas').classList.remove('selected')
                    }
                    break;
                case 2:
                    document.querySelector('.myData').classList.remove('selected')
                    document.querySelector('.Acessibilidade').classList.remove('selected')
                    if (parseJwt().Role == 2) {
                        document.querySelector('.validarUsuarios').classList.toggle('selected')
                    }
                    if (parseJwt().Role == 1) {
                        document.querySelector('.validarEmpresas').classList.remove('selected')
                    }
                    break;
                case 3:
                    listInvalidCorporation();
                    document.querySelector('.myData').classList.remove('selected')
                    document.querySelector('.Acessibilidade').classList.remove('selected')
                    if (parseJwt().Role == 2) {
                        document.querySelector('.validarUsuarios').classList.remove('selected')
                    }
                    if (parseJwt().Role == 1) {
                        document.querySelector('.validarEmpresas').classList.toggle('selected')
                    }
                    break;
                default:
                    break;
            }
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

    return (
        <div>
            {parseJwt().Role == 3 ? <Header /> : null}
            <Navbar />
            <div className='configPage'>
                <h1 className='container h1' alt="configurações">Configurações</h1>
                <nav className='navAreaConfig container'>
                    <span className='h3 myData' id='myData' onClick={() => select(0)}>Meus Dados</span>
                    <span className='h3 Acessibilidade' id='Acessibilidade' onClick={() => select(1)}>Acessibilidade</span>
                    {parseJwt().Role == 2 ? <span className='h3 validarUsuarios' id='validarUsuarios' onClick={() => select(2)}>Validar usuários</span> : null}
                    {parseJwt().Role == 1 ? <span className='h3 validarEmpresas' id='validarEmpresas' onClick={() => select(3)}>Validar Empresas</span> : null}
                </nav>
                <section className='configContent validUser container'>
                    {
                        steps[currentStep].id === 'Step1' && (
                            <div className='areaStep'>
                                <div className='contentAreaConfig'>
                                    <div className='mainContentArea'>
                                        <div className='contentConfig'>
                                            <div className='dataUser'>
                                                <label className='h5' htmlFor="emailUser">Email:</label>
                                                <p id='emailUser'>{userLogado.email}</p>
                                            </div>
                                            <div className='dataUser'>
                                                <label className='h5' htmlFor="nameUser">Nome:</label>
                                                <p id='nameUser'>{userLogado.userName1}</p>
                                            </div>
                                            <div className='dataUser'>
                                                <label className='h5' htmlFor="birthDateUser">Nascimento:</label>
                                                <p id='birthDateUser'>{userLogado.birthDate}</p>
                                            </div>
                                        </div>
                                        <div className='contentConfig'>
                                            <div className='dataUser'>
                                                <label className='h5' htmlFor="cpfUser">CPF:</label>
                                                <p id='cpfUser' >{userLogado.cpf}</p>
                                            </div>
                                            <div className='dataUser'>
                                                <label className='h5' htmlFor="rgUser">RG:</label>
                                                <p id='rgUser'>{userLogado.rg}</p>
                                            </div>
                                            <div className='dataUser'>
                                                <label className='h5' htmlFor="phoneUser">Telefone:</label>
                                                <p id='phoneUser'>{userLogado.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <img src={"http://grupo7.azurewebsites.net/img/" + userLogado.photoUser} className='profileImage' alt="Imagem de perfil" />
                                </div>
                                <button className='button' onClick={openModalConfig}>Atualizar Dados</button>
                                <Modal
                                    isOpen={modalConfig}
                                    onRequestClose={closeModalConfig}
                                    style={configCustomStyles}
                                    class="ReactModal"
                                    closeTimeoutMS={1000}
                                >
                                    <form encType='multipart/form-data' className='modalConfig areaStep'>
                                        <div className='profileImageArea'>
                                            <div className='maskProfile'><img src={"http://grupo7.azurewebsites.net/img/" + userLogado.photoUser} alt="Imagem de Perfil"
                                                className='profileImage editProfileImage'
                                            /></div>
                                            <AiIcons.AiOutlineClose className='closeModal iconConfig2' onClick={() => closeModalConfig()} />
                                        </div>
                                        <div className='inputsModalArea'>
                                            <div className='inputsModal'>
                                                <label className='h5' htmlFor='emailModals'>Nome</label>
                                                <input id='emailModals' className='input placeholder-text' type="text" name="name" placeholder='Insira seu Nome...' value={userAlterado.userName1} onChange={(event) => setUserAlterado({ userName1: event.target.value, cpf: userAlterado.cpf, birthDate: userAlterado.birthDate, email: userAlterado.email, rg: userAlterado.rg, phone: userAlterado.phone })} />
                                                <label className='h5' htmlFor='cpf'>CPF</label>
                                                <input id='cpf' className='input placeholder-text' type="text" name="name" placeholder='Insira seu CPF...' value={userAlterado.cpf} onChange={(event) => setUserAlterado({ userName1: userAlterado.userName1, cpf: event.target.value, birthDate: userAlterado.birthDate, email: userAlterado.email, rg: userAlterado.rg, phone: userAlterado.phone })} />
                                                <label className='h5' htmlFor='dataNascimento'>Data de Nascimento</label>
                                                <input id='dataNascimento' className='input placeholder-text' name="name" placeholder='Insira sua Data de Nascimento...' value={userAlterado.birthDate} onChange={(event) => setUserAlterado({ userName1: userAlterado.userName1, cpf: userAlterado.cpf, birthDate: event.target.value, email: userAlterado.email, rg: userAlterado.rg, phone: userAlterado.phone })} />
                                            </div>
                                            <div className='inputsModal'>
                                                <label className='h5' htmlFor='email'>Email</label>
                                                <input id='email' className='input placeholder-text' type="text" name="name" placeholder='Insira seu Email...' value={userAlterado.email} onChange={(event) => setUserAlterado({ userName1: userAlterado.userName1, cpf: userAlterado.cpf, birthDate: userAlterado.birthDate, email: event.target.value, rg: userAlterado.rg, phone: userAlterado.phone })} />
                                                <label className='h5' htmlFor='rg'>RG</label>
                                                <input id='rg' className='input placeholder-text' type="text" name="name" placeholder='Insira seu RG...' value={userAlterado.rg} onChange={(event) => setUserAlterado({ userName1: userAlterado.userName1, cpf: userAlterado.cpf, birthDate: userAlterado.birthDate, email: userAlterado.email, rg: event.target.value, phone: userAlterado.phone })} />
                                                <label className='h5' htmlFor='telefone'>Telefone</label>
                                                <input id='telefone' className='input placeholder-text' type="text" name="name" placeholder='Insira seu Telefone...' value={userAlterado.phone} onChange={(event) => setUserAlterado({ userName1: userAlterado.userName1, cpf: userAlterado.cpf, birthDate: userAlterado.birthDate, email: userAlterado.email, rg: userAlterado.rg, phone: event.target.value })} />
                                            </div>
                                        </div>
                                        <button className='button' onClick={setConfirmPassword(true)}>Salvar Alterações</button>
                                    </form>
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
                                {
                                    invalidUsers.map((user) => {
                                        return (
                                            <div key={user.idUser} className='mainContentArea contentValidUser'>
                                                <div className='contentConfig'>
                                                    <h3>Email <p className='p'>{user.idUserNavigation.email}</p></h3>
                                                    <h3>CPF <p className='p'>{user.idUserNavigation.cpf}</p></h3>
                                                    <h3>Nome <p className='p'>{user.idUserNavigation.userName1}</p></h3>
                                                    <h3>RG <p className='p'>{user.idUserNavigation.rg}</p></h3>
                                                    <h3>Telefone <p className='p'>{user.idUserNavigation.phone}</p></h3>
                                                    <h3>Data de Nascimento <p className='p'>{user.idUserNavigation.birthDate}</p></h3>
                                                </div>
                                                <div>
                                                    <SiIcons.SiVerizon onClick={() => autorizeUser(user.idUser)} className='iconConfig' />
                                                    <AiIcons.AiOutlineClose onClick={() => deleteUser(user.idUser)} className='iconConfig2' />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                    {
                        steps[currentStep].id === "Step4" && (
                            <div className='scrollDiv'>
                                {
                                    invalidCorporations.map((corp) => {
                                        return (
                                            <div key={corp.idCorporation} className='mainContentArea contentValidCompany'>
                                                <div className='contentConfig'>
                                                    <h3>CNPJ <p>{corp.cnpj}</p></h3>
                                                    <h3>Razão Social <p>{corp.corporateName}</p></h3>
                                                    <h3>Nome Fantasia <p>{corp.nameFantasy}</p></h3>
                                                </div>
                                                <div>
                                                    <SiIcons.SiVerizon onClick={() => autorizeCorporation([corp.employees[0].idUser])} className='iconConfig' />
                                                    <AiIcons.AiOutlineClose onClick={() => deleteCorporation([corp.idCorporation])} className='iconConfig2' />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </section>
            </div>
        </div>
    );
}