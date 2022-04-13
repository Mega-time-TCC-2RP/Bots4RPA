import { Component } from 'react';
import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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


//services
import { history } from '../../history';
import { parseJwt, usuarioAutenticado } from '../../services/auth';



export default function Login() {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        let history = useNavigate();

        const handleSubmit = (e) => {
                e.preventDefault();
        
                axios.post('https://grupo7.azurewebsites.net/api/Login', {
                    email: email,
                    password: password
                })        
                    .then(resposta => {
                        if (resposta.status === 200) {
                            localStorage.setItem('2rp-chave-autenticacao', resposta.data.token);
                            // define a variável base64 que vai receber o payload do token
                            let base64 = localStorage.getItem('2rp-chave-autenticacao').split('.')[1];
                            console.log(base64);
                            // exibe as propriedades da página
                            console.log(parseJwt());
                            // verifica se o usuário logado é do tipo administrador
                            //mudar aqui e no menu principal se o cadastro for liberado para
                            //todos os usuarios
                            if (parseJwt().role === '1' ) {
                                history('/')
                                console.log('logado: ' + usuarioAutenticado())
                            }
                            else{
                                history('/notFound')
                            }
                        }
                    })
                    .catch(() => {
                        this.setState({ erroMensagem: 'E-mail e/ou senha inválidos', isLoading: false })
                    })
            };

        return (
                <div>
                        <div className='login'>
                        <img src={Azul} className='img-blue' alt="imagem de um robô vermelho" />

                                <div className='login-container'>
                                        
                                        <div className='forms-login'>
                                        <img src={logoMaior} className='logo-Header' alt="Logo 2RP" />
                                        <form onSubmit={handleSubmit}>
                                                <div className='formsLogin-Email'>
                                                        <p className='topo-input-email'>E-mail</p>
                                                        <input
                                                                type="email"
                                                                placeholder='Insira seu E-mail'
                                                                id="email"
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                </div>
                                                <div className='Login'>
                                                        <p className='topo-input-senha'>Senha</p>
                                                        <input
                                                                type="password"   
                                                                placeholder='Insira sua senha'
                                                                id="senha"
                                                                value={password}
                                                                onChange={(e) => setPassword(e.target.value)}        
                                                        />
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
                                                </form>
                                                <div>
                                                        
                                                </div>
                                        </div>
                                </div>
                                <img src={Vermelho} className='img-red' alt="imagem de um robô vermelho" />

                        </div>
                </div>

        )
}

