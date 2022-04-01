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
import PageRepresentation from '../../assets/img/pageRepresentation.png'

//Components:
import Footer from '../../components/footer/footer'

//css:
import '../../assets/css/pages/landingPage.css'
import '../../assets/css/components/button.css'
import '../../assets/css/components/fonts.css'

export default function LandingPage() {
    return (
        <div className='landingPage'>
            <div className='header container'>
                <div className='headerInside container'>
                    <img src={Logo} className='logoHeader' alt="Logo 2RP" />
                    <div className='headerNav'>
                        <Link to="#"><span className='login h6'>Login</span></Link>
                        <Link to="#"><button className='button h6' id='buttonSignUp' >Inscreva-se</button></Link>
                    </div>
                </div>
            </div>
            <section className='container section'>
                <div className='content'>
                    <h2 className='h2'>A melhor solução de automatização para qualquer empresa</h2>
                    <h6 className='h6'>Não perca tempo, automatize os processos dentro da sua empresa com qualidade e confiança</h6>
                    <Link to="#"><button className='button h5'>Teste Agora</button></Link>
                </div>
                <img src={Robo} alt="" />
            </section>
            <section className='section section2'>
                <div className='container section2Content'>
                    <h3 className='h3'>Áreas de atendimento</h3>
                    <div className='articleArea'>
                        <article>
                            <img src={Financas} alt="Finanças" />
                            <h5>Finanças</h5>
                            <p>Possíveis soluções na área de finanças para o desempenho do seu negócio</p>
                        </article>
                        <article>
                            <img src={Banco} alt="Banco" />
                            <h5>Banco</h5>
                            <p>Através da automação, tarefas no setor bancário são feitas em tempo reduzido com qualidade</p>
                        </article>
                        <article>
                            <img src={Admin} alt="Administração" />
                            <h5>Admin</h5>
                            <p>A área administrativa leva demandas que são facilmente simplificadas através da aplicação</p>
                        </article>
                    </div>
                </div>
            </section>
            <section>
                <div>
                    <div className='container section3'>
                        <h3 className='h3 sectionH3'>Não deixe que a codificação o atrapalhe</h3>
                        <h5 className='h5 sectionH5'>Crie todos os campos, tabelas, painéis e automações com arrastar e soltar e clicar</h5>
                        <div className='section3Conteint'>
                            <img className='pageRepresentation' src={PageRepresentation} alt="" />
                            <div className='textConteint'>
                                <p>Crie os seus próprios assistentes através do fluxo de automação de acordo com as suas necessidades. Com diversas funcionalidades que podem atuar em qualquer área, é possível rodar os assistentes quando for necessário</p>
                                <Link to="#"><button className='button'>Começar</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
