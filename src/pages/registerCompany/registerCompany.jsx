import { Component } from 'react';
import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';

//img:
import Logo from '../../assets/img/logo2RPcadastro.png'
import RoboAzul from '../../assets/img/roboAzul.png'
import RoboVermeho from '../../assets/img/roboVermelho.png'

//Components:

//css:
import '../../assets/css/pages/registerCompany.css'
import '../../assets/css/components/button.css'
import '../../assets/css/components/fonts.css'

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

    function register() {
        setLoading(true);
        let company = {
            NameFantasy : nomeFantasia,
            CorporateName : razaoSocial,
            AddressName : addressName,
            Phone : phone,
            Cnpj : cnpj,
        }
        axios.post('http://grupo7.azurewebsites.net/api/Corporations', company)
        .then((resposta) => {
            if (resposta.status === 201) {
                console.log("criado")
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
            <div className='backgroudRegister'>
                <div className='robotBlue'>
                    <img src={RoboAzul} alt="Robo Azul" />
                </div>
                <div className='registerArea'>
                    <div className='registerContent'>
                        <img className='logoRegister' src={Logo} alt="Logo 2RPnet" />
                        <form className='formRegister'>
                            <div className='foreachInput'>
                                <label className='h5'>Nome Fantasia</label>
                                <input id='placeholder-text' type="text" placeholder='Insira o Nome Fantasia...' value={nomeFantasia} onChange={(event) => setNomeFantasia(event.target.value)} autoFocus required />
                            </div>
                            <div className='foreachInput'>
                                <label className='h5'>Razão Social</label>
                                <input id='placeholder-text' type="text" name="razaoSocial" placeholder='Insira a Razão Social...' value={razaoSocial} onChange={(event) => setRazaoSocial(event.target.value)} required />
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
                            {
                                loading === true && (
                                    <button className='button' type="submit" disabled>Loading...</button>
                                )
                            }
                            {
                                loading === false && (
                                    <button className='button' type="submit" onClick={register}>Ir ao cadastro do dono</button>
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