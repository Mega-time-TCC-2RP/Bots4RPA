import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Profile from '../../assets/img/profile.jpg'
import Coin from '../../assets/img/coin.png'
import '../../assets/css/components/header.css'
import * as HiIcons from 'react-icons/hi'

class Header extends Component {
    render(){
        return (
          <div> 
            <div className='header2'>
                <div className='headerInside2 container'>
                    <div className='coins'>
                        <img src={Coin} alt="img coin"/>
                        <div className='cash'>1000</div>
                    </div>
                    <div className='profile'>
                        <div className='profile_details'>
                        <img src={Profile} alt="img profile"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='details'>
            <div className='profile'>
            <div className='profile_details'>
                <img src={Profile} alt="img profile"/>
                <div className='name_job'>
                    <div className='name'>Name</div>
                    <div className='job'>Job</div>
                </div>
            </div>
            </div>
                <ul>
                    <li>
                    <Link to="#" className='Link'>
                        <span className='Links_name'>Acessar Consquistas</span>
                    </Link>
                    </li>
                    <li>
                    <Link to="#" className='Link'>
                        <span className='Links_name'>Acessar Skins</span>
                    </Link>
                    </li>
                    <li>
                    <Link to="#" className='Link'>
                        <span className='Links_name'>Acessar Progresso</span>
                    </Link>
                    </li>
                </ul>
                <div className='logout'>
                    <span>Sair</span>
                    <HiIcons.HiOutlineLogout id='log_out'/>
                </div>
                
            </div>

            </div>   
        );
    }
}
export default Header