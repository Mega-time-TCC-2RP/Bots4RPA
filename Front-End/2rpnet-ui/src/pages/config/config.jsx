import { Component } from 'react';
import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Modal from 'react-modal';
import Navbar from '../../components/menu/Navbar'
import { parseJwt, usuarioAutenticado } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// module.exports = {
//     async headers() {
//         return [
//             {
//                 source : '/:path*',
//                 headers: [
//                     {key: 'Access-Control-Allow-Credentials', value: 'true'},
//                     {key: 'Access-Control-Allow-Origin', value: '*'},
//                     {key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'},
//                     {key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'}
//                 ]
//             }
//         ]
//     }
// }

const errorToast = () => {
    toast.error('Ops! Ocorreu um erro', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

const onlyNumbers = (string) => string.replace(/[^0-9]/g, '')

const MaskedInputCPF = ({ value, onChange }) => {
    function handleChange(event) {
        onChange({
            ...event,
            target: {
                ...event.target, value: onlyNumbers(event.target.value)
            }
        })
    }

    return <InputMask id='cpf' className='input placeholder-text' type="text" name="name" placeholder='Insira seu CPF...' mask="999.999.999-99" value={value} required
        onChange={handleChange}
    />
}

const MaskedInputTelephone = ({ value, onChange }) => {
    function handleChange(event) {
        onChange({
            ...event,
            target: {
                ...event.target, value: onlyNumbers(event.target.value)
            }
        })
    }

    return <InputMask id='telefone' className='input placeholder-text' type="text" name="name" placeholder='Insira seu Telefone...' mask="(99)99999-9999" value={value}
        onChange={handleChange}
    />
}

const validateRG = (v) => {
    if (v?.length < 11) {
        v = v?.replace(/[^0-9]/g, "");
    } else {
        v = v?.replace(/[^x-xX-X0-9]/g, "");
    }

    v = v?.replace(/(.{2})(\d)/, "$1.$2");
    v = v?.replace(/(.{6})(\d)/, "$1.$2");
    v = v?.replace(/(.{10})(\w)/g, "$1-$2");
    v = v?.replace(/(.{12})(\w)/g, "$1");

    return v;
};

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
    const [pass, setPass] = useState('')
    const [NovaSenha, setNovaSenha] = useState('')
    const [birthDate1, setBirthDate1] = useState('')

    let history = useNavigate();

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
                    setBirthDate1(resposta.data.birthDate)
                    // const date = resposta.data.birthDate.substring(0,10)
                    // console.log(date.split('-')[1] + '/' + date.split('-')[2] + '/' + date.split('-')[0])
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
                    console.log("usuário deletado")
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
        axios.post('https://grupo7.azurewebsites.net/api/Login', {
            email: userLogado.email,
            password: pass
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    var formData = new FormData()
                    const photoProfile = document.getElementById('imageProfile')
                    const fileProfile = photoProfile.files[0]
                    if (photoProfile.files[0] == undefined) {
                        formData.append('File', userLogado.photoUser)
                    } else {
                        formData.append('File', fileProfile, fileProfile.name)
                    }
                    formData.append('userName1', userAlterado.userName1)
                    formData.append('cpf', userAlterado.cpf)
                    formData.append('BirthDate', userAlterado.birthDate)
                    formData.append('Email', userAlterado.email)
                    formData.append('Phone', userAlterado.phone)
                    formData.append('Rg', userAlterado.rg)
                    if (parseJwt().Role != 1) {
                        formData.append('IdCorporation', userLogado.employees[0].idCorporation)
                        formData.append('IdOffice', userLogado.employees[0].idOffice)
                    }
                    formData.append('IdUserType', userLogado.idUserType)
                    if (NovaSenha === '') {
                        formData.append('Passwd', pass);
                    } else {
                        formData.append('Passwd', NovaSenha);
                    }
                    //formData.append('File', "http://grupo7.azurewebsites.net/img/" + userLogado.photoUser)
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
                                setPass('')
                                setNovaSenha('')
                                setConfirmPassword(false)
                            }
                        })
                        .catch((erro) => console.log(erro))
                }
            })
            .catch(errorToast(),
                bazinga => {
                    if (bazinga.status === 401) {
                        closeModalConfig();
                        errorToast();
                    }
                }

            )
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
        setConfirmPassword(false);
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
        // else if (mode === "darkMode") {
        //     document.documentElement.classList.toggle("Dark")
        //     document.documentElement.classList.remove("Acromatopsia")
        //     document.documentElement.classList.remove("Protanopia")
        //     document.documentElement.classList.remove("Deuteranopia")
        //     document.documentElement.classList.remove("Tritanopia")

        //     document.documentElement.classList.remove("Acromatomalia")
        //     document.documentElement.classList.remove("Tritanomalia")
        //     document.documentElement.classList.remove("Deuteranomalia")
        //     document.documentElement.classList.remove("Protanomalia")

        //     document.documentElement.classList.remove("normal");

        //     localStorage.setItem('temaApp', mode);
        // }
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

    function previewImagem() {
        var imagem = document.getElementById('imageProfile').files[0]
        var preview = document.getElementById('imgPreview')
        var reader = new FileReader();
        reader.onloadend = function () {
            preview.src = reader.result
        }
        if (imagem) {
            reader.readAsDataURL(imagem)
        } else {
            preview.src = ""
        }
    }

    return (
        <div>
            <Navbar />
            <div className='configPage body-pd'>
                <h1 className='container h3' id='configTitlle' alt="configurações">Configurações</h1>
                <nav className='navAreaConfig container'>
                    <span className='h4 myData' id='myData' onClick={() => select(0)}>Meus Dados</span>
                    <span className='h4 Acessibilidade' id='Acessibilidade' onClick={() => select(1)}>Acessibilidade</span>
                    {parseJwt().Role == 2 ? <span className='h4 validarUsuarios' id='validarUsuarios' onClick={() => select(2)}>Validar usuários</span> : null}
                    {parseJwt().Role == 1 ? <span className='h4 validarEmpresas' id='validarEmpresas' onClick={() => select(3)}>Validar Empresas</span> : null}
                </nav>
                <section className='configContent validUser container'>
                    {
                        steps[currentStep].id === 'Step1' && (
                            <div className='areaStep'>
                                <div className='contentAreaConfig'>
                                    <div className='mainContentArea'>
                                        <div className='contentConfig'>
                                            <div className='dataUser'>
                                                <label className='h6 semi-bold' htmlFor="emailUser">Email:</label>
                                                <p id='emailUser' className="p">{userLogado.email}</p>
                                            </div>
                                            <div className='dataUser'>
                                                <label className='h6 semi-bold' htmlFor="nameUser">Nome:</label>
                                                <p id='nameUser' className="p">{userLogado.userName1}</p>
                                            </div>
                                            <div className='dataUser'>
                                                <label className='h6 semi-bold' htmlFor="birthDateUser">Nascimento:</label>
                                                <p id='birthDateUser' className="p">{birthDate1.substring(0, 10).split('-')[1] + '/' + birthDate1.substring(0, 10).split('-')[2] + '/' + birthDate1.substring(0, 10).split('-')[0]}</p>
                                            </div>
                                        </div>
                                        <div className='contentConfig'>
                                            <div className='dataUser'>
                                                <label className='h6 semi-bold' htmlFor="cpfUser">CPF:</label>
                                                <p id='cpfUser' className="p">{userLogado.cpf}</p>
                                            </div>
                                            <div className='dataUser'>
                                                <label className='h6 semi-bold' htmlFor="rgUser">RG:</label>
                                                <p id='rgUser' className="p">{userLogado.rg}</p>
                                            </div>
                                            <div className='dataUser'>
                                                <label className='h6 semi-bold' htmlFor="phoneUser">Telefone:</label>
                                                <p id='phoneUser' className="p">{userLogado.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <img src={"http://grupo7.azurewebsites.net/img/" + userLogado.photoUser} className='profileImage' alt="Imagem de perfil" />
                                </div>
                                <button className='button' id='buttonAtualize' onClick={openModalConfig}>Atualizar Dados</button>
                                <Modal
                                    isOpen={modalConfig}
                                    onRequestClose={closeModalConfig}
                                    style={configCustomStyles}
                                    class="ReactModal"
                                    closeTimeoutMS={1000}
                                    id="modalAtualize"
                                >
                                    <form encType='multipart/form-data' className='modalConfig areaStep'>
                                        <div className='profileImageArea'>
                                            <div className='maskProfile'><img src={"http://grupo7.azurewebsites.net/img/" + userLogado.photoUser} id='imgPreview' alt="Imagem de Perfil"
                                                className='profileImage editProfileImage'
                                            />
                                            </div>
                                            <AiIcons.AiOutlineClose className='closeModal iconConfig2' onClick={() => closeModalConfig()} />
                                        </div>
                                        <div className='foreachInputModal'>
                                            <label className='sendPhoto h6' for='imageProfile'>Editar foto</label>
                                            <input id='imageProfile' className='imageCompanyInput' type="file" accept="image/png, image/jpeg" name="imageProfile" onChange={previewImagem} />
                                        </div>
                                        <div className='inputsModalArea'>
                                            <div className='inputsModal'>
                                                <label className='h5' htmlFor='emailModals'>Nome</label>
                                                <input id='emailModals' className='input placeholder-text' type="text" name="name" placeholder='Insira seu Nome...' value={userAlterado.userName1} onChange={(event) => setUserAlterado({ userName1: event.target.value, cpf: userAlterado.cpf, birthDate: userAlterado.birthDate, email: userAlterado.email, rg: userAlterado.rg, phone: userAlterado.phone })} />
                                                <label className='h5' htmlFor='cpf'>CPF</label>
                                                <MaskedInputCPF value={userAlterado.cpf} onChange={(event) => setUserAlterado({ userName1: userAlterado.userName1, cpf: event.target.value, birthDate: userAlterado.birthDate, email: userAlterado.email, rg: userAlterado.rg, phone: userAlterado.phone })} />
                                                <label id='DataNascimento' className='h5' htmlFor='dataNascimento'>Data de Nascimento</label>
                                                <input type="date" id='dataNascimento' className='input placeholder-text' name="name" placeholder='Insira sua Data de Nascimento...' value={userLogado.birthDate} onChange={(event) => setUserAlterado({ userName1: userAlterado.userName1, cpf: userAlterado.cpf, birthDate: event.target.value, email: userAlterado.email, rg: userAlterado.rg, phone: userAlterado.phone })} />
                                            </div>
                                            <div className='inputsModal'>
                                                <label className='h5' htmlFor='email'>Email</label>
                                                <input id='email' className='input placeholder-text' type="text" name="name" placeholder='Insira seu Email...' value={userAlterado.email} onChange={(event) => setUserAlterado({ userName1: userAlterado.userName1, cpf: userAlterado.cpf, birthDate: userAlterado.birthDate, email: event.target.value, rg: userAlterado.rg, phone: userAlterado.phone })} />
                                                <label className='h5' htmlFor='rg'>RG</label>
                                                <input id='rg' className='input placeholder-text' type="text" name="name" placeholder='Insira seu RG...' value={validateRG(userAlterado.rg)} onChange={(event) => setUserAlterado({ userName1: userAlterado.userName1, cpf: userAlterado.cpf, birthDate: userAlterado.birthDate, email: userAlterado.email, rg: event.target.value, phone: userAlterado.phone })} />
                                                <label className='h5' htmlFor='telefone'>Telefone</label>
                                                <MaskedInputTelephone value={userAlterado.phone} onChange={(event) => setUserAlterado({ userName1: userAlterado.userName1, cpf: userAlterado.cpf, birthDate: userAlterado.birthDate, email: userAlterado.email, rg: userAlterado.rg, phone: event.target.value })} />
                                            </div>
                                        </div>
                                        <div className='newPassword'>
                                            <label className='h5' htmlFor='NovaSenha'>Nova senha</label>
                                            <input required id='NovaSenha' className='input' type="text" name="name" placeholder='Insira sua nova senha...' value={NovaSenha} onChange={(event) => setNovaSenha(event.target.value)} />
                                        </div>
                                        {
                                            confirmPassword === true ?
                                                <div className='confirmPassword'>
                                                    <input value={pass} onChange={(event) => setPass(event.target.value)} type="password" className='input' id='passConfirm' placeholder='Confirme sua Senha...' />
                                                    <button className='button' onClick={alterUserData}>Confirmar</button>
                                                </div>
                                                : <button className='button' onClick={() => setConfirmPassword(true)}>Salvar Alterações</button>
                                        }

                                    </form>
                                </Modal>
                            </div>
                        )
                    }
                    {
                        steps[currentStep].id === 'Step2' && (
                            <div className='center'>
                                <h2 className='h6 semi-bold' alt="Acessibilidade">Selecionar tema</h2>
                                <select className='select' onChange={(e) => MudarTema(e.target.value)}>
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
                                        {/* {
                                            localStorage.getItem('temaApp') === "darkMode" ?
                                                <option value="darkMode" selected>Tema escuro</option> : <option value="darkMode">Tema escuro</option>
                                        } */}
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
                                                    <h5 className='semi-bold'>Email <p className='p'>{user.idUserNavigation.email}</p></h5>
                                                    <h5>CPF <p className='p'>{user.idUserNavigation.cpf}</p></h5>
                                                    <h5>Nome <p className='p'>{user.idUserNavigation.userName1}</p></h5>
                                                    <h5>RG <p className='p'>{user.idUserNavigation.rg}</p></h5>
                                                    <h5>Telefone <p className='p'>{user.idUserNavigation.phone}</p></h5>
                                                    <h5>Data de Nascimento <p className='p'>{user.idUserNavigation.birthDate}</p></h5>
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