import { Component } from 'react';
import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import VLibras from '@djpfs/react-vlibras'

//img:
import logoMaior from '../../assets/img/logoMaior.png'
import Vermelho from '../../assets/img/Vermelho.png'
import Azul from '../../assets/img/Azul.png'
import Robo from '../../assets/img/roboLandingPage.png'
import Financas from '../../assets/img/financas.png'
import Banco from '../../assets/img/banco.png'
import Admin from '../../assets/img/admin.png'
import * as FcIcons from 'react-icons/fc'

//Components:
import Footer from '../../components/footer/footer'

//css:
import '../../assets/css/pages/login.css';
import '../../assets/css/components/button.css';
import '../../assets/css/components/fonts.css';


//services
import { history } from '../../history';
import { parseJwt, usuarioAutenticado } from '../../services/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleLogin from 'react-google-login';




export default function Login() {
        const [IsLoading, setIsLoading] = useState(false);
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const diffToast = () => {
                toast.success('Autenticando...', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
        }
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


        
        let history = useNavigate();

        const handleSubmit = (e) => {
                setIsLoading(true);
                e.preventDefault();
        
                axios.post('https://grupo7.azurewebsites.net/api/Login', {
                    email: email,
                    password: password
                })  
                .then(diffToast(),
                        bazinga => {
                                if (bazinga.status !== 200) {
                                        toast.dismiss(diffToast());
                                        errorToast()
                                }
                        }
                )  
                    .then(resposta => {
                        if (resposta.status === 200) {
                            localStorage.setItem('2rp-chave-autenticacao', resposta.data.token);
                            
                            // define a variável base64 que vai receber o payload do token
                            let base64 = localStorage.getItem('2rp-chave-autenticacao').split('.')[1];
                        //     console.log(base64);
                            // exibe as propriedades da página
                        //     console.log(parseJwt());
                            // verifica se o usuário logado é do tipo administrador
                            //mudar aqui e no menu principal se o cadastro for liberado para
                            //todos os usuarios
                            if (parseJwt().role === '1' || parseJwt().role === '2' || parseJwt().role === '3') {
                                history('/')

                                // console.log('logado: ' + usuarioAutenticado())
                            }
                            
                            else{
                                history('/notFound')

                            }
                        }
                        setIsLoading(false);
                    })

                    .catch(() => {
                        
                        this.setState({ erroMensagem: 'E-mail e/ou senha inválidos', isLoading: false })
                        setIsLoading(false);
                    })
                    setIsLoading(false);
            };

            const responseGoogle = (response) => {
                    console.log(response)
            }

        return (
                <div>

                        <div className='login'>
                        <ToastContainer/>
                        <img src={Azul} className='img-blue' alt="imagem de um robô vermelho" />
                        <VLibras/>
                                <div className='login-container'>
                                        
                                        <div className='forms-login'>
                                        <img src={logoMaior} className='logo-Header' alt="Logo 2RP" />
                                        <form onSubmit={handleSubmit} >
                                                <div className='formsLogin-Email'>
                                                        <p className='topo-input-email' alt="Email">E-mail</p>
                                                        <input
                                                                type="email"
                                                                placeholder='Insira seu E-mail'
                                                                id="email"
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                </div>
                                                <div className='Login'>
                                                        <p className='topo-input-senha' alt="Senha">Senha</p>
                                                        <input
                                                                type="password"   
                                                                placeholder='Insira sua senha'
                                                                id="senha"
                                                                value={password}
                                                                onChange={(e) => setPassword(e.target.value)}        
                                                        />
                                                </div>
                                                {
                                                        IsLoading === true ?
                                                        <button className='botaoLogin' type='submit' disabled>Carregando...</button> : <button className='botaoLogin' type='submit'>Entrar</button>
                                                }
                                                
                                                <div className='EsqueceuSenha'>
                                                        <a className='re-passwq' alt="Esqueceu a senha?" >Esqueceu a senha?</a>
                                                </div>

                                                <div className='divider'>
                                                        <span alt="divisor de elementos">---------ou---------</span>
                                                </div>

                                                <GoogleLogin
                                                        clientId="129629597162-d06hd5esb90feonsp0flldnq6r37cq8b.apps.googleusercontent.com"
                                                        render={renderProps => (
                                                        <button className='google-button' alt="Entrar com o Google" onClick={renderProps.onClick}>
                                                                <FcIcons.FcGoogle className='icon3' alt="Google Icon"/>
                                                                Continuar com o Google
                                                        </button>
                                                        )}
                                                        onSuccess={responseGoogle}
                                                        onFailure={responseGoogle}
                                                />

                                                <div className='NotSigned-login'>
                                                        <a alt="Não possui cadastro?">Não possui cadastro?</a>
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

