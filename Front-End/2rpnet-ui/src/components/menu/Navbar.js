import React, { Component, useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import '../../assets/css/components/navbar.css'


// Icons from react-icons
import * as FaIcons from 'react-icons/fa'
import * as ImIcons from 'react-icons/im'
import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'
import * as BsIcons from 'react-icons/bs'
import * as HiIcons from 'react-icons/hi'
import * as RiDashboardFill from 'react-icons/ri'

import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { handleAuthException, parseJwt } from '../../services/auth'



//logo
import Logo from '../../assets/img/LogoBranca.png'
// import Logo from '../../assets/img/logo2RP.png'
import Profile from '../../assets/img/profile.jpg'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
  const [myUser, setMyUser] = useState({});
  const [nullUndefinedParams, setNullUndefinedParams] = useState({});


  let history = useNavigate();

  const GetMe = async () => {
    await axios.get('http://grupo7.azurewebsites.net/api/UserNames/GetMe', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
      }
    }).then((resposta) => {
      setMyUser(resposta.data);
      // console.log(resposta.data);
    }).catch(async (error) => {
      if (await handleAuthException(error) === true) {
        localStorage.removeItem('2rp-chave-autenticacao')
        history('/login')
      }
    })
  }


  function GoToProfile() {
    history("/profile");
  }

  function click() {
    let sidebar = document.querySelector('.sidebar')
    sidebar.classList.toggle('active')
  }
  // function click() {
  //   let sidebar = document.querySelector('.sidebar2')
  //   sidebar.classList.toggle('active')
  // }
  function click2() {
    let sidebar = document.querySelector('.options')
    sidebar.classList.toggle('active')
  }

  // const delay = ms => new Promise(res => setTimeout(res, ms))
  const signout = () => {

    localStorage.removeItem('2rp-chave-autenticacao')
    history('/login')
    window.location.reload()
    return true
  }




  useEffect(() => {
    const effect = async () => {
      // console.log(parseJwt());
      await GetMe();
    }
    effect();
  }, []);

  if (parseJwt().Role == "3") {
    return (

      <div className='sidebar'>
        <ToastContainer />
        <div className='logo_content'>
          <img className='logo' src={Logo} alt="Logo 2RPnet" />
          <FaIcons.FaBars className='btn' onClick={click} />
        </div>
        <ul className='nav_list'>
          <li>
            <Link to="/home" className='Link'>
              <ImIcons.ImHome3 className='icon2' alt="botão página inicial" />
              <span className='Links_name' alt="botão página inicial">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/guide" className='Link'>
              <RiIcons.RiGuideFill className='icon2' alt="botão guias" />
              <span className='Links_name' alt="botão guias">Guias</span>
            </Link>
          </li>
          {parseJwt().Role !== '1' && parseJwt().Role !== '0' ?
            <li>
              <Link to="/dags" className='Link'>
                <FaIcons.FaTable className='icon2' alt="botão loja" />
                <span className='Links_name' alt="botão dAGS">Registros</span>
              </Link>
            </li>
            : null
          }
          {parseJwt().Role !== '1' && parseJwt().Role !== '0' ?
            <li>
              <Link to="/marketplace" className='Link'>
                <RiIcons.RiShoppingBagFill className='icon2' alt="botão loja" />
                <span className='Links_name' alt="botão loja">Loja</span>
              </Link>
            </li>
            : null
          }
          {parseJwt().Role !== '1' && parseJwt().Role !== '0' ?
            <li>
              <Link to="/quests" className='Link'>
                <FaIcons.FaTasks className='icon2' alt="botão tarefas" />
                <span className='Links_name' alt="botão tarefas">Tarefas</span>
              </Link>
            </li>
            : null
          }
          <li>
            <Link to="/social" className='Link'>
              <AiIcons.AiFillMessage className='icon2' alt="botão fórum social" />
              <span className='Links_name' alt="botão fórum social">Social</span>
            </Link>
          </li>
          <li>
            <Link to="/config" className='Link'>
              <BsIcons.BsFillGearFill className='icon2' alt="botão configurações" />
              <span className='Links_name' alt="botão configurações">Configurações</span>
            </Link>
          </li>

        </ul>
        <div className='profile_content'>
          <div className='profile'>
            {
              myUser != nullUndefinedParams ?
                <div onClick={click2} className='profile_details'>
                  <img src={"http://grupo7.azurewebsites.net/img/" + myUser.photoUser} alt="imagem de perfil" />
                  <div className='name_job'>
                    <div className='name'>{myUser.userName1}</div>
                    {
                      myUser.employees === nullUndefinedParams.employees ?
                        <div className='job'>Cargo indefinido</div> :
                        <div className='job'>{myUser.employees[0].idOfficeNavigation.titleOffice}</div>
                    }
                  </div>
                </div> :
                <div className='profile_details'>
                  <img alt="imagem de perfil" />
                  <div className='name_job'>
                    <div className='name'>Carregando...</div>
                    <div className='job'>Carregando...</div>
                  </div>
                </div>
            }
          </div>

        </div>
        <div className='options'>
          <div onClick={GoToProfile} className='myProfile'>
            <FaIcons.FaRegUser className='btn_log_perfil' />
            <span>Perfil</span>
          </div>
          <div onClick={signout} className='logout'>
            <HiIcons.HiOutlineLogout className='btn_log_perfil' />
            <span>Logout</span>
          </div>

        </div>
      </div>



    );
  }
  else if (parseJwt().Role == "2") {
    return (

      <div className='sidebar'>
        <ToastContainer />
        <div className='logo_content'>
          <img className='logo' src={Logo} alt="Logo 2RPnet" />
          <FaIcons.FaBars className='btn' onClick={click} />
        </div>
        <ul className='nav_list'>
          <li>
            <Link to="/home" className='Link'>
              <ImIcons.ImHome3 className='icon2' alt="botão página inicial" />
              <span className='Links_name' alt="botão página inicial">Home</span>
            </Link>
          </li>
          {parseJwt().Role !== '1' && parseJwt().Role !== '0' ?
            <li>
              <Link to="/dashboard" className='Link'>
                <RiIcons.RiDashboardFill className='icon2' alt="botão loja" />
                <span className='Links_name' alt="botão dAGS">Dashboard</span>
              </Link>
            </li>
            : null
          }
          <li>
            <Link to="/guide" className='Link'>
              <RiIcons.RiGuideFill className='icon2' alt="botão guias" />
              <span className='Links_name' alt="botão guias">Guias</span>
            </Link>
          </li>
          {parseJwt().Role !== '1' && parseJwt().Role !== '0' ?
            <li>
              <Link to="/dags" className='Link'>
                <FaIcons.FaTable className='icon2' alt="botão loja" />
                <span className='Links_name' alt="botão dAGS">Registros</span>
              </Link>
            </li>
            : null
          }
          {parseJwt().Role !== '1' && parseJwt().Role !== '0' ?
            <li>
              <Link to="/marketplace" className='Link'>
                <RiIcons.RiShoppingBagFill className='icon2' alt="botão loja" />
                <span className='Links_name' alt="botão loja">Loja</span>
              </Link>
            </li>
            : null
          }
          {parseJwt().Role !== '1' && parseJwt().Role !== '0' ?
            <li>
              <Link to="/quests" className='Link'>
                <FaIcons.FaTasks className='icon2' alt="botão tarefas" />
                <span className='Links_name' alt="botão tarefas">Tarefas</span>
              </Link>
            </li>
            : null
          }
          <li>
            <Link to="/social" className='Link'>
              <AiIcons.AiFillMessage className='icon2' alt="botão fórum social" />
              <span className='Links_name' alt="botão fórum social">Social</span>
            </Link>
          </li>
          <li>
            <Link to="/config" className='Link'>
              <BsIcons.BsFillGearFill className='icon2' alt="botão configurações" />
              <span className='Links_name' alt="botão configurações">Configurações</span>
            </Link>
          </li>

        </ul>
        <div className='profile_content'>
          <div className='profile'>
            {
              myUser != nullUndefinedParams ?
                <div onClick={click2} className='profile_details'>
                  <img src={"http://grupo7.azurewebsites.net/img/" + myUser.photoUser} alt="imagem de perfil" />
                  <div className='name_job'>
                    <div className='name'>{myUser.userName1}</div>
                    {
                      myUser.employees === nullUndefinedParams.employees ?
                        <div className='job'>Cargo indefinido</div> :
                        <div className='job'>{myUser.employees[0].idOfficeNavigation.titleOffice}</div>
                    }
                  </div>
                </div> :
                <div className='profile_details'>
                  <img alt="imagem de perfil" />
                  <div className='name_job'>
                    <div className='name'>Carregando...</div>
                    <div className='job'>Carregando...</div>
                  </div>
                </div>
            }
          </div>
        </div>
        <div className='options'>
          <div onClick={GoToProfile} className='myProfile'>
            <FaIcons.FaRegUser className='btn_log_perfil' />
            <span>Perfil</span>
          </div>
          <div onClick={signout} className='logout'>
            <HiIcons.HiOutlineLogout className='btn_log_perfil' />
            <span>Logout</span>
          </div>

        </div>
      </div>


    );
  }
  else {
    return (

      <div className='sidebar'>
        <ToastContainer />
        <div className='logo_content'>
          <img className='logo' src={Logo} alt="Logo 2RPnet" />
          <FaIcons.FaBars className='btn' onClick={click} />
        </div>
        <ul className='nav_list'>
          <li>
            <Link to="/home" className='Link'>
              <ImIcons.ImHome3 className='icon2' alt="botão página inicial" />
              <span className='Links_name' alt="botão página inicial">Home</span>
            </Link>
          </li>
          {parseJwt().Role === '1' && parseJwt().Role !== '0' ?
            <li>
              <Link to="/dashboard" className='Link'>
                <RiIcons.RiDashboardFill className='icon2' alt="botão loja" />
                <span className='Links_name' alt="botão dAGS">Dashboard</span>
              </Link>
            </li>
            : null
          }
          <li>
            <Link to="/guide" className='Link'>
              <RiIcons.RiGuideFill className='icon2' alt="botão guias" />
              <span className='Links_name' alt="botão guias">Guias</span>
            </Link>
          </li>
          {parseJwt().Role !== '1' && parseJwt().Role !== '0' ?
            <li>
              <Link to="/dags" className='Link'>
                <RiIcons.RiDashboardFill className='icon2' alt="botão loja" />
                <span className='Links_name' alt="botão dAGS">Registros</span>
              </Link>
            </li>
            : null
          }
          {parseJwt().Role !== '1' && parseJwt().Role !== '0' ?
            <li>
              <Link to="/marketplace" className='Link'>
                <RiIcons.RiShoppingBagFill className='icon2' alt="botão loja" />
                <span className='Links_name' alt="botão loja">Loja</span>
              </Link>
            </li>
            : null
          }
          {parseJwt().Role !== '1' && parseJwt().Role !== '0' ?
            <li>
              <Link to="/quests" className='Link'>
                <FaIcons.FaTasks className='icon2' alt="botão tarefas" />
                <span className='Links_name' alt="botão tarefas">Tarefas</span>
              </Link>
            </li>
            : null
          }
          <li>
            <Link to="/social" className='Link'>
              <AiIcons.AiFillMessage className='icon2' alt="botão fórum social" />
              <span className='Links_name' alt="botão fórum social">Social</span>
            </Link>
          </li>
          <li>
            <Link to="/config" className='Link'>
              <BsIcons.BsFillGearFill className='icon2' alt="botão configurações" />
              <span className='Links_name' alt="botão configurações">Configurações</span>
            </Link>
          </li>

        </ul>
        <div className='profile_content'>
          <div className='profile'>
            <div onClick={signout} className='profile_details'>
              <div className='name_job'>
                <span className='name2'>Logout</span>
              </div>

            </div>
            <HiIcons.HiOutlineLogout id='log_out' onClick={signout} />
          </div>
        </div>
      </div>



    );
  }


}
export default Navbar;