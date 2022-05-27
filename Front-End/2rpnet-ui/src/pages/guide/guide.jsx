import React from 'react';
import { Link } from 'react-router-dom';
import VLibras from '@djpfs/react-vlibras'

//Components:
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import Navbar from '../../components/menu/Navbar'

//css:
import '../../assets/css/pages/guide.css'
import '../../assets/css/components/button.css'
import '../../assets/css/components/fonts.css'

export default function Guide() {
    return (
        <div className='general-conteiner'>
            <VLibras />
            <Navbar />
            <div className='conteiner-guide'>
                <span className='h2'>Guia Definitivo</span>
            </div>
            <iframe width="1246" height="701" className='video-youtube' src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <div className='body-conteiner'>
                <div className='conteiner-guide'>
                    <span className='h2'>Passo a passo</span>
                    <div className='timeline'>
                        <ul>
                            <li>
                                <div className='timeline-content'>
                                    <span className='h3 body-title-guide'>What is Lorem Ipsum?</span>
                                    <span className='p text-guide'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</span>
                                </div>
                                <div className='time'>
                                    <h4>January 2018</h4>
                                </div>
                            </li>
                            <li>
                                <div className='timeline-content'>
                                    <span className='h3 body-title-guide'>What is Lorem Ipsum?</span>
                                    <span className='p text-guide'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</span>
                                </div>
                                <div className='time'>
                                    <h4>January 2018</h4>
                                </div>
                            </li>
                            
                            <li>
                                <div className='timeline-content'>
                                    <span className='h3 body-title-guide'>What is Lorem Ipsum?</span>
                                    <span className='p text-guide'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</span>
                                </div>
                                <div className='time'>
                                    <h4>January 2018</h4>
                                </div>
                            </li>
                            <div></div>
                        </ul>
                    </div>
                    
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}