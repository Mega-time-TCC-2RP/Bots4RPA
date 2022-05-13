import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import Navbar from '../../components/menu/Navbar'
import skin from '../../assets/img/Robo.png'
import Coin from '../../assets/img/coin.png'
import '../../assets/css/pages/skinShop.css'
import '../../assets/css/pages/workflow.css'
import VLibras from '@djpfs/react-vlibras'
import { useEffect, useState } from 'react'

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
      boxShadow: ''
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');


export default function Marketplace() {

    const [onBoardingIsOpen, setOnBoardingIsOpen] = useState(false);

    function handleOpenOnBoarding() {
        setOnBoardingIsOpen(true)
    }
    function handleCloseOnBoarding() {
        setOnBoardingIsOpen(false)
    }

    return (
        <div id='all'>
            <Header/>
            <Navbar/>
            <VLibras/>
            <img 
                    src={onBoardingBot} 
                    onClick={handleOpenOnBoarding} 
                    className="img-onbo     arding"
                />
                <Modal
                    isOpen={onBoardingIsOpen}
                    onRequestClose={handleCloseOnBoarding}
                    style={stylesCustom}
                >
                    <div className="top-container" >
                        <div className="background-body" >
                            <div className="boarding-image">
                                <img className="bot-img" src={Blue_Head} />
                            </div>
                            <div className="body-content">
                                <h2>Assistente</h2>
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
                                        <span className='bayer'>Sinta-se a vontade a tela de Tarefas!</span>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide-OnBoarding">
                                        <div className="boardingContainer">
                                            <span className='bayer'>Aqui é onde você poderá ver o desenvolvimento de tarefas, tanto as pessoais, quanto a dos seus assistentes!</span>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide-OnBoarding">
                                        <div className="boardingContainer">
                                            <span className='bayer'>Cada tarefa contém um título, descrição, tempo de entrega, dias de execução e, logicamente, a lista de tarefas.</span>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide-OnBoarding">
                                        <div className="boardingContainer">
                                            <span className='bayer'>Visualize a sequência de ações que o seu assistente está realizando, e tarefas que você mesmo poderá criar!</span>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide-OnBoarding">
                                        <div className="boardingContainer">
                                            <span className='bayer'>Organize seu dia-a-dia com este Painel Organizacional, e você nunca mais ficará perdido.</span>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>

                        </div>
                    </div>
                </Modal>
            <div className='container2'>
            <div className='Titulo_inputs'>
                <h1 id='titulo'>Loja de Assistentes</h1>
            <div className='filtragem_Busca'>
                <input className="input"
                        name="Buscar Skins.."
                        placeholder="Buscar Skins.."
                    />
                <select className='input' name="select">
                    <option value="valor1">Mais caras</option>
                    <option value="valor2" selected>Mais baratas</option>
                    <option value="valor3">Personalizadas</option>
                </select>  
            </div>
            </div>
            
            
            <div className='lista2'>
            <div className='workflow'>
                <div className='assistent'>
                <img src={skin} alt="img robot"/>
                <span className='nameRobot'>Bôbotron Limão</span>
                </div>
                <div className='descriptionDtails'>
                <div className='description'>
                    <span id='descrição'>Descrição do assistente</span>
                    <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta urna nec leo ornare blandit. In ornare, tortor in aliquet mollis, diam nibh cursus eros, sed venenatis ex urna quis mi. Morbi ultricies ut sapien vel congue. Pellentesque eu sodales justo, et accumsan erat. Nullam eu eros vel sem volutpat fringilla. Mauris interdum erat nibh, sed porttitor eros molestie vitae.</text>
                </div>

                <div className='coinDetails'>
                <div className ='details3'>
                    
                    <span>Adquirir</span>
                </div>
                <div className='details2'>
                <span >ver detalhes</span>
                </div>
                </div>
                </div>

            </div>
            <div className='workflow'>
                <div className='assistent'>
                <img src={skin} alt="img robot"/>
                <span className='nameRobot'>Bôbotron Limão</span>
                </div>
                <div className='descriptionDtails'>
                <div className='description'>
                    <span id='descrição'>Descrição do assistente</span>
                    <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta urna nec leo ornare blandit. In ornare, tortor in aliquet mollis, diam nibh cursus eros, sed venenatis ex urna quis mi. Morbi ultricies ut sapien vel congue. Pellentesque eu sodales justo, et accumsan erat. Nullam eu eros vel sem volutpat fringilla. Mauris interdum erat nibh, sed porttitor eros molestie vitae.</text>
                </div>

                <div className='coinDetails'>
                <div className ='details3'>
                    <span>Adquirir</span>
                </div>
                <div className='details2'>
                <span >ver detalhes</span>
                </div>
                </div>
                </div>

            </div>
            <div className='workflow'>
                <div className='assistent'>
                <img src={skin} alt="img robot"/>
                <span className='nameRobot'>Bôbotron Limão</span>
                </div>
                <div className='descriptionDtails'>
                <div className='description'>
                    <span id='descrição'>Descrição do assistente</span>
                    <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta urna nec leo ornare blandit. In ornare, tortor in aliquet mollis, diam nibh cursus eros, sed venenatis ex urna quis mi. Morbi ultricies ut sapien vel congue. Pellentesque eu sodales justo, et accumsan erat. Nullam eu eros vel sem volutpat fringilla. Mauris interdum erat nibh, sed porttitor eros molestie vitae.</text>
                </div>

                <div className='coinDetails'>
                <div className ='details3'>
                   <span>Adquirir</span>
                </div>
                <div className='details2'>
                    <span >ver detalhes</span>
                </div>
                </div>
                </div>

            </div>
            
            </div>
            
            </div>


            
            <Footer />
        </div>
    );
} 