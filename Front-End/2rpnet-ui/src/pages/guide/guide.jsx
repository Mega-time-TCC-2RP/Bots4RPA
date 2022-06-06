import React from 'react';
import { Link } from 'react-router-dom';
import VLibras from '@djpfs/react-vlibras'

//Components
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import Navbar from '../../components/menu/Navbar'

//css
import '../../assets/css/pages/guide.css'
import '../../assets/css/components/button.css'
import '../../assets/css/components/fonts.css'
//img
import ImgPost from '../../assets/img/ImgPost.png'


export default function Guide() {
    return (
        <div className='general-conteiner'>
            <VLibras />
            <Navbar />
            <div className='conteiner-guide'>
                <span className='h2'>Guia</span>
            </div>
            <div className='video-container-timeline'>
                <iframe width="1246" height="701" src="https://www.youtube.com/embed/6uphTNGYziU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                <div className='body-conteiner'>
                </div>
            </div>

            <div className='conteiner-timeline'>
                <span className='h2 timeline-title-sec-container'>Passo a passo</span>
                <div class="container-timeline">
                    <div class="timeline">
                        <ul>
                            <li className='timeline-boxsizing'>
                                <div class="timeline-content">
                                    <h1>Passo 1</h1>
                                    <p>Para começar, você deve pensar em um nome que combine com a finalidade que você deseja que o seu assistente execute, após isso, de a ele uma descrição para nunca se esquecer do que ele faz.</p>
                                </div>
                            </li>
                            <li className='timeline-boxsizing'>
                                <div class="timeline-content">
                                    <h1>Passo 2</h1>
                                    <p>Depois de cliclar em "Criar assistente", você irá observar uma variedade de métodos, os quais basta arrastá-los e colocá-los na ordem de execução para que sigam o fluxo desejado.</p>
                                </div>
                            </li>
                            <li className='timeline-boxsizing'>
                                <div class="timeline-content">
                                    <h1 className='h1'>Passo 3</h1>
                                    <p>É importante que você não se esqueça de sempre salvar e executar o seu assistente para que ele esteja sempre realizando os seus processos da forma desejada.</p>
                                </div>
                            </li>
                            <li className='timeline-boxsizing'>
                                <div class="timeline-content">
                                    <h1>Passo 4</h1>
                                    <p>Por fim, será enviado para o seu e-mail cadastrado os resultados de seu fluxo criado. Você poderá conferir também mais informações na tela "home", onde cliando em "ver detalhes", poderá conferir mais informações sobre o assistente criado.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
            <Footer />
        </div>
    )
}