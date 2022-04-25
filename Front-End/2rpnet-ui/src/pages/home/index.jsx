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
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/header'

//items
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';


//Components:
import Footer from '../../components/footer/footer'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usuarioAutenticado, parseJwt, handleAuthException } from '../../services/auth';


function App() {
  const [myQuests, setMyQuests] = useState([]);
  const [highlightedPosts, setHighlightedPosts] = useState([]);
  const Navigate = useNavigate();

  const handleLeftArrow = () => {

  }
  const handleRightArrow = () => {

  }

  const HideArrow = () => {

  }

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
    GetMyQuests();
    GetHighlightedPosts();
  }, [])
  return (
    <div>
      <Navbar />
      <div className='body-pd'>
        <Header />
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
            {
              myQuests != undefined && myQuests != null ?
                myQuests.map((Quest) => {
                  return (
                    <div className="card-body-content">
                      <h3 className="title-card-content">Título</h3>
                      <p className="text-body1">{Quest.descriptionQuest}</p>
                      <p className="data-body">Data de entrega : {new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(Quest.dateHour))}</p>
                    </div>
                  )
                }) : <span>Não há tarefas pra esse usuário</span>
            }
          </form>
        </div>
        <div className="bottom-container">
          <form>
            <div className="forms-items">
              <h2 className="bottom-title">Posts em destaque</h2>
              {
                highlightedPosts != undefined && highlightedPosts != null ?
                  highlightedPosts.map((post) => {
                    return (
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
                        <h2 className="TituloPost">{post.title}</h2>
                        <p className="post-text-bottom-home">{post.postDescription}</p>
                      </div>
                    )
                  }) :
                  <span>Não há posts em destaque</span>
              }
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;