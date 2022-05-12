import "../../assets/css/style.css";
import "../../assets/css/components/navbar.css"
import { Component } from 'react';
import React, { useState, useEffect } from 'react';


// import Swiper, { Navigation, Pagination } from 'swiper';
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

//imports da manhã
import ModalA from '../../components/modal/ModalAssistant'
import PlayIcon from '../../components/icones/play'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../components/menu/Navbar'
import VLibras from '@djpfs/react-vlibras'

//img:
import Azul_Home from '../../assets/img/Azul_Home.png'
import Vermelho_Home from '../../assets/img/Vermelho_Home.png'
import Amarelo_Home from '../../assets/img/Amarelo_Home.png'
import Verde_Home from '../../assets/img/Verde_Home.png'
import Post_Perfil_Photo from '../../assets/img/Post_Perfil_Photo.png'
import Img_Home_Post from '../../assets/img/Img_Home_Post.png'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/header'

//items
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';


//Components:
import Footer from '../../components/footer/footer'

//onboarding
import '../../assets/css/pages/onBoarding.css'
import Modal from 'react-modal';
import Blue_Head from '../../assets/img/Blue_Head.png'
import onBoardingBot from '../../assets/img/onBoardingBot.png'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usuarioAutenticado, parseJwt, handleAuthException } from '../../services/auth';

const stylesCustom = {
  content: {
    width: 1,
    height: 1,
    // backgroundcolor: rgba(0, 255, 255, 0.75),
    boxShadow: ''
  },
};

Modal.setAppElement('#root');

function App() {
  const [AssistantsList, setAssistantsList] = useState([]);
  const [ExecutionsList, setExecutionsList] = useState([]);

  const [isExecuting, setIsExecuting] = useState(false);

  function Execute(idAssistant) {
    setIsExecuting(true);

    var myURL = "http://localhost:5000/api/AssistantProcedure/ManipulateScript/" + idAssistant;

    fetch(myURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        console.log("before if");
        if (response.status === 201) {
          console.log("FUNCIONOU");
          toast.success("O resultado foi enviado para seu email");
          setIsExecuting(false);
        } else {
          toast.error("A execução deu errado :/");
          setIsExecuting(false);
        }
      })
      .catch((erro) => {
        console.log(erro)
        toast.error("A execução deu errado :/");
        setIsExecuting(false);
      })
  }

  function GetMyAssistants() {
    fetch('http://localhost:5000/api/Assistants', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao'),
      },
    })
      .then((response) => response.json())
      .then((data) =>
        setAssistantsList(data)
        // console.log(data)
      )
      .catch((error) => console.log(error));
  };

  useEffect(GetMyAssistants, [])


  // Open Modal to create assistant
  function OpenModalAssistant() {
    var modalA = document.getElementById("modalAssistant");
    // console.log(modalA)
    modalA.style.display = "flex";
  };

  // Open Assistant details modal
  function OpenModal(idAssistant) {
    var modal = document.getElementById("modal" + idAssistant);
    // console.log(modal)
    modal.style.display = "flex";
  };

  // Close Assistant details modal
  function CloseModal(idAssistant) {
    var modal = document.getElementById("modal" + idAssistant);
    // console.log(id)
    modal.style.display = "none";
  };

  // Close Modal to create assistant
  function CloseModalAssistant() {
    var modalA = document.getElementById("modalAssistant");
    // console.log(id)
    modalA.style.display = "none";
  }

  //----------------------------------------------------------------------
  const [myQuests, setMyQuests] = useState([]);
  const [highlightedPosts, setHighlightedPosts] = useState([]);
  const Navigate = useNavigate();

  //onboarding
  const [onBoardingIsOpen, setOnBoardingIsOpen] = useState(false);

  function handleOpenOnBoarding() {
    setOnBoardingIsOpen(true)
  }
  function handleCloseOnBoarding() {
    setOnBoardingIsOpen(false)
  }
  //onboarding

  const GetMyQuests = () => {
    axios.get('http://grupo7.azurewebsites.net/api/Quests/ListarMinhas', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
      }
    }).then((response) => {
      console.log(response)
      console.log(response.data)
      setMyQuests(response.data)
    }).catch(async (error) => {
      if (await handleAuthException(error) === true) {
        localStorage.removeItem('2rp-chave-autenticacao')
        Navigate('/login')
        console.log(error.status);
      }
    })
  }

  const GetHighlightedPosts = () => {
    axios.get('http://grupo7.azurewebsites.net/api/Posts/Highlights', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
      }
    }).then((response) => {
      console.log(response)
      console.log(response.data)
      setHighlightedPosts(response.data)
    }).catch(async (error) => {
      if (await handleAuthException(error) === true) {
        localStorage.removeItem('2rp-chave-autenticacao')
        Navigate('/login')
        console.log(error.status);
      }
    })
  }

  useEffect(() => {
    console.log(parseJwt())
    GetMyQuests();
    GetHighlightedPosts();
  }, [])
  return (
    <div>

      <Navbar />
      <div className='body-pd'>
        
        <Header />
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
                      <span className='bayer'>Seja bem-vindo(a) à sua tela inicial!</span>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide-OnBoarding">
                    <div className="boardingContainer">
                      <span className='bayer'>Note que nesta parte, temos diversas seções que já levam ao seus interesses!</span>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide-OnBoarding">
                    <div className="boardingContainer">
                      <span className='bayer'>Gostaria de executar um assistente? Ver suas Tarefas? Ou ver as questões mais em alta na área Social?</span>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide-OnBoarding">
                    <div className="boardingContainer">
                      <span className='bayer'>Você pode ir direto para cada um deles, sem nenhum problema!</span>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide-OnBoarding-social">
                    <div className="boardingContainer">
                      <span className='bayer'>Começar aqui, é sempre perfeito para estar por dentro de tudo ao mesmo tempo.</span>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide-OnBoarding-social">
                    <div className="boardingContainer">
                      <span className='bayer'>Entre e se divirta!</span>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>

            </div>
          </div>
        </Modal>
        <div className="top-container">
          <div className="top-buttons">
            <div className="form-container">
              <form className="form-home">
                <ModalA />
                <button className="button-assistant"
                  onClick={(event) => {
                    event.preventDefault()
                    OpenModalAssistant()
                  }}
                >Criar Assistente
                </button>
                <input className="Input-Home" type='search' placeholder="Buscar assistente" id="Assistente"></input>
              </form>
            </div>
            <form className="nao">
              <div className="movieRow-left">
                <NavigateBeforeIcon style={{ fontSize: 150, color: '#8D8D8D', }} />
              </div>
              <div className="movieRow-right">
                <NavigateNextIcon style={{ fontSize: 150, color: '#8D8D8D', }} />
              </div>

              <div className="cards-container">
                {AssistantsList.map((assistant) => {
                  return (
                    <div className="containerSmodal">
                      <Modal assistant={assistant} />
                      <div className="card1">

                        <img onClick={() => { Navigate("/assistant", { state: { id: assistant.idAssistant } }) }} src={Azul_Home} className="card1-img" />
                        <h5>{assistant.assistantName}</h5>
                        {
                          isExecuting === false ? (
                            <button onClick={(event) => {
                              event.preventDefault()
                              Execute(assistant.idAssistant)
                            }}>
                              <PlayIcon />
                            </button>
                          ) : (
                            <button disabled onClick={(event) => {
                              event.preventDefault()
                              Execute(assistant.idAssistant)
                            }}>
                              <FontAwesomeIcon icon={faSpinner} size="lg" spin />
                            </button>
                          )
                        }
                        <div className="box-details">
                          <button
                            onClick={(event) => {
                              event.preventDefault()
                              OpenModal(assistant.idAssistant)
                            }}
                          >Ver detalhes
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}

              </div>
            </form>
          </div>
        </div >
        <div className="body-container">
          <h2 className="body-title-task">Minhas Tarefas</h2>
          <Swiper
            slidesPerView={2}
            spaceBetween={0}
            slidesPerGroup={2}
            loop={false}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="swiperHomeTasks"
          >
            {
              myQuests != undefined && myQuests != null && myQuests[0] != undefined && myQuests[0] != null ?
                myQuests.map((Quest) => {
                  return (
                    <SwiperSlide className="swiper-slide-HomeTasks">
                      <div className="card-body-content">
                        <h3 className="title-card-content">Título</h3>
                        <p className="text-body1">{Quest.descriptionQuest}</p>
                        <p className="data-body">Data de entrega : {new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(Quest.dateHour))}</p>
                      </div>
                    </SwiperSlide>
                  )
                }) :
                <SwiperSlide className="swiper-slide-HomeTasks">
                  <span>Não há tarefas...</span>
                </SwiperSlide>
            }
          </Swiper>
        </div>
        <div className="bottom-container">
          <h2 className="body-title-task">Posts em destaque</h2>
          <Swiper
            slidesPerView={2}
            spaceBetween={0}
            slidesPerGroup={2}
            loop={false}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="swiperHomeTasks"
          >
            {
              highlightedPosts != undefined && highlightedPosts != null && highlightedPosts[0] != undefined && highlightedPosts[0] != null ?
                highlightedPosts.map((post) => {
                  return (
                    <SwiperSlide className="swiper-slide-HomeTasks">
                      <div className="bottom-posts-content">
                        <div className="chatListItem--lines">
                          <img src={"http://grupo7.azurewebsites.net/img/" + post.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.photoUser} className="ItemPost-avatar" />
                          <div className="chatItemList-line">
                            <div className="PostItem-name">{post.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.userName1}</div>
                            <p className="PostItem-role">{post.idPlayerNavigation.idEmployeeNavigation.idOfficeNavigation.titleOffice}</p>
                          </div>
                        </div>
                        {
                          post.postImage != undefined ?
                            <img className="img2-home-bottom" src={"http://grupo7.azurewebsites.net/img/" + post.postImage}></img> :
                            <p className="TextoNaoHaImagemPost">Não há uma imagem para ilustrar esse post :(</p>
                        }
                        <h2 className="TituloPostDestaque">{post.title}</h2>
                        <p className="post-text-bottom-home">{post.postDescription}</p>
                      </div>
                    </SwiperSlide>
                  )
                }) :
                <span>Não há posts em destaque</span>
            }
          </Swiper>
        </div>

        <Footer />
      </div>
    </div >
  );
}

export default App;