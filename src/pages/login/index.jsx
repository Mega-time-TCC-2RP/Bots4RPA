import { Component } from 'react';
import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';

//img:
import logoMaior from '../../assets/img/logoMaior.png'
import Vermelho from '../../assets/img/Vermelho.png'
import Azul from '../../assets/img/Azul.png'
import Robo from '../../assets/img/roboLandingPage.png'
import Financas from '../../assets/img/financas.png'
import Banco from '../../assets/img/banco.png'
import Admin from '../../assets/img/admin.png'

//Components:
import Footer from '../../components/footer/footer'

//css:
import '../../assets/css/pages/login.css';
import '../../assets/css/components/button.css';
import '../../assets/css/components/fonts.css';


export default function login() {
        return (
                <div>
                        <div className='login'>
                        <img src={Azul} className='img-blue' alt="imagem de um robô vermelho" />

                                <div className='login-container'>
                                        
                                        <div className='forms-login'>
                                        <img src={logoMaior} className='logo-Header' alt="Logo 2RP" />

                                                <div className='formsLogin-Email'>
                                                        <p className='topo-input-email'>E-mail</p>
                                                        <input type="email" placeholder='Insira seu E-mail' />
                                                </div>
                                                <div className='Login'>
                                                        <p className='topo-input-senha'>Senha</p>
                                                        <input type="senha" placeholder='Insira sua senha' />
                                                </div>
                                                <button className='botaoLogin'>Logar</button>

                                                <div className='EsqueceuSenha'>
                                                        <a className='re-passwq'>Esqueceu a senha?</a>
                                                </div>

                                                <div className='divider'>
                                                        <span>---------ou---------</span>
                                                </div>

                                                        <button className='google-button'>Continuar com o Google</button>

                                                <div className='NotSigned-login'>
                                                        <a>Não possui cadastro?</a>
                                                </div>
                                                <div>
                                                        
                                                </div>
                                        </div>
                                </div>
                                <img src={Vermelho} className='img-red' alt="imagem de um robô vermelho" />

                        </div>
                </div>

        )
}

