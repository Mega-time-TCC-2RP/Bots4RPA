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
        axios.get('https://62966746810c00c1cb75379c.mockapi.io/api/v1/dags')
            .then((response) => {
                setDags(response.data)
            })

            .catch(() => {
                console.log('deu errado')
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
                                        <span className='p textoBonito'>Seja bem-vindo(a) à sua tela inicial!</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide-OnBoarding-social">
                                    <div className="boardingContainer">
                                        <span className='p textoBonito'>Note que nesta parte, temos diversas seções que já levam ao seus interesses!</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide-OnBoarding-social">
                                    <div className="boardingContainer">
                                        <span className='p textoBonito'>Gostaria de executar um assistente? Ver suas Tarefas?</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide-OnBoarding-social">
                                    <div className="boardingContainer">
                                        <span className='p textoBonito'>Ou ver as questões mais em alta na área Social?</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide-OnBoarding-social">
                                    <div className="boardingContainer">
                                        <span className='p textoBonito'>Você pode ir direto para cada um deles, sem nenhum problema!</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide-OnBoarding-social">
                                    <div className="boardingContainer">
                                        <span className='p textoBonito'>Começar aqui, é sempre perfeito para estar por dentro de tudo ao mesmo tempo.</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide-OnBoarding-social">
                                    <div className="boardingContainer">
                                        <span className='p textoBonito'>Entre e se divirta!</span>
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
                                <th>Vezes Lançadas(total)</th>
                                
                                <th>Data</th>
                                <th>Último Lançamento</th>
                                <th>Duração</th>
                            </thead>
                            <tbody>
                                {dags?.map((dag, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className='center-dags'>{dag.Nome}</td>
                                            <td>{dag.VezesLancadas}</td>
                                            
                                            <td>{dag.Data}</td>
                                            <td>{dag.UltimoLancamento}</td>
                                            <td>{dag.Duracao}</td>
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