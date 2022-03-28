import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/css/components/navbar.css'

// Icons from react-icons
import * as FaIcons from 'react-icons/fa'
import * as ImIcons from 'react-icons/im'
import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'
import * as BsIcons from 'react-icons/bs'
import * as HiIcons from 'react-icons/hi'

//logo
import Logo from '../../assets/img/logo2RP.png'
import Profile from '../../assets/img/profile.jpg'

 function Navbar() {
  let btn = document.querySelector('#btn')
  let sidebar = document.querySelector('.sidebar')

  btn.onclick = function(){
    sidebar.classList.toggle("active")
  }

  return (
<div id='global'>
    <div className='sidebar'>
      <div className='logo_content'>
        <img className='logo' src={Logo} alt="Logo 2RPnet"/>
        <FaIcons.FaBars id="btn"/>
      </div>
      <ul className='nav_list'>
        <li>
          <Link to="#" className=' Link'>
            <ImIcons.ImHome3 className='icon'/>
            <span className='Links_name'>Home</span>
          </Link>
        </li>
        <li>
          <Link to="#" className=' Link'>
            <RiIcons.RiGuideFill className='icon'/>
            <span className='Links_name'>Guias</span>
          </Link>
        </li>
        <li>
          <Link to="#" className=' Link'>
            <FaIcons.FaUniversalAccess className='icon'/>
            <span className='Links_name'>Acessibilidade</span>
          </Link>
        </li>
        <li>
          <Link to="#" className=' Link'>
            <FaIcons.FaTasks className='icon'/>
            <span className='Links_name'>Tarefas</span>
          </Link>
        </li>
        <li>
          <Link to="#" className=' Link'>
            <FaIcons.FaTshirt className='icon'/>
            <span className='Links_name'>Coleção</span>
          </Link>
        </li>
        <li>
          <Link to="#" className=' Link'>
            <FaIcons.FaRobot className='icon'/>
            <span className='Links_name'>Processos</span>
          </Link>
        </li>
        <li>
          <Link to="#" className=' Link'>
            <AiIcons.AiFillMessage className='icon'/>
            <span className='Links_name'>Social</span>
          </Link>
        </li>
        <li>
          <Link to="#" className=' Link'>
            <BsIcons.BsFillGearFill className='icon'/>
            <span className='Links_name'>Configurações</span>
          </Link>
        </li>
        
      </ul>
        <div className='profile_content'>
          <div className='profile'>
            <div className='profile_details'>
            <img src={Profile} alt="img profile"/>
              <div className='name_job'>
                <div className='name'>Name</div>
                <dib className='job'>Job</dib>
              </div>
            </div>
            <HiIcons.HiOutlineLogout id='log_out'/>
          </div>
        </div>
     </div>
     <div className='home_content'></div>
</div>
  );
}
export default Navbar;


