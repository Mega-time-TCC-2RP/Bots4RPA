import React from 'react';
import { Link } from 'react-router-dom';
import VLibras from '@djpfs/react-vlibras'

//Components:
import Footer from '../../components/footer/footer'

//css:
import '../../assets/css/pages/waitingRoom.css'
import '../../assets/css/components/button.css'
import '../../assets/css/components/fonts.css'

//img
import waiting from '../../assets/img/waiting.png'


export default function WaitingRoom() {

    return (
        <div className='waiting-background'>
            <VLibras/>
            <div className='waiting-container'>
                <img src={waiting} className="img-waiting" />
                <span className='h2 waiting-title'>Oops...Parece que você ainda não foi validado 😥😥</span>
                <span className='p waiting-text'>Por favor, aguarde mais alguns minutos até o seu usuário ser verificado.</span>
                <span className='p waiting-text'>Enquanto isso, aproveite para tomar um chá e comer um delicioso cookie :)</span>
                <Link to="/login"><button className='button waiting-button'>Voltar</button></Link>
            </div>
            <Footer className='footer-waitroom'/>
        </div>

    );
}
