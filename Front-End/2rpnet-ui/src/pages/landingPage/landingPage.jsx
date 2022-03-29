import { Component } from 'react';
import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';

//img:
import Logo from '../../assets/img/logo2RP.png'
import Robo from '../../assets/img/roboLandingPage.png'
import Financas from '../../assets/img/financas.png'
import Banco from '../../assets/img/banco.png'
import Admin from '../../assets/img/admin.png'

//Components:
import Footer from '../../components/footer/footer'

//css:
import '../../assets/css/pages/landingPage.css'
import '../../assets/css/components/button.css'

export default function LandingPage() {
    return (
        <div>
            <div className='header container'>
                <div className='headerInside container'>
                    <img src={Logo} className='logoHeader' alt="Logo 2RP" />
                    <div className='headerNav'>
                        <Link to="#"><span className='signUpEnterprise'>Cadastre sua empresa</span></Link>
                        <hr className='hr' />
                        <Link to="#"><span className='login'>Login</span></Link>
                        <Link to="#"><button className='button' id='buttonSignUp' >Inscreva-se</button></Link>
                    </div>
                </div>
            </div>
            <section className='container section'>
                <div className='content'>
                    <h1>A melhor solução de automatização para qualquer empresa</h1>
                    <h2>Não perca tempo, automatize os processos dentro da sua empresa com qualidade e confiança</h2>
                    <Link to="#"><button className='button'>Teste Agora</button></Link>
                </div>
                <img src={Robo} alt="" />
            </section>
            <section className='section section2'>
                <div className='container section2Content'>
                    <h1>Áreas de atendimento</h1>
                    <div className='articleArea'>
                        <article>
                            <img src={Financas} alt="Finanças" />
                            <h1>Finanças</h1>
                            <p>Possíveis soluções na área de finanças para o desempenho do seu negócio</p>
                        </article>
                        <article>
                            <img src={Banco} alt="Banco" />
                            <h1>Banco</h1>
                            <p>Através da automação, tarefas no setor bancário são feitas em tempo reduzido com qualidade</p>
                        </article>
                        <article>
                            <img src={Admin} alt="Administração" />
                            <h1>Admin</h1>
                            <p>A área administrativa leva demandas que são facilmente simplificadas através da aplicação</p>
                        </article>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
