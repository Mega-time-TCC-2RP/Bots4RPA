import { Component } from 'react';
import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';

//img:
import Logo from '../../assets/img/logo2RP.png'
import RoboAzul from '../../assets/img/roboAzul.png'
import RoboVermeho from '../../assets/img/roboVermelho.png'

//Components:

//css:
import '../../assets/css/pages/registerCompany.css'
import '../../assets/css/components/button.css'
import '../../assets/css/components/fonts.css'  

export default function RegisterCompany() {

    const [razaoSocial, setRazaoSocial] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState();

    const onlyNumbers = (string) => string.replace(/[^0-9]/g,'')

    const MaskedInput = ({value, onChange}) => {
        function handleChange(event) {
            onChange({
                ...event,
                target: {
                    ...event.target,value: onlyNumbers(event.target.value)
                }
            })
        }

        return <InputMask id='placeholder-text' placeholder='Insira o CNPJ...' mask="99.999.999/999-99" value={value} required 
        onChange={handleChange} 
        />
    }
    console.log(cnpj);
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
                                <label className='h5'>Razão Social</label>
                                <input id='placeholder-text' type="text"  name="razaoSocial"  placeholder='Insira a Razão Social...' required />
                            </div>
                            <div className='foreachInput'>
                                <label className='h5'>Nome Fantasia</label>
                                <input id='placeholder-text' type="text"  placeholder='Insira o Nome Fantasia...' required/>
                            </div>
                            <div className='foreachInput'>
                                <label className='h5'>CNPJ</label>
                                <MaskedInput value={cnpj} onChange={(event) => setCnpj(event.target.value)} />
                            </div>
                            <button className='button' type="submit">Ir ao cadastro do dono</button>
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