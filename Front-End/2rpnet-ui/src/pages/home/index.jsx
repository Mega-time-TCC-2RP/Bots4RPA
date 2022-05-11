import "../../assets/css/style.css";
import "../../assets/css/components/navbar.css"
import { Component } from 'react';
import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../components/menu/Navbar'
import VLibras from '@djpfs/react-vlibras'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usuarioAutenticado, parseJwt, handleAuthException } from '../../services/auth';

//img:
import Azul_Home from '../../assets/img/Azul_Home.png'
import Vermelho_Home from '../../assets/img/Vermelho_Home.png'
import Amarelo_Home from '../../assets/img/Amarelo_Home.png'
import Verde_Home from '../../assets/img/Verde_Home.png'
import Post_Perfil_Photo from '../../assets/img/Post_Perfil_Photo.png'
import Img_Home_Post from '../../assets/img/Img_Home_Post.png'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/header'

//items:
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import PlayIcon from '../../components/icones/play'

//Components:
// import Navbar from '../../components/menu/Navbar'
import Modal from '../../components/modal/Modal'
import ModalA from '../../components/modal/ModalAssistant'
import Footer from '../../components/footer/footer'
import { render } from "@testing-library/react";

{/* <Navbar/> */ }


export default function Home() {

  const [AssistantsList, setAssistantsList] = useState([]);
  const [ExecutionsList, setExecutionsList] = useState([]);

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

  const [myQuests, setMyQuests] = useState([]);
  const [highlightedPosts, setHighlightedPosts] = useState([]);
  const Navigate = useNavigate();

  function App() {
    const handleLeftArrow = () => {
    }
    const handleRightArrow = () => {
    }
    const HideArrow = () => {
    }
  }

  useEffect(App, [])

  const GetMyQuests = () => {
    axios.get('https://grupo7.azurewebsites.net/api/Quests/ListarMinhas', {
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
    axios.get('https://grupo7.azurewebsites.net/api/Posts/Highlights', {
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
    GetMyQuests();
    GetHighlightedPosts();
  }, [])

  return (
    <div>

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
                      <img src={Azul_Home} className="card1-img" />
                      <h5>{assistant.assistantName}</h5>
                      <PlayIcon />
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
        <form>
          <h2 className="body-title-task">Minhas Tarefas</h2>
          <div className="card-body-content">
            <h3 className="title-card-content">Título</h3>
            <p className="text-body1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <p className="data-body">Data de entrega : xx/xx/xxxx</p>
          </div>
          <div className="card-body-content">
            <h3 className="title-card-content">Título</h3>
            <p className="text-body1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <p className="data-body">Data de entrega : xx/xx/xxxx</p>
          </div>
          <div className="card-body-content">
            <h3 className="title-card-content">Título</h3>
            <p className="text-body1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <p className="data-body">Data de entrega : xx/xx/xxxx</p>
          </div>
        </form>
      </div>
      <div className="bottom-container">
        <form>
          <div className="forms-items">
            <h2 className="bottom-title">Posts em destaque</h2>
            <div className="bottom-posts-content">

              <div className="chatListItem--lines">
                <img src={Post_Perfil_Photo} className="ItemPost-avatar" />
                <div className="chatItemList-line">
                  <div className="PostItem-name">Marcos</div>
                  <p className="PostItem-role">DevOps</p>
                </div>
              </div>
              <img src={Img_Home_Post} className="img2-home-bottom" />
              <p className="post-text-bottom-home">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ultricies tortor quis viverra. Phasellus fermentum metus libero, et laoreet est faucibus.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ultricies tortor quis viverra. Phasellus fermentum metus libero, et laoreet est faucibus.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ultricies tortor quis viverra. Phasellus fermentum metus libero, et laoreet est faucibus.
              </p>
            </div>
            <div className="bottom-posts-content">

              <div className="chatListItem--lines">
                <img src={Post_Perfil_Photo} className="ItemPost-avatar" />
                <div className="chatItemList-line">
                  <div className="PostItem-name">Marcos</div>
                  <p className="PostItem-role">DevOps</p>
                </div>
              </div>
              <img src={Img_Home_Post} className="img2-home-bottom" />
              <p className="post-text-bottom-home">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ultricies tortor quis viverra. Phasellus fermentum metus libero, et laoreet est faucibus.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ultricies tortor quis viverra. Phasellus fermentum metus libero, et laoreet est faucibus.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ultricies tortor quis viverra. Phasellus fermentum metus libero, et laoreet est faucibus.
              </p>
            </div>
            <div className="bottom-posts-content">

              <div className="chatListItem--lines">
                <img src={Post_Perfil_Photo} className="ItemPost-avatar" />
                <div className="chatItemList-line">
                  <div className="PostItem-name">Marcos</div>
                  <p className="PostItem-role">DevOps</p>
                </div>
              </div>
              <img src={Img_Home_Post} className="img2-home-bottom" />
              <p className="post-text-bottom-home">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ultricies tortor quis viverra. Phasellus fermentum metus libero, et laoreet est faucibus.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ultricies tortor quis viverra. Phasellus fermentum metus libero, et laoreet est faucibus.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ultricies tortor quis viverra. Phasellus fermentum metus libero, et laoreet est faucibus.
              </p>
            </div>
            <div className="bottom-posts-content">

              <div className="chatListItem--lines">
                <img src={Post_Perfil_Photo} className="ItemPost-avatar" />
                <div className="chatItemList-line">
                  <div className="PostItem-name">Marcos</div>
                  <p className="PostItem-role">DevOps</p>
                </div>
              </div>
              <img src={Img_Home_Post} className="img2-home-bottom" />
              <p className="post-text-bottom-home">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ultricies tortor quis viverra. Phasellus fermentum metus libero, et laoreet est faucibus.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ultricies tortor quis viverra. Phasellus fermentum metus libero, et laoreet est faucibus.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ultricies tortor quis viverra. Phasellus fermentum metus libero, et laoreet est faucibus.
              </p>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div >
  );
}