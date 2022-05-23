import { Component } from 'react';
import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import VLibras from '@djpfs/react-vlibras'
import { parseJwt, usuarioAutenticado } from '../../services/auth';


//img:
import Logo from '../../assets/img/logo2RPcadastro.png'
import RoboAzul from '../../assets/img/roboAzul.png'
import RoboVermeho from '../../assets/img/roboVermelho.png'

//Components:

//icons:
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io5'

//css:
import '../../assets/css/pages/registerCompany.css'
import '../../assets/css/components/button.css'
import '../../assets/css/components/fonts.css'


const steps = [
    {
        id: 'Step1'
    },
    {
        id: 'Step2'
    },
    {
        id: 'Step3'
    }
];

const onlyNumbers = (string) => string.replace(/[^0-9]/g, '')

const MaskedInputPhone = ({ value, onChange }) => {
    function handleChange(event) {
        onChange({
            ...event,
            target: {
                ...event.target, value: onlyNumbers(event.target.value)
            }
        })
    }

    return <InputMask id='placeholder-text' placeholder='Insira o contato da empresa...' mask="(99)99999-9999" value={value} required
        onChange={handleChange}
    />
}

const MaskedInput = ({ value, onChange }) => {
    function handleChange(event) {
        onChange({
            ...event,
            target: {
                ...event.target, value: onlyNumbers(event.target.value)
            }
        })
    }

    return <InputMask id='placeholder-text' placeholder='Insira o CNPJ...' mask="99.999.999/999-99" value={value} required
        onChange={handleChange}
    />
}

const MaskedInputCPF = ({ value, onChange }) => {
    function handleChange(event) {
        onChange({
            ...event,
            target: {
                ...event.target, value: onlyNumbers(event.target.value)
            }
        })
    }

    return <InputMask id='placeholder-text' placeholder='Insira seu CPF...' mask="999.999.999-99" value={value} required
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

export default function RegisterCompany() {

    const [currentStep, setCurrentStep] = useState(0);
    const [razaoSocial, setRazaoSocial] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [addressName, setAddressName] = useState('')
    const [phone, setPhone] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageLoad, setImageLoad] = useState(false);
    const [imageLoadProfile, setImageLoadProfile] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [imageProfile, setImageProfile] = useState();
    const [name, setName] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [telephone, setTelephone] = useState('');
    const [idUserType, setIdUserType] = useState();
    const [idCorporation, setIdCorporation] = useState();
    const [idOffice, setIdOficce] = useState(1);
    const [companyList, setCompanyList] = useState([]);
    const [officeList, setOfficeList] = useState([]);
    const [show, setShow] = useState(false);

    let history = useNavigate();

    var formData = new FormData();

    var inputImage = document.getElementById('imageProfile');

    function handleNext() {
        setCurrentStep((prevState) => prevState + 1);
    }

    function handleBack() {
        setCurrentStep((prevState) => prevState - 1);
    }

    function inputImageVerifyCompany() {
        setImageLoad(true);
    }

    function inpuptImageVerify() {
        setImageLoadProfile(true);
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

    const register = (event) => {
        event.preventDefault();
        setLoading(true);

        formData.append('NameFantasy', nomeFantasia)
        formData.append('CorporateName', razaoSocial)
        formData.append('AddressName', addressName)
        formData.append('CorpPhone', phone)
        formData.append('Cnpj', cnpj)
        formData.append('UserName1', name)
        formData.append('Email', email)
        formData.append('Passwd', password)
        formData.append('Cpf', cpf)
        formData.append('Phone', telephone)
        formData.append('BirthDate', birthDate)
        formData.append('Rg', rg)
        formData.append('IdOffice', idOffice)

        const photoProfile = document.getElementById('imageProfile')
        const fileProfile = photoProfile.files[0]

        if (photoProfile.files[0] == undefined) {
            formData.append('CorpUser', fileProfile)
        } else {
            formData.append('CorpUser', fileProfile, fileProfile.name)
        }

        const photoCompany = document.getElementById('imageCompany');
        const fileCompany = photoCompany.files[0];

        if (photoCompany.files[0] == undefined) {
            formData.append('CorpPhoto', fileCompany)
        } else {
            formData.append('CorpPhoto', fileCompany, fileCompany.name)
        }


        axios({
            method: "POST",
            url: "http://grupo7.azurewebsites.net/api/Corporations",
            data: formData,
            headers: { "Content-type": "multipart/form-data" },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    console.log("CADASTROU")
                    setLoading(false)
                }
            })
            .catch((erro) => {
                console.log(erro)
                setLoading(false)
            })
    }

    return (
        <div >
            <VLibras />
            <div className='backgroudRegister'>
                <div className='robotBlue'>
                    <img src={RoboAzul} alt="Robo Azul" />
                </div>
                <div className='registerArea'>
                    <div className='registerContent'>
                        <img className='logoRegister' src={Logo} alt="Logo 2RPnet" />
                        <form encType='multipart/form-data' className='formRegister'>
                            {
                                steps[currentStep].id === "Step1" && (
                                    <div className='contentRender'>
                                        <div className='inputsArea'>
                                            <div className='foreachInput'>
                                                <label className='h5'>Nome Fantasia</label>
                                                <input id='placeholder-text' type="text" placeholder='Insira o Nome Fantasia...' value={nomeFantasia} onChange={(event) => setNomeFantasia(event.target.value)} autoFocus required />
                                            </div>
                                            <div className='foreachInput'>
                                                <label className='h5'>Razão Social</label>
                                                <input id='placeholder-text' type="text" name="address" placeholder='Insira a Razão Social...' value={razaoSocial} onChange={(event) => setRazaoSocial(event.target.value)} required />
                                            </div>
                                            <div className='foreachInput'>
                                                <label className='h5'>Endereço</label>
                                                <input id='placeholder-text' type="text" name="address" placeholder='Insira o Endereço...' value={addressName} onChange={(event) => setAddressName(event.target.value)} required />
                                            </div>
                                            <div className='foreachInput'>
                                                <label className='h5'>Contato</label>
                                                <MaskedInputPhone value={phone} onChange={(event) => setPhone(event.target.value)} />
                                            </div>
                                            <div className='foreachInput'>
                                                <label className='h5'>CNPJ</label>
                                                <MaskedInput value={cnpj} onChange={(event) => setCnpj(event.target.value)} />
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
                                        <div className='step2'>
                                            <div className='foreachInput'>
                                                <label className='h5'>Email do administrador</label>
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
                                        </div>
                                        <button className='button' type="submit" onClick={handleNext}>Avançar</button>
                                    </div>
                                )
                            }
                            {
                                steps[currentStep].id === "Step3" && (
                                    <div className='contentRender'>
                                        <IoIcons.IoArrowBackCircle id='buttonBackStep' onClick={handleBack} />
                                        <div className='inputsArea'>
                                            <div className='foreachInput'>
                                                <label className='h5'>RG</label>
                                                <input id='placeholder-text' name="RG" placeholder='Insira o seu RG...' value={rg} onChange={(event) => setRg(validateRG(event.target.value))} autoFocus required />
                                            </div>
                                            <div className='foreachInput'>
                                                <label className='h5'>CPF</label>
                                                <MaskedInputCPF value={cpf} onChange={(event) => setCpf(event.target.value)} required/>
                                            </div>
                                            <div className='foreachInput'>
                                                <label className='h5'>Telefone</label>
                                                <MaskedInputTelephone value={telephone} onChange={(event) => setTelephone(event.target.value)} required/>
                                            </div>
                                            <div className='foreachInput areaPhoto'>
                                                <label className='h5'>Foto da Empresa</label>
                                                <label className='sendPhoto h6' for='imageCompany'>Enviar foto</label>
                                                <input id='imageCompany' className='imageCompanyInput' type="file" accept="image/png, image/jpeg" name="imageCompany" onChange={inputImageVerifyCompany} />
                                                {
                                                    imageLoad == true && (
                                                        <div>
                                                            <p className='p '>Imagem Carregada</p>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className='foreachInput' id='areaPhoto'>
                                                <label className='h5' >Imagem de Perfil</label>
                                                <label className='sendPhoto h6' for='imageProfile'>Enviar foto</label>
                                                <input id='imageProfile' className='imageProfileInput' type="file" accept="image/png, image/jpeg" name="imageProfile" placeholder='Insira sua foto de Perfil...' onChange={inpuptImageVerify}
                                                />
                                                {
                                                    imageLoadProfile == true && (
                                                        <div>
                                                            <p>Imagem Carregada</p>
                                                            <img className='previewImage' src={inputImage.files[0]} />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        {
                                            loading === false && email === '' || password === '' || birthDate === '' || name === '' || rg === '' || cpf === '' || phone === '' || razaoSocial === '' || telephone === '' || addressName === '' || nomeFantasia === '' || cnpj === '' ?
                                                <button className='button block' >Solicitar cadastro</button> : <button className='button' onClick={register}>Solicitar cadastro</button>
                                        }
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