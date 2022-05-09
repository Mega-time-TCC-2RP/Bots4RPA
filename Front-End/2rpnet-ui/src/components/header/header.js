import React, { Component } from 'react'
import { render } from '@testing-library/react'
import { Link, useNavigate, Navigate, } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Profile from '../../assets/img/profile.jpg'
import Coin from '../../assets/img/coin.png'
import '../../assets/css/components/header.css'
import * as HiIcons from 'react-icons/hi'
import axios from 'axios'
import { handleAuthException } from '../../services/auth'

export const Header = () => {
    const [myUser, setMyUser] = useState({});

    let navigate = useNavigate();

    const GetMe = async () => {
        await axios.get('http://grupo7.azurewebsites.net/api/UserNames/GetMe', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
            }
        }).then((resposta) => {
            console.log("A");
            setMyUser(resposta.data);
            console.log(resposta.data);
        }).catch(async (error) => {
            if (await handleAuthException(error) === true) {
                localStorage.removeItem('2rp-chave-autenticacao')
                Navigate('/login')
            }
        })
    }

    function Logout() {
        localStorage.removeItem('2rp-chave-autenticacao')
        navigate("/login");
    }

    function click() {
        let details = document.querySelector('.details')
        details.classList.toggle('active')
    }

    useEffect(() => {
        GetMe()
    }, [])
    return (
        <div>
            <div className='header2'>
                <div className='container'>
                    <div className='headerInside2'>
                        <div className='coins'>
                            <img src={Coin} alt="moedas" />
                            <div className='cash'>1000</div>
                        </div>
                        <div className='profile2'>
                            <div className='profile_details'>
                                <img src={"http://grupo7.azurewebsites.net/img/" + myUser.photoUser} className='imgProfile' alt="imagem de perfil" onClick={click} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='details'>
                <div className='profile2'>
                    <div className='profile_details'>
                        <img src={"http://grupo7.azurewebsites.net/img/" + myUser.photoUser} alt="imagem de perfil" />
                        <div className='name_job'>
                            <div className='name'>{myUser.userName1}</div>
                            <div className='job'>{myUser.employees[0].idOfficeNavigation.titleOffice}</div>
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
                <div className='logout' onClick={() => Logout()}>
                    <span alt="botão sair">Sair</span>
                    <HiIcons.HiOutlineLogout id='log_out' />
                </div>

            </div>

        </div>
    );
}
export default Header