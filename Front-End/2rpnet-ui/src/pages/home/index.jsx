import "../../assets/css/style.css";
import "../../assets/css/components/navbar.css"
import { Component } from 'react';
import React, { useState, useEffect } from 'react';
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

//items
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';


//Components:
import menu from '../../components/menu/Navbar'
import Footer from '../../components/footer/footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const handleLeftArrow = () => {

  }
  const handleRightArrow = () => {

  }

  const HideArrow = () => {

  }

  return (
    <div>
      <Navbar />
      <VLibras />
      <div className="top-container">
        <div className="top-buttons">
          <form>
            <button className="button-assistant">Criar Assistente</button>
            <input type='search' placeholder="Buscar assistente" id="Assistente"></input>
          </form>
          <form className="nao">
            <div className="movieRow-left">
              <NavigateBeforeIcon style={{ fontSize: 150 }} />
            </div>
            <div className="movieRow-right">
              <NavigateNextIcon style={{ fontSize: 150 }} />
            </div>
            <div className="card1">
              <img src={Azul_Home} className="card1-img" />
              <h5>Assistente 1</h5>
              <a className="play-button">▶</a>
              <a className="details-button">Ver detalhes</a>
            </div>
            <div className="card1">
              <img src={Vermelho_Home} className="card1-img" />
              <h5>Assistente 2</h5>
              <a className="play-button">▶</a>
              <a className="details-button">Ver detalhes</a>
            </div>
            <div className="card1">
              <img src={Amarelo_Home} className="card1-img" />
              <h5>Assistente 3</h5>
              <a className="play-button">▶</a>
              <a className="details-button">Ver detalhes</a>
            </div>
            {/* <div className="card1">
              <img src={Verde_Home} className="card1-img"/>
              <h5>Assistente 4</h5>
              <a className="play-button">▶</a>
              <a className="details-button">Ver detalhes</a>
            </div> */}
          </form>
        </div>
      </div>
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

export default App;