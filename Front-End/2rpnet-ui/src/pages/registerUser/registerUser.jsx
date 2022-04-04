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

export default function RegisterUser() {
    const [loading, setLoading] = useState(false);
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
                                <label className='h5'>RG</label>
                                <input id='placeholder-text' type="text" name="RG" placeholder='Insira o seu RG...' autoFocus required />
                            </div>
                            <div className='foreachInput'>
                                <label className='h5'>CPF</label>
                                <input id='placeholder-text' placeholder='Insira o seu CPF...' required />
                            </div>
                            <div className='foreachInput'>
                                <label className='h5'>Telefone</label>
                                {/* <MaskedInput  /> */}
                            </div>
                            <button className='button' type="submit" disabled>Finalizar Cadastro</button>
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