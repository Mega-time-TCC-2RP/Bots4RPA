import { Component } from 'react';
import React, { useState, useEffect } from 'react';
import { handleAuthException, parseJwt } from '../../services/auth';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Navbar from '../../components/menu/Navbar'
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useNavigate } from 'react-router-dom';
import Coin from '../../assets/img/coin.png'

//img:
import Azul_Home from '../../assets/img/Azul_Home.png'
import Vermelho_Home from '../../assets/img/Vermelho_Home.png'
import Amarelo_Home from '../../assets/img/Amarelo_Home.png'
import Verde_Home from '../../assets/img/Verde_Home.png'
import Post_Perfil_Photo from '../../assets/img/Post_Perfil_Photo.png'
import Img_Home_Post from '../../assets/img/Img_Home_Post.png'

//css:
import '../../assets/css/components/button.css'
import '../../assets/css/components/fonts.css'
import '../../assets/css/pages/config.css'

//icons:
import * as AiIcons from 'react-icons/ai'
import * as SiIcons from 'react-icons/si'

const steps = [
    {
        id: 'Step1'
    },
    {
        id: 'Step2'
    },
];

const profileCustomStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'var(--WHITE)',
        boxShadow: 'var(--darkShadow)',
        borderRadius: '30px',
        marginLeft: '60px'
    },
};

Modal.setAppElement(':root');

export default function Profile() {
    const Navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [modalConfig, setModalConfig] = useState(false);
    const [trophiesList, setTrophiesList] = useState([]);
    const [skinsList, setSkinsList] = useState([]);
    const [allTrophiesList, setAllTrophiesList] = useState([]);
    const [trophyModalOpen, setTrophyModalOpen] = useState(false);
    const [trophyModal, setTrophyModal] = useState({});
    const [trophyModalNotEarned, setTrophyModalNotEarned] = useState(false);

    function openModalTrophy(e, Trophy, notEarned) {
        e.preventDefault();
        setTrophyModalOpen(true);
        setTrophyModal(Trophy);
        setTrophyModalNotEarned(notEarned);
    }

    function closeModalTrophy(e) {
        e.preventDefault();
        setTrophyModalOpen(false);
    }

    const GetTrohpiesAndSkins = async () => {
        if (parseInt(parseJwt().Role) == 3) {
            await axios.get('http://grupo7.azurewebsites.net/api/UserNames/MyTrophiesAndSkins', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
                }
            }).then((resposta) => {
                setTrophiesList(resposta.data.employees[0].players[0].libraryTrophies)
                setSkinsList(resposta.data.employees[0].players[0].librarySkins)
                console.log(resposta.data.employees[0].players[0]);
            }).catch(async (error) => {
                if (await handleAuthException(error) === true) {
                    localStorage.removeItem('2rp-chave-autenticacao')
                    Navigate('/login')
                }
            })
        }

        await axios.get('http://grupo7.azurewebsites.net/api/Trophies', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
            }
        }).then((resposta) => {
            console.log(resposta.data)
            setAllTrophiesList(resposta.data);
        }).catch(async (error) => {
            if (await handleAuthException(error) === true) {
                localStorage.removeItem('2rp-chave-autenticacao')
                Navigate('/login')
            }
        })
    }

    function select(nextStep) {
        setCurrentStep(nextStep)
        switch (nextStep) {
            case 0:
                document.querySelector('.meusTrofeus').classList.add('selected')
                document.querySelector('.minhasSkins').classList.remove('selected')
                break;
            case 1:
                document.querySelector('.meusTrofeus').classList.remove('selected')
                document.querySelector('.minhasSkins').classList.add('selected')
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        select(0);
        GetTrohpiesAndSkins();
    }, [])

    return (
        <div className='ProfileContainer'>
            <Navbar />
            <div className='configPage body-pd profile'>
                {/* <Header /> */}
                <h1 className='container h2 semi-bold' alt="configurações">Perfil</h1>
                <nav className='navAreaConfig container'>
                    <span className='h3 meusTrofeus' id='meusTrofeus' onClick={() => select(0)}>Meus troféus</span>
                    <span className='h3 minhasSkins' id='minhasSkins' onClick={() => select(1)}>Minhas skins</span>
                </nav>
                <section className='configContent validUser container'>
                    {
                        steps[currentStep].id === 'Step1' && (
                            <div cAcessibilidadelassName='areaStep'>
                                <h5 alt="MeusTrofeus" className="h4 semi-bold margin-ajuste-profile">Meus troféus</h5>
                                <div className='TrophiesContainer'>
                                    {
                                        allTrophiesList.map((Trophy) => {
                                            if (trophiesList.find((T) => T.idTrophyNavigation.idTrophy === Trophy.idTrophy) != null && trophiesList.find((T) => T.idTrophyNavigation.idTrophy === Trophy.idTrophy) != undefined) {
                                                return (
                                                    <button onClick={(e) => openModalTrophy(e, Trophy, false)}>
                                                        <img src={"http://grupo7.azurewebsites.net/img/" + Trophy.trophyImage}></img>
                                                    </button>
                                                )
                                            }
                                            else {
                                                return (
                                                    <button onClick={(e) => openModalTrophy(e, Trophy, true)}>
                                                        <img className='imgAcinzentada' src={"http://grupo7.azurewebsites.net/img/" + Trophy.trophyImage}></img>
                                                    </button>
                                                )
                                            }
                                        })
                                    }
                                </div>
                                <Modal
                                    isOpen={trophyModalOpen}
                                    // onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModalTrophy}
                                    style={profileCustomStyles}
                                    contentLabel="Example Modal"
                                    class="ReactModal"
                                    closeTimeoutMS={2000}
                                >
                                    <div className='ContainerModalTrophiesAlinhamento'>
                                        <div className='ContainerModalTrophies'>
                                            {
                                                trophyModalNotEarned === true ?
                                                    <div>
                                                        <img className='ImgTrophyModalNotEarned' src={"http://grupo7.azurewebsites.net/img/" + trophyModal.trophyImage}></img>
                                                    </div>
                                                    :
                                                    <img src={"http://grupo7.azurewebsites.net/img/" + trophyModal.trophyImage}></img>
                                            }

                                            <div className='TrophyData'>
                                                <h3 className="h4">{trophyModal.title}</h3>
                                                <div className='TrophyDataField'>
                                                    <h4 className="h5 semi-bold">Data de obtenção</h4>
                                                    {
                                                        trophyModalNotEarned === true ?
                                                            <span className="p">Não adquirido</span>
                                                            :
                                                            trophiesList.find((T) => T.idTrophyNavigation.idTrophy === trophyModal.idTrophy) !== undefined ?
                                                                <span className="p">{new Date(trophiesList.find((T) => T.idTrophyNavigation.idTrophy === trophyModal.idTrophy).unlockData).toLocaleDateString('pt-BR')}</span> :
                                                                <span className="p">Carregando...</span>

                                                    }
                                                </div>
                                                <div className='TrophyDataField'>
                                                    <h4 className="h5 semi-bold">Descrição</h4>
                                                    <span className="p">{trophyModal.trophyDescription}</span>
                                                </div>
                                            </div>

                                            <button onClick={(e) => closeModalTrophy(e)}>X</button>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        )
                    }
                    {
                        steps[currentStep].id === 'Step2' && (
                            <div cAcessibilidadelassName='areaStep'>
                                <h5 alt="MinhasSkins" className="h4 semi-bold margin-ajuste-profile">Minhas skins</h5>
                                <div className="TrophiesContainer">
                                    {
                                        skinsList.map((Skin) => {
                                            return (
                                                <div className='skin-profile-card cardPattern'>
                                                    <img src={"http://grupo7.azurewebsites.net/img/" + Skin.idSkinNavigation.skinImages} alt="img robot" />
                                                    <span className='h6 semi-bold'>{Skin.idSkinNavigation.title}</span>
                                                    <span className='p'>{Skin.idSkinNavigation.skinDescription}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                </section>
                <Footer />
            </div >
        </div >
    );
}