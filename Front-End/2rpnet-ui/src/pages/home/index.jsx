import "../../assets/css/style.css";
import '../../assets/css/components/fonts.css'
import "../../assets/css/components/navbar.css"
import { Component } from 'react';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

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
import { API } from "../../services/api";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usuarioAutenticado, parseJwt, handleAuthException } from '../../services/auth';

//img:
import Azul_Home from '../../assets/img/Azul_Home.png'
import Post_Perfil_Photo from '../../assets/img/Post_Perfil_Photo.png'
import Img_Home_Post from '../../assets/img/Img_Home_Post.png'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/header'

//items:
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

//Components:
// import Navbar from '../../components/menu/Navbar'
import ModalM from '../../components/modal/Modal'
import Footer from '../../components/footer/footer'
import { render } from "@testing-library/react";

//onboarding
import '../../assets/css/pages/onBoarding.css'
import Blue_Head from '../../assets/img/Blue_Head.png'
import onBoardingBot from '../../assets/img/onBoardingBot.png'
import noPhoto from '../../assets/img/no-image.png'
import { setRef } from "@material-ui/core";

{/* <Navbar/> */ }

const stylesCustom = {
  content: {
    width: 1,
    height: 1,
    boxShadow: '',
    background: 'none',
    border: 'none'
    // backgroundcolor: rgba(0, 255, 255, 0.75),
  },
};

Modal.setAppElement('#root');

export default function Home() {

  const [isExecuting, setIsExecuting] = useState(false);

  const [ListAssistants, setListAssistants] = useState([])
  const [AssistantsList, setAssistantsList] = useState([]);

  const handleChange = ({ target }) => {
    if (!target.value) {
      setAssistantsList(ListAssistants);
      return;
    }
    const filterAssistants = AssistantsList.filter(({ assistantName }) => assistantName.toLowerCase().includes(target.value.toLowerCase()));
    setAssistantsList(filterAssistants)
  }

  function Execute(idAssistant) {
    setIsExecuting(true);
    var getURL = API + "/api/AssistantProcedure/Assistant/" + idAssistant;
    fetch(getURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
      },
    })
      .then((response) => {
        return response.json()
          .then((data) => {
            // console.log(data);
            data.map((procedure) => {
              console.log(procedure);
              console.log(procedure.procedureName);

              if (procedure.procedureName == "Enviar email para alguem") {
                var splitEmail = procedure.procedureValue.split("/");
                console.log(splitEmail);

                var epURL = API + "/api/Assistants/EnviarEmailUsuario";
                var epBody = JSON.stringify({
                  "emailTitle": splitEmail[1],
                  "email": splitEmail[0],
                  "emailBody": splitEmail[2]
                });

                fetch(epURL, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
                  },
                  body: epBody
                })
                  .then((response) => {
                    // console.log("before if");
                    console.log(response)
                    if (response.status === 200) {
                      console.log("FUNCIONOU");
                      toast.success("O email que você escreveu foi enviado");

                    } else {
                      toast.error("Houve um problema no enviuo de seu email :/");

                    }
                    setIsExecuting(false);
                  })
                  .catch((erro) => {
                    console.log(erro)
                    toast.error("Houve um problema no enviuo de seu email :/");
                    setIsExecuting(false);
                  })
              }
            })
          })
      });

    var eURL = API + "/api/Assistant" + idAssistant + "/Post";
    var eBody = JSON.stringify({
      "emailTitle": "",
      "email": parseJwt().email,
      "emailBody": `http://vmbots4rpa.brazilsouth.cloudapp.azure.com:5000/StaticFiles/Images/Assistant${idAssistant}.png`
    });

    fetch(eURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
      },
      body: eBody
    })
      .then((response) => {
        // console.log("before if");
        // console.log(response)
        if (response.status === 204) {

          console.log("FUNCIONOU");
          toast.success("O resultado foi enviado para seu email");
          var myUrl = API + "/api/Run/" + idAssistant
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
            },
            body: JSON.stringify({ "runStatus": true })
          };

          fetch(myUrl, requestOptions)
            .then(response => {
              if (response.status === 201) {
                // console.log(response)
                return response.json()
                  .then(data => {
                    console.log(data)
                  })
              }
            }).catch(error => console.log(error))

          Refresh()

        } else {
          toast.error("A execução deu errado :/");
          var myUrl = "http://localhost:5000/api/Run/" + idAssistant
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
            },
            body: JSON.stringify({ "runStatus": false })
          };

          fetch(myUrl, requestOptions)
            .then(response => {
              if (response.status === 201) {
                // console.log(response)
                return response.json()
                  .then(data => {
                    console.log(data)
                  })
              }
            }).catch(error => console.log(error))
          // window.location.href = "http://localhost:3000/home"
          Refresh()
        }
        setIsExecuting(false);
      })
      .catch((erro) => {
        console.log(erro)
        toast.error("A execução deu errado :/");
        setIsExecuting(false);
      })
  }
  // Gambiarra para o método atualizar bonitinho
  function Refresh() {
    setTimeout(function () {
      window.location.href = "http://localhost:3000/home";
    }, 7000);
  }

  function GetAssistant() {
    console.log('getAssistant')
    fetch(API + '/api/Assistants/Employee/' + parseJwt().idEmployee, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao'),
      },
    })
      .then((response) => response.json())
      .then((data) =>
        setListAssistants(data),
      )
      .catch((error) => console.log(error));
  };

  function GetMyAssistants() {
    console.log('Função GetAssistants da Home')
    fetch('http://grupo7.azurewebsites.net/api/LibraryAssistants', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao'),
      },
    })
      .then((response) => response.json())
      .then((data) =>{

        console.log(data)
        setAssistantsList(data)
      }
      )
      .catch((error) => console.log(error));
  };

  // Open Modal to create assistant
  function OpenModalAssistant() {
    var modalA = document.getElementById("modalAssistant");
    modalA.style.display = "flex";
  };

  // Open Assistant details modal
  function OpenModal(idAssistant) {
    var modal = document.getElementById("modal" + idAssistant);
    // console.log(modal)
    modal.style.display = "flex";
  };

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
    if (parseJwt().Role != "1") {
      axios.get('http://grupo7.azurewebsites.net/api/Workflows/GetMine', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
        }
      }).then((response) => {
        // console.log(response)
        // console.log(response.data)
        setMyQuests(response.data)
      }).catch(async (error) => {
        if (await handleAuthException(error) === true) {
          localStorage.removeItem('2rp-chave-autenticacao')
          Navigate('/login')
          console.log(error.status);
        }
      })
    }
    else {
      axios.get('http://grupo7.azurewebsites.net/api/Workflows', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
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
  }

  const GetHighlightedPosts = () => {
    axios.get('https://grupo7.azurewebsites.net/api/Posts/Highlights', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
      }
    }).then((response) => {
      // console.log(response)
      // console.log(response.data)
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
    GetMyQuests();
    GetHighlightedPosts();
    GetMyAssistants();
    GetAssistant();
  }, [])

  return (
    <div>

      <Navbar />
      <Header />
      <div className='body-pd'>


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
                <input className="Input-Home" type='search' placeholder="Buscar assistente" onChange={handleChange} id="Assistente"></input>
              </form>
            </div>
            <form className="nao">


              <div className="cards-container">
                {AssistantsList.map((assistant) => {
                  return (
                    <div className="containerSmodal">
                      <ModalM assistant={assistant.idAssistantNavigation} />
                      <div className="card1">

                        <img onClick={() => { Navigate("/assistant", { state: { id: assistant.idAssistant } }) }} src={Azul_Home} className="card1-img" />
                        <div className="container-AssistantName">
                          <h5>{assistant.idAssistantNavigation.assistantName}</h5>
                        </div>
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
          <h2 className="body-title-task h2">Minhas Tarefas</h2>
          {
            window.screen.width >= 768 ?
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                slidesPerGroup={1}
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
                    myQuests.map((Workflow) => {
                      return (
                        <SwiperSlide className="swiper-slide-HomeTasks">
                          <div className="card-body-content cardPattern">
                            <h3 className="title-card-content h4">{Workflow.title}</h3>
                            <p className="text-body1 p">{Workflow.workflowDescription}</p>
                            {/* <p className="data-body">Data de entrega : {new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(Workflow.endDate))}</p> */}
                          </div>
                        </SwiperSlide>
                      )
                    }) :
                    <SwiperSlide className="swiper-slide-HomeTasks">
                      <span>Não há tarefas...</span>
                    </SwiperSlide>
                }
              </Swiper> :
              <Swiper
                // slidesPerView={1}
                // spaceBetween={0}
                // slidesPerGroup={1}
                // loop={false}
                // loopFillGroupWithBlank={true}
                // pagination={{
                //   clickable: true,
                // }}
                // navigation={true}
                // modules={[Pagination, Navigation]}
                pagination={{
                  clickable: true
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="swiperHomeTasks"
              >
                {
                  myQuests != undefined && myQuests != null && myQuests[0] != undefined && myQuests[0] != null ?
                    myQuests.map((Workflow) => {
                      return (
                        <SwiperSlide className="swiper-slide-HomeTasks">
                          <div className="card-body-content cardPattern">
                            <h3 className="title-card-content h4">{Workflow.title}</h3>
                            <p className="text-body1 p">{Workflow.workflowDescription}</p>
                            {/* <p className="data-body">Data de entrega : {new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(Workflow.endDate))}</p> */}
                          </div>
                        </SwiperSlide>
                      )
                    }) :
                    <SwiperSlide className="swiper-slide-HomeTasks">
                      <span>Não há tarefas...</span>
                    </SwiperSlide>
                }
              </Swiper>
          }
        </div>
        <div className="bottom-container">
          <h2 className="body-title-task h2">Posts em destaque</h2>
          {
            window.screen.width >= 768 ?
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
                          <Link to='/social'><div className="bottom-posts-content cardPattern">
                            <div className="chatListItem--lines">
                              <img src={"http://grupo7.azurewebsites.net/img/" + post.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.photoUser} className="ItemPost-avatar" />
                              <div className="chatItemList-line">
                                <div className="PostItem-name h5">{post.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.userName1}</div>
                                <p className="PostItem-role p">{post.idPlayerNavigation.idEmployeeNavigation.idOfficeNavigation.titleOffice}</p>
                              </div>
                            </div>
                            {
                              post.postImage != undefined ?
                                <div className="img2-home-bottom-container" style={{ background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.80), rgba(255, 255, 255, 0.80)), url(http://grupo7.azurewebsites.net/img/' + post.postImage + ')' }}><img className="img2-home-bottom" src={"http://grupo7.azurewebsites.net/img/" + post.postImage} /></div> :
                                <img className="img2-home-bottom" src={noPhoto}></img>
                            }
                            <h2 className="TituloPostDestaque h5">{post.title}</h2>
                            <p className="post-text-bottom-home p">{post.postDescription}</p>
                          </div></Link>
                        </SwiperSlide>
                      )
                    }) :
                    <span>Não há posts em destaque</span>
                }
              </Swiper> :
              <Swiper
                // slidesPerView={2}
                // spaceBetween={0}
                // slidesPerGroup={2}
                // loop={false}
                // loopFillGroupWithBlank={true}
                // pagination={{
                //   clickable: true,
                // }}
                // navigation={true}
                // modules={[Pagination, Navigation]}
                pagination={{
                  clickable: true
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
                          <div className="bottom-posts-content cardPattern">
                            <div className="chatListItem--lines">
                              <img src={"http://grupo7.azurewebsites.net/img/" + post.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.photoUser} className="ItemPost-avatar" />
                              <div className="chatItemList-line">
                                <div className="PostItem-name h5">{post.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.userName1}</div>
                                <p className="PostItem-role p">{post.idPlayerNavigation.idEmployeeNavigation.idOfficeNavigation.titleOffice}</p>
                              </div>
                            </div>
                            {
                              post.postImage != undefined ?
                                <div className="img2-home-bottom-container" style={{ background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.80), rgba(255, 255, 255, 0.80)), url(http://grupo7.azurewebsites.net/img/' + post.postImage + ')' }}><img className="img2-home-bottom" src={"http://grupo7.azurewebsites.net/img/" + post.postImage} /></div> :
                                <img className="img2-home-bottom" src={noPhoto}></img>
                            }
                            <h2 className="TituloPostDestaque h5">{post.title}</h2>
                            <p className="post-text-bottom-home p">{post.postDescription}</p>
                          </div>
                        </SwiperSlide>
                      )
                    }) :
                    <span>Não há posts em destaque</span>
                }
              </Swiper>
          }

        </div >
        <Footer />
      </div>
    </div>
  );
}
