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
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur tempora ab laudantium voluptatibus aut eos placeat laborum, quibusdam exercitationem labore.</p>
                                </div>
                            </li>
                            <li className='timeline-boxsizing'>
                                <div class="timeline-content">
                                    <h1>Passo 2</h1>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur tempora ab laudantium voluptatibus aut eos placeat laborum, quibusdam exercitationem labore.</p>
                                </div>
                            </li>
                            <li className='timeline-boxsizing'>
                                <div class="timeline-content">
                                    <h1 className='h1'>Passo 3</h1>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur tempora ab laudantium voluptatibus aut eos placeat laborum, quibusdam exercitationem labore.</p>
                                </div>
                            </li>
                            <li className='timeline-boxsizing'>
                                <div class="timeline-content">
                                    <h1>Passo 4</h1>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur tempora ab laudantium voluptatibus aut eos placeat laborum, quibusdam exercitationem labore.</p>
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