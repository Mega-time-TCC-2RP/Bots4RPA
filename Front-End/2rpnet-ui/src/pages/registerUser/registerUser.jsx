import { Component } from 'react';
import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import VLibras from '@djpfs/react-vlibras'


//img:
import Logo from '../../assets/img/logo2RPcadastro.png'
import RoboAzul from '../../assets/img/roboAzul.png'
import RoboVermeho from '../../assets/img/roboVermelho.png'

//Components:

//css:
import '../../assets/css/pages/registerCompany.css'
import '../../assets/css/components/button.css'
import '../../assets/css/components/fonts.css'

//icons:
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io5'
import * as GrIcons from 'react-icons/gr'

const steps = [
    {
        id: 'Step1'
    },
    {
        id: 'Step2'
    }
];

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

    return <InputMask id='placeholder-text' placeholder='Insira seu telefone...' mask="999.999.999-99" value={value} required
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

    return <InputMask id='placeholder-text' placeholder='Insira seu telefone...' mask="(99)99999-9999" value={value}
        onChange={handleChange}
    />
}

const validateRG = (v) => {
    if (v.length < 11) {
        v = v.replace(/[^0-9]/g, "");
    } else {
        v = v.replace(/[^x-xX-X0-9]/g, "");
    }

    v = v.replace(/(.{2})(\d)/, "$1.$2");
    v = v.replace(/(.{6})(\d)/, "$1.$2");
    v = v.replace(/(.{10})(\w)/g, "$1-$2");
    v = v.replace(/(.{12})(\w)/g, "$1");

    return v;
};

export default function RegisterUser() {
    const [currentStep, setCurrentStep] = useState(0);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [birthDate, setBirthDate] = useState();
    const [imageProfile, setImageProfile] = useState();
    const [name, setName] = useState();
    const [rg, setRg] = useState();
    const [cpf, setCpf] = useState();
    const [telephone, setTelephone] = useState();
    const [idUserType, setIdUserType] = useState(3);
    const [idCorporation, setIdCorporation] = useState(1);
    const [idOffice, setIdOficce] = useState(1);
    const [companyList, setCompanyList] = useState([]);
    const [officeList, setOfficeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [imageLoad, setImageLoad] = useState(false);

    let history = useNavigate();

    var inputImage = document.getElementById('imageProfile');

    function handleNext() {
        setCurrentStep((prevState) => prevState + 1);
    }

    function handleBack() {
        setCurrentStep((prevState) => prevState - 1);
    }

    function showPassword() {
        var password = document.getElementById("password");
        if (password.type == "password") {
            password.type = "text";
            setShow(true);
        } else {
            password.type = "password"
            setShow(false);
        }
    }

    function inputImageVerify() {
        setImageLoad(true);
    }

    function listCompany() {
        axios("http://grupo7.azurewebsites.net/api/Corporations")
            .then(resposta => {
                if (resposta.status === 200) {
                    setCompanyList(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    useEffect(listCompany, [])

    function listOffice() {
        axios("http://grupo7.azurewebsites.net/api/Offices")
            .then(resposta => {
                if (resposta.status === 200) {
                    setOfficeList(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    useEffect(listOffice, [])

    const RegisterUser = (event) => {
        event.preventDefault();
        var formData = new FormData();
        const element = document.getElementById('imageProfile')
        console.log(element)
        const file = element.files[0]
        console.log(file)

        if (element.files[0] == undefined) {
            console.log("tá undefined")
            formData.append('File', file)
        } else {
            formData.append('File', file, file.name)
        }
        formData.append('UserName1', name)
        formData.append('Email', email)
        formData.append('Passwd', password)
        formData.append('BirthDate', birthDate)
        formData.append('Rg', rg)
        formData.append('Cpf', cpf)
        formData.append('Phone', telephone)
        formData.append('IdUserType', idUserType)
        formData.append('IdCorporation', idCorporation)
        formData.append('IdOffice', idOffice)

        console.log(formData)

        axios({
            method: "POST",
            url: "http://grupo7.azurewebsites.net/api/UserNames",
            data: formData,
            headers: { "Content-type": "multipart/form-data" },
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log('cadastrado com sucesso')
                    history('/login')
                }
            })
            .catch((erro) => {
                console.log(erro)
            })
    }

    return (
        <div>
            <VLibras />
            <div className='backgroudRegister'>
                <div className='robotBlue'>
                    <img src={RoboAzul} alt="Robo Azul" />
                </div>
                <div className='registerArea'>
                    <div className='registerContent'>
                        <img className='logoRegister' src={Logo} alt="Logo 2RPnet" />
                        <form className='formRegister' encType='multipart/form-data'>
                            {
                                steps[currentStep].id === "Step1" && (
                                    <div className='contentRender'>
                                        <div className='inputsArea'>
                                            <div className='foreachInput'>
                                                <label className='h5'>Email</label>
                                                <input id='placeholder-text' type="email" name="email" placeholder='Insira o seu email...' value={email} onChange={(event) => setEmail(event.target.value)} autoFocus required />
                                            </div>
                                            <div className='foreachInput'>
                                                <label className='h5'>Senha</label>
                                                <div className='passwordArea'>
                                                    <input id='password' type="password" name="password" className='placeholder-text' placeholder='Insira sua senha...' value={password} onChange={(event) => setPassword(event.target.value)} />
                                                    {
                                                        show === false && (
                                                            <AiIcons.AiFillEyeInvisible className='eyePass' onClick={showPassword} />
                                                        )
                                                    }
                                                    {
                                                        show === true && (
                                                            <AiIcons.AiFillEye className='eyePass' onClick={showPassword} />
                                                        )
                                                    }

                                                </div>
                                            </div>
                                            <div className='foreachInput'>
                                                <label className='h5'>Data de Nascimento</label>
                                                <input id='placeholder-text birthDate' type="date" name="birthDate" placeholder='Insira sua Data de nascimento...' value={birthDate} onChange={(event) => setBirthDate(event.target.value)} />
                                            </div>
                                            <div className='foreachInput'>
                                                <label className='h5'>Nome</label>
                                                <input id='placeholder-text' type="text" name="name" placeholder='Insira seu Nome...' value={name} onChange={(event) => setName(event.target.value)} required />
                                            </div>
                                            <div className='foreachInput'>
                                                <label className='h5'>Tipo de Usuário</label>
                                                <select onChange={(event) => setIdUserType(event.target.value)}>
                                                    <option value={3}>Usuario normal</option>
                                                    <option value={2}>Administrador de Empresa</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button className='button' type="submit" onClick={handleNext}>Avançar</button>
                                    </div>
                                )
                            }
                            {
                                steps[currentStep].id === "Step2" && (
                                    <div className='contentRender'>
                                        <IoIcons.IoArrowBackCircle id='buttonBackStep' onClick={handleBack} />
                                        <div className='inputsArea'>
                                            <div className='foreachInput' id='areaPhoto'>
                                                <label className='h5' >Imagem de Perfil</label>
                                                <label className='sendPhoto h6' for='imageProfile'>Enviar foto</label>
                                                <input id='imageProfile' className='imageProfileInput' type="file" accept="image/png, image/jpeg" name="imageProfile" placeholder='Insira sua foto de Perfil...' onChange={inputImageVerify}
                                                />
                                                {
                                                    imageLoad == true && (
                                                        <div>
                                                            <p>Imagem Carregada</p>
                                                            <img className='previewImage' src={inputImage.files[0]} />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className='foreachInput'>
                                                <label className='h5'>RG</label>
                                                <input id='placeholder-text' name="RG" placeholder='Insira o seu RG...' value={rg} onChange={(event) => setRg(validateRG(event.target.value))} autoFocus required />
                                            </div>
                                            <div className='foreachInput'>
                                                <label className='h5'>CPF</label>
                                                <MaskedInputCPF value={cpf} onChange={(event) => setCpf(event.target.value)} />
                                            </div>
                                            <div className='foreachInput'>
                                                <label className='h5'>Telefone</label>
                                                <MaskedInputTelephone value={telephone} onChange={(event) => setTelephone(event.target.value)} />
                                            </div>
                                            <div className='foreachInput'>
                                                <label className='h5'>Empresa relacionada</label>
                                                <select onChange={(event) => setIdCorporation(event.target.value)}>
                                                    {
                                                        companyList.map((company) => {
                                                            return(
                                                                <option value={company.idCorporation}>{company.nameFantasy}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className='foreachInput'>
                                                <label className='h5'>Cargo</label>
                                                <select onChange={(event) => setIdOficce(event.target.value)}>
                                                    {
                                                        officeList.map((office) => {
                                                            return(
                                                                <option value={office.idOffice}>{office.titleOffice}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <button className='button' onClick={RegisterUser}>Finalizar Cadastro</button>
                                    </div>
                                )
                            }

                        </form>
                    </div>
                </div>
                <div className='robotRed'>
                    <img src={RoboVermeho} alt="Robo Vermelho" />
                </div>
            </div>
        </div>
    );
}