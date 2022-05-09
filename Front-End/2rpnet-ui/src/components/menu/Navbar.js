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
import Logo from '../../assets/img/logo2RPbranco.png'
// import Logo from '../../assets/img/logo2RP.png'
import Profile from '../../assets/img/profile.jpg'

 function Navbar() {
  
  function click(){
    let sidebar = document.querySelector('.sidebar')
    sidebar.classList.toggle('active')
  }
  // btn.onclick = function(){
  //   sidebar.classList.toggle('active')
  // }
  // onClick={sidebar.classList.toggle('active')}
  
return (

    <div className='sidebar'>
      <div className='logo_content'>
        <img className='logo' src={Logo} alt="Logo 2RPnet"/>
        <FaIcons.FaBars className='btn' onClick={click} />
      </div>
      <ul className='nav_list'>
        <li>
          <Link to="/" className='Link'>
            <ImIcons.ImHome3 className='icon2' alt="botão página inicial"/>
            <span className='Links_name' alt="botão página inicial">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/guide" className='Link'>
            <RiIcons.RiGuideFill className='icon2' alt="botão guias"/>
            <span className='Links_name' alt="botão guias">Guias</span>
          </Link>
        </li>
        <li>
          <Link to="/marketplace" className='Link'>
            <RiIcons.RiShoppingBagFill className='icon2' alt="botão loja"/>
            <span className='Links_name' alt="botão loja">Loja</span>
          </Link>
        </li>
        <li>
          <Link to="/taskcalendar" className='Link'>
            <FaIcons.FaTasks className='icon2' alt="botão tarefas"/>
            <span className='Links_name' alt="botão tarefas">Tarefas</span>
          </Link>
        </li>
        <li>
          <Link to="/myprocesses" className='Link'>
            <FaIcons.FaRobot className='icon2' alt="botão assistentes"/>
            <span className='Links_name' alt="botão assistentes">Assistentes</span>
          </Link>
        </li>
        <li>
          <Link to="/social" className='Link'>
            <AiIcons.AiFillMessage className='icon2' alt="botão fórum social"/>
            <span className='Links_name' alt="botão fórum social">Social</span>
          </Link>
        </li>
        <li>
          <Link to="/config" className='Link'>
            <BsIcons.BsFillGearFill className='icon2' alt="botão configurações"/>
            <span className='Links_name' alt="botão configurações">Configurações</span>
          </Link>
        </li>
        
      </ul>
        <div className='profile_content'>
          <div className='profile'>
            <div className='profile_details'>
            <img src={Profile} alt="Imagem de perfíl"/>
              <div className='name_job'>
                <div className='name'>Name</div>
                <div className='job'>Job</div>
              </div>
            </div>
            <HiIcons.HiOutlineLogout id='log_out'/>
          </div>
        </div>
     </div>
     

  );
 

}
export default Navbar;