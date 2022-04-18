import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Profile from '../../assets/img/profile.jpg'
import Coin from '../../assets/img/coin.png'
import '../../assets/css/components/header.css'
import * as HiIcons from 'react-icons/hi'

class Header extends Component {
    render(){
        function click(){
            let details = document.querySelector('.details')
            details.classList.toggle('active')
          }
        return (
          <div> 
            <div className='header2'>
                <div className='container'>
                    <div className='headerInside2'>
                        <div className='coins'>
                        <img src={Coin} alt="moedas"/>
                        <div className='cash'>1000</div>
                    </div>
                    <div className='profile2'>
                        <div className='profile_details'>
                        <img src={Profile} className='imgProfile' alt="imagem de perfil"  onClick={click}/>
                        </div>
                    </div>
                    </div>
                    
                </div>
            </div>
            <div className='details'>
            <div className='profile2'>
            <div className='profile_details'>
                <img src={Profile} alt="imagem de perfil"/>
                <div className='name_job'>
                    <div className='name'>Name</div>
                    <div className='job'>Job</div>
                </div>
            </div>
            </div>
                <ul>
                    <li>
                    <Link to="#" className='Link'>
                        <span className='Links_name' alt="botão acessar conquistas">Acessar Consquistas</span>
                    </Link>
                    </li>
                    <li>
                    <Link to="#" className='Link'>
                        <span className='Links_name' alt="botão acessar skins">Acessar Skins</span>
                    </Link>
                    </li>
                    <li>
                    <Link to="#" className='Link'>
                        <span className='Links_name' alt="botão acessar skins">Acessar Progresso</span>
                    </Link>
                    </li>
                </ul>
                <div className='logout'>
                    <span alt="botão sair">Sair</span>
                    <HiIcons.HiOutlineLogout id='log_out'/>
                </div>
                
            </div>

            </div>   
        );
    }
}
export default Header