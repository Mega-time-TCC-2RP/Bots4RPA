import React, { Component, useState, useEffect } from 'react'
import { render } from '@testing-library/react'
import { Link, useNavigate, Navigate, } from 'react-router-dom'
import Profile from '../../assets/img/profile.jpg'
import Coin from '../../assets/img/coin.png'
import '../../assets/css/components/header.css'
import * as HiIcons from 'react-icons/hi'
import axios from 'axios'
import { handleAuthException, parseJwt } from '../../services/auth'

export const Header = () => {
    const [myUser, setMyUser] = useState({});
    const [nullUndefinedParams, setNullUndefinedParams] = useState({});

    let navigate = useNavigate();

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
                Navigate('/login')
            }
        })
    }

    function GoToProfile() {
        navigate("/profile");
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
        const effect = async () => {
            // console.log(parseJwt());
            await GetMe();
        }
        effect();
    }, []);

    if (parseJwt().Role == "3") {
        return (
            <div>
                <div className='header2'>
                    <div className='container'>
                        <div className='headerInside2'>
                            
                            <div className='profile2'>
                                <div className='profile_details'>
                                    {
                                        myUser != nullUndefinedParams ?
                                            <img src={"http://grupo7.azurewebsites.net/img/" + myUser.photoUser} className='imgProfile' alt="imagem de perfil" onClick={click} /> :
                                            <img className='imgProfile' alt="imagem de perfil" onClick={click} />
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='details'>
                    <div className='profile2'>
                        {
                            myUser != nullUndefinedParams ?
                                <div className='profile_details'>
                                    <img onClick={(e) => GoToProfile()} src={"http://grupo7.azurewebsites.net/img/" + myUser.photoUser} alt="imagem de perfil" />
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
                    <ul>
                        <li>
                            <Link to="/profile" className='Link'>
                                <span className='Links_name' alt="botão acessar conquistas">Acessar Consquistas</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className='Link'>
                                <span className='Links_name' alt="botão acessar skins">Acessar Skins</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className='Link'>
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
    else if(parseJwt().Role == "2"){
        return (
            <div>
                <div className='header2'>
                    <div className='container'>
                        <div className='headerInside2'>
                            <div className='profile2'>
                                <div className='profile_details'>
                                    {
                                        myUser != nullUndefinedParams ?
                                            <img src={"http://grupo7.azurewebsites.net/img/" + myUser.photoUser} className='imgProfile' alt="imagem de perfil" onClick={click} /> :
                                            <img className='imgProfile' alt="imagem de perfil" onClick={click} />
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='details'>
                    <div className='profile2'>
                        {
                            myUser != nullUndefinedParams ?
                                <div className='profile_details'>
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
                    <div className='logout' onClick={() => Logout()}>
                        <span alt="botão sair" style={{marginTop: 25, marginBottom: 25}}>Sair</span>
                        <HiIcons.HiOutlineLogout id='log_out' />
                    </div>

                </div>
            </div>
        );
    }
    else{
        return (
            <div>
                <div className='header2'>
                    <div className='container'>
                        <div className='headerInside2'>
                            <div className='profile2'>
                                <div className='profile_details'>
                                    {
                                        myUser != nullUndefinedParams ?
                                            <img src={"http://grupo7.azurewebsites.net/img/" + myUser.photoUser} className='imgProfile' alt="imagem de perfil" onClick={click} /> :
                                            <img className='imgProfile' alt="imagem de perfil" onClick={click} />
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='details'>
                    <div className='profile2'>
                        {
                            myUser != nullUndefinedParams ?
                                <div className='profile_details'>
                                    <img src={"http://grupo7.azurewebsites.net/img/" + myUser.photoUser} alt="imagem de perfil" />
                                    <div className='name_job'>
                                        <div className='name'>{myUser.userName1}</div>
                                        {
                                                <div className='job'>Cargo indefinido</div>
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
                    <div className='logout' onClick={() => Logout()}>
                        <span alt="botão sair" style={{marginTop: 25, marginBottom: 25}}>Sair</span>
                        <HiIcons.HiOutlineLogout id='log_out' />
                    </div>

                </div>
            </div>
        );
    }
}
export default Header