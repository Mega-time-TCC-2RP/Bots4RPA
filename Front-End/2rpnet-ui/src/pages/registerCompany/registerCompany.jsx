import { Component } from 'react';
import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
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
import { parseJwt, usuarioAutenticado } from '../../services/auth';

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

    return <InputMask id='placeholder-text' placeholder='Insira o seu Contato...' mask="(99)99999-9999" value={value} required
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

export default function RegisterCompany() {

    const [razaoSocial, setRazaoSocial] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [addressName, setAddressName] = useState('')
    const [phone, setPhone] = useState('');
    const [cnpj, setCnpj] = useState();
    const [loading, setLoading] = useState(false);
    const [imageLoad, setImageLoad] = useState(false);

    function inputImageVerify() {
        setImageLoad(true);
    }

    const register = (event) => {
        event.preventDefault();
        var formData = new FormData();
        setLoading(true);

        axios("http://grupo7.azurewebsites.net/api/UserNames/" + parseJwt().jti)
            .then((resposta) => {
                if (resposta.status === 200) {
                    console.log(resposta.data)
                    const element = document.getElementById('imageCompany')
                    const file = element.files[0]

                    if (element.files[0] == undefined) {
                        formData.append('CorpPhoto', file)
                    } else {
                        formData.append('CorpPhoto', file, file.name)
                    }

                    formData.append('Username1', resposta.data.UserName1)
                    formData.append('Email', resposta.data.Email)
                    formData.append('Passwd', resposta.data.Passwd)
                    formData.append('BirthDate', resposta.data.BirthDate)
                    formData.append('Rg', resposta.data.Rg)
                    formData.append('Cpf', resposta.data.Cpf)
                    formData.append('Phone', resposta.data.Phone)
                    formData.append('idUserType', resposta.data.idUserType)
                    formData.append('idCorporation', resposta.data.IdCorporation)
                    formData.append('idOffice', resposta.data.IdOffice)
                    formData.append('CorpUser', resposta.data.photoUser, resposta.data.photoUser.name)
                    formData.append('CorporateName', nomeFantasia)
                    formData.append('AddressName', addressName)
                    formData.append('CorpPhone', phone)
                    formData.append('Cnpj', cnpj)
                }
            })
            .catch((erro) => {
                console.log(erro)
            })

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
        <div>
            <VLibras />
            <div className='backgroudRegister'>
                <div className='robotBlue'>
                    <img src={RoboAzul} alt="Robo Azul" />
                </div>
                <div className='registerArea'>
                    <div className='registerContent'>
                        <img className='logoRegister' src={Logo} alt="Logo 2RPnet" />
                        <form encType='multipart/form-data' className='formRegister'>

                            <div className='foreachInput'>
                                <label className='h5'>Nome Fantasia</label>
                                <input id='placeholder-text' type="text" placeholder='Insira o Nome Fantasia...' value={nomeFantasia} onChange={(event) => setNomeFantasia(event.target.value)} autoFocus required />
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
                            <div className='foreachInput'>
                                <label className='h5'>Foto da Empresa</label>
                                <label className='sendPhoto h6' for='imageCompany'>Enviar foto</label>
                                <input id='imageCompany' className='imageCompanyInput' type="file" accept="image/png, image/jpeg" name="imageCompany" onChange={inputImageVerify} />
                                {
                                    imageLoad == true && (
                                        <div>
                                            <p className='p '>Imagem Carregada</p>
                                        </div>
                                    )
                                }
                            </div>
                            {
                                loading === true && (
                                    <button className='button' type="submit" disabled>Loading...</button>
                                )
                            }
                            {
                                loading === false && (
                                    <button className='button' onClick={register}>Ir ao cadastro do dono</button>
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