import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VLibras from '@djpfs/react-vlibras'
import axios, { Axios } from 'axios';


//Components
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import Navbar from '../../components/menu/Navbar'

//css
import '../../assets/css/pages/dags.css'
import '../../assets/css/components/button.css'
import '../../assets/css/components/fonts.css'

//onboarding
import '../../assets/css/pages/onBoarding.css'
import Modal from 'react-modal';
import Blue_Head from '../../assets/img/Blue_Head.png'
import onBoardingBot from '../../assets/img/onBoardingBot.png'
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const stylesCustom = {
    content: {
        width: 1,
        height: 1,
        // backgroundcolor: rgba(0, 255, 255, 0.75),
        boxShadow: '',
        background: 'none',
        border: 'none'
    },
};

Modal.setAppElement('#root');

export default function Dags() {
    const [dags, setDags] = useState([]);

    //onboarding
    const [onBoardingIsOpen, setOnBoardingIsOpen] = useState(false);

    function handleOpenOnBoarding() {
        setOnBoardingIsOpen(true)
    }
    function handleCloseOnBoarding() {
        setOnBoardingIsOpen(false)
    }


    const ListarDags = (e) => {

    }

    useEffect(() => {
        axios.get('https://grupo7.azurewebsites.net/api/Assistants', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
              }
        })
            .then((response) => {
                // console.log('deu certoooo')
                // console.log(response.data)
                setDags(response.data)
            })

            .catch((err) => {
                console.log('deu errado: ' + err)
            })
        // ListarDags();
    }, [])


    return (

        <div>
            <Navbar />
            <VLibras />
            <img
                src={onBoardingBot}
                onClick={handleOpenOnBoarding}
                className="img-onboarding"
            />
            <Modal
                isOpen={onBoardingIsOpen}
                onRequestClose={handleCloseOnBoarding}
                style={stylesCustom}
            >
                <div className="top-container-onboarding" >
                    <div className="background-body" >
                        <div className="boarding-image">
                            <img className="bot-img" src={Blue_Head} />
                        </div>
                        <div className="body-content">
                            <h2 className="h2">Assistente</h2>
                            <Swiper
                                pagination={{
                                    type: "fraction",
                                }}
                                navigation={true}
                                modules={[Pagination, Navigation]}

                                className="swiperHomeTasks-social"
                            >
                                <SwiperSlide className="swiper-slide-OnBoarding-social">
                                    <div className="boardingContainer">
                                        <span className='p textoBonito'>Aqui é a Tela de Registros!</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide-OnBoarding-social">
                                    <div className="boardingContainer">
                                        <span className='p textoBonito'>Todas as informações gerais e básicas sobre seu assistente, você encontra aqui!</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide-OnBoarding-social">
                                    <div className="boardingContainer">
                                        <span className='p textoBonito'>Quantas vezes executados, quando ocorreu o último lançamento dele, e coisas afins!</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide-OnBoarding-social">
                                    <div className="boardingContainer">
                                        <span className='p textoBonito'>Ser simples e direto com seus assistentes</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide-OnBoarding-social">
                                    <div className="boardingContainer">
                                        <span className='p textoBonito'>Em um lugar só, com todas as informações que você precisa!</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide-OnBoarding-social">
                                    <div className="boardingContainer">
                                        <span className='p textoBonito'>Sinta-se a vontade para checar os dados de suas criações!</span>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </Modal>
            <div className='dags-header'>
                <span className='h1'>Registros</span>
            </div>
            {/* //body-dags */}
            <div className='dags-body'>
                <div className='dags-conteiner'>

                    <div className='tabela-dags'>
                        <table style={{ borderRadius: 30 }}
                        // border='1'
                        >
                            <thead>
                                <th className='center-dags'>Nome</th>
                                <th>Nome do Assistente</th>
                                <th>Data de criação</th>
                                <th>Último Lançamento</th>
                                <th>Percentual de sucesso(%)</th>
                                <th>Vezes Lançadas(total)</th>
                            </thead>
                            <tbody>
                                {dags?.map((dag, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className='center-dags'>{dag.employeeName}</td>
                                            <td>{dag.assistantName}</td>
                                            {
                                                dag.assistantCreationDate !== undefined ?
                                                <td>{new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(dag.assistantCreationDate.split('T')[0]))}</td> :
                                                <td>Carregando</td>
                                            }
                                            {
                                                dag.lastRunDate !== undefined ?
                                                <td>{new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(dag.lastRunDate.split('T')[0]))}</td> :
                                                <td>Carregando</td>
                                            }
                                            <td>{dag.succesPercentage}%</td>
                                            <td>{dag.runsCount} Vezes</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
            <Footer />
        </div>
    )

}