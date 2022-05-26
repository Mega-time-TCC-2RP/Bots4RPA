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
                                </div>
                        </div>
                        <Footer />
                </div>
        )
}