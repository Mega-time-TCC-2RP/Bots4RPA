import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { AxiosError } from 'axios';
import botaoComentarImg from "../../assets/img/botaoComentar.png";
import botaoCurtirImg from "../../assets/img/botaoLike.png";
import botaoCurtidoImg from "../../assets/img/botaoLikeLiked.png";
import "../../assets/css/pages/Timeline.css"
import ImagemModalCadastro from "../../assets/img/CadastroPostBtn.png"
import VLibras from '@djpfs/react-vlibras'
import Navbar from '../../components/menu/Navbar'
import { usuarioAutenticado, parseJwt, handleAuthException } from '../../services/auth';
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import noPhoto from '../../assets/img/no-image.png'

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

import '../../assets/css/components/button.css'
import '../../assets/css/components/fonts.css'

import { useNavigate } from 'react-router-dom'
import { Button } from '@material-ui/core';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '1000px',
        height: '60vh',
        background: 'var(--WHITE)',
        boxShadow: 'var(--darkShadow)',
        borderRadius: '30px'
    },
};
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

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const TelaTimeline = (person, idx) => {
    const Navigate = useNavigate();

    const [IsLoading, setIsLoading] = useState(false);
    const [ListaPosts, setListaPosts] = useState([]);

    const [ModalCadastroIsOpen, setModalCadastroIsOpen] = useState(false);
    const [ModalComentariosIsOpen, setComentariosIsOpen] = useState(false);
    const [ComentariosModal, setComentariosModal] = useState([]);

    const [labelImgCadastroPost, setLabelImgCadastroPost] = useState('Selecione o arquivo de imagem...');
    const [TituloPostCadastro, setTituloPostCadastro] = useState('');
    const [DescricaoPostCadastro, setDescricaoPostCadastro] = useState('');

    const [tituloCadastroComentario, setTituloCadastroComentario] = useState('');
    const [descricaoCadastroComentario, setDescricaoCadastroComentario] = useState('');
    const [idPostComentarios, setIdPostComentarios] = useState(0);

    //onboarding
    const [onBoardingIsOpen, setOnBoardingIsOpen] = useState(false);

    function handleOpenOnBoarding() {
        setOnBoardingIsOpen(true)
    }
    function handleCloseOnBoarding() {
        setOnBoardingIsOpen(false)
    }
    //onboarding


    function openModalCadastro() {
        setModalCadastroIsOpen(true);
    }

    function openModalComentarios(listaComentarios) {
        setComentariosModal(listaComentarios);
        console.log(listaComentarios);
        setComentariosIsOpen(true);
        console.log(ModalComentariosIsOpen)
    }

    function afterOpenModal() {
    }

    function closeModalCadastro(e) {
        e.preventDefault();
        setModalCadastroIsOpen(false);
    }

    function closeModalComentarios(e) {
        e.preventDefault();
        setComentariosIsOpen(false)
    }


    const ListarPosts = async () => {
        let ListaPostsRetorno;
        await axios.get('http://grupo7.azurewebsites.net/api/Posts', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
            }
        }).then((resposta) => {
            console.log(resposta.data);
            ListaPostsRetorno = resposta.data;
            setListaPosts(resposta.data);
        }).catch(async (error) => {
            if (await handleAuthException(error) === true) {
                localStorage.removeItem('2rp-chave-autenticacao')
                Navigate('/login')
            }
        })

        return ListaPostsRetorno;
    }

    const LikesCurtir = async (e, idPost) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post('http://grupo7.azurewebsites.net/api/Likes', {
            "idPost": idPost,
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
            }
        }).then(async (response) => {
            await ListarPosts();
            setIsLoading(false);
            console.log(response.data);
        }).catch((error) => {
            if (handleAuthException(error) === true) {
                localStorage.removeItem('2rp-chave-autenticacao')
                Navigate('/login')
            }
            setIsLoading(false);
        })
    }

    const LikesDescurtir = async (e, idPostLike) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(idPostLike)
        axios.delete('http://grupo7.azurewebsites.net/api/Likes/' + idPostLike, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
            }
        }).then(async (response) => {
            console.log(response.data);
            await ListarPosts();
            setIsLoading(false);
        }).catch(async (error) => {
            if (await handleAuthException(error) === true) {
                localStorage.removeItem('2rp-chave-autenticacao')
                Navigate('/login')
            }
            setIsLoading(false);
        })
    }

    const PublicarPost = (e) => {
        e.preventDefault();
        setIsLoading(true);
        var formData = new FormData();

        const element = document.getElementById('InputImagemCadastroPost')
        const file = element.files[0]
        formData.append('File', file, file.name)

        formData.append('Title', TituloPostCadastro);
        formData.append('PostDescription', DescricaoPostCadastro);

        axios({
            method: "post",
            url: "http://grupo7.azurewebsites.net/api/Posts",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
            },
        })
            .then(function (response) {
                console.log(response);
                setIsLoading(false);
                setTituloPostCadastro("");
                setDescricaoPostCadastro("");
                ListarPosts();
            })
            .catch(function (error) {
                //handle error
                setIsLoading(false);
                if (handleAuthException(error) === true) {
                    localStorage.removeItem('2rp-chave-autenticacao')
                    Navigate('/login')
                }
            });
    }

    const PublicarComentario = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(idPostComentarios)
        console.log(tituloCadastroComentario)
        console.log(descricaoCadastroComentario)
        axios.post("http://grupo7.azurewebsites.net/api/Comments", {
            "idPost": idPostComentarios,
            "title": tituloCadastroComentario,
            "commentDescription": descricaoCadastroComentario
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
            }
        }).then(async (response) => {
            setIsLoading(false);
            setDescricaoCadastroComentario("");
            setTituloCadastroComentario("");
            let ListaPostsPosComentar = await ListarPosts();
            setComentariosModal(ListaPostsPosComentar.find((post) => post.idPost == idPostComentarios).comments)
        }).catch((error) => {
            console.log(error.response.status)
            console.log(error)
            setIsLoading(false);
            if (handleAuthException(error) === true) {
                localStorage.removeItem('2rp-chave-autenticacao')
                Navigate('/login')
            }
        })
    }

    useEffect(() => {
        ListarPosts();
        if (handleAuthException() === true) {
            localStorage.removeItem('2rp-chave-autenticacao')
            Navigate('/login')
        }
    }, [])

    if (parseJwt().Role == "3" || parseJwt().Role == "2") {
        return (
            <div>

                <Navbar />
                <div className="body-pd">
                    {/* <Header /> */}
                    <VLibras />
                    {/* onboarding */}
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
                                    <h2 className='h2'>Assistente</h2>
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
                                                <span className='p textoBonito'>Sinta-se a vontade a parte Social da nossa plataforma !</span>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="swiper-slide-OnBoarding-social">
                                            <div className="boardingContainer">
                                                <span className='p textoBonito'>Aqui será onde você poderá tirar dúvidas sobre seus Assistentes, os comprados e criados por você e seu time!</span>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="swiper-slide-OnBoarding-social">
                                            <div className="boardingContainer">
                                                <span className='p textoBonito'>E não esqueça, quanto mais você ajuda, mais você SE ajuda. Seja gentil e se envolva com a comunidade!</span>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>

                            </div>
                        </div>
                    </Modal>
                    {/*  */}
                    <main id="Main">
                        <div className="ContainerGrid ContainerPosts">
                            <div className="BotoesModais">
                                <button onClick={openModalCadastro}><img src={ImagemModalCadastro}></img></button>
                            </div>
                            <Modal
                                isOpen={ModalCadastroIsOpen}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModalCadastro}
                                style={customStyles}
                                contentLabel="Example Modal"
                                class="ReactModal"
                                closeTimeoutMS={2000}
                            >
                                <form className="CadastroModalContainer" onSubmit={(e) => PublicarPost(e)}>
                                    <div className="HeaderModal">
                                        <h2 className="h4">Adicionar publicação</h2>
                                        <button className='HeaderModalClosBtn' onClick={(e) => closeModalCadastro(e)}>X</button>
                                    </div>
                                    <div className="CamposCadastroContainer">
                                        <div className="CamposCadastro inputsModal ">
                                            <div className="CampoCadastro">
                                                <label>Título</label>
                                                <input className="input" placeholder="Digite o título..." type="text" onChange={(e) => setTituloPostCadastro(e.target.value)} value={TituloPostCadastro}></input>
                                            </div>
                                            <div className="CampoCadastro">
                                                <label >Descrição</label>
                                                <input className="input" placeholder="Digite a descrição..." type="text" onChange={(e) => setDescricaoPostCadastro(e.target.value)} value={DescricaoPostCadastro}></input>
                                            </div>
                                            <div className="CampoCadastro">
                                                <label>Imagem</label>
                                                <label className="input ImagemInputExibição" for="InputImagemCadastroPost">{
                                                    labelImgCadastroPost
                                                }</label>
                                                <input className="ImagemInputReal" id="InputImagemCadastroPost" placeholder="Selecione a imagem..." type="file" accept="image/*" onChange={() => {
                                                    document.getElementById('InputImagemCadastroPost') != null ?
                                                        setLabelImgCadastroPost("O arquivo " + document.getElementById('InputImagemCadastroPost').files[0].name + " foi selecionado") : setLabelImgCadastroPost("Selecione o arquivo de imagem...")
                                                }
                                                }></input>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        IsLoading == true ?
                                            <button className="button" type="submit" disabled>Carregando</button> : <button className="button" type="submit">Publicar</button>
                                    }
                                </form>
                            </Modal>
                            {
                                ListaPosts != undefined &&
                                ListaPosts.map((post) => {
                                    return (
                                        < div className="BoxPost cardPattern" key={post.idPost} >
                                            <div className="UsuarioCampo">
                                                <img src={"http://grupo7.azurewebsites.net/img/" + post.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.photoUser}></img>
                                                <div className="UsuarioDados">
                                                    <span className="h5 semi-bold">{post.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.userName1}</span>
                                                    <span className="p">{post.idPlayerNavigation.idEmployeeNavigation.idOfficeNavigation.titleOffice}</span>
                                                </div>
                                            </div>
                                            {
                                                post.postImage != undefined ?
                                                    <img className="ImgPost" src={"http://grupo7.azurewebsites.net/img/" + post.postImage}></img> :
                                                    <img className="ImgPost" src={noPhoto}></img>
                                            }
                                            <div className="ContainerBotoesPost">
                                                <button onClick={() => {
                                                    openModalComentarios(post.comments)
                                                    setIdPostComentarios(post.idPost)
                                                }} className="BotaoComentar BotaoPost">
                                                    <img src={botaoComentarImg}></img>
                                                </button>
                                                {
                                                    IsLoading == true ?
                                                        post.likes.find((like) => like.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.idUser == parseInt(parseJwt().jti)) != undefined ?

                                                            <button className="BotaoCurtir BotaoPost" onClick={(e) => LikesDescurtir(e, post.idPost)} disabled>
                                                                <img src={botaoCurtidoImg}></img>
                                                                <span>{post.likes.length}</span>
                                                            </button>
                                                            :
                                                            <button className="BotaoCurtir BotaoPost" onClick={(e) => LikesCurtir(e, post.idPost)} disabled>
                                                                <img src={botaoCurtirImg}></img>
                                                                <span>{post.likes.length}</span>
                                                            </button>
                                                        :
                                                        post.likes.find((like) => like.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.idUser == parseInt(parseJwt().jti)) != undefined ?

                                                            <button className="BotaoCurtir BotaoPost" onClick={(e) => LikesDescurtir(e, post.idPost)}>
                                                                <img src={botaoCurtidoImg}></img>
                                                                <span>{post.likes.length}</span>
                                                            </button>
                                                            :
                                                            <button className="BotaoCurtir BotaoPost" onClick={(e) => LikesCurtir(e, post.idPost)}>
                                                                <img src={botaoCurtirImg}></img>
                                                                <span>{post.likes.length}</span>
                                                            </button>

                                                }
                                            </div>
                                            <h2 className="TituloPost h5 semi-bold">{post.title}</h2>
                                            <p className="DescricaoPost p">{post.postDescription}</p>
                                            <Modal
                                                isOpen={ModalComentariosIsOpen}
                                                onAfterOpen={afterOpenModal}
                                                onRequestClose={closeModalComentarios}
                                                style={customStyles}
                                                contentLabel="Example Modal"
                                                class="ReactModal"
                                                closeTimeoutMS={2000}
                                            >
                                                <div className='ContainerModalComentarios'>
                                                    <div className="HeaderModal">
                                                        <form onSubmit={(e) => PublicarComentario(e)} className='CadastroComentarioContainer inputsModal'>
                                                            <div className='LinhaCampoCadastroComentarios'>
                                                                <div className="CampoCadastro">
                                                                    <label className="LabelCampoCadastro">Título</label>
                                                                    <input className="input" placeholder="Digite o título..." type="text" onChange={(e) => setTituloCadastroComentario(e.target.value)} value={tituloCadastroComentario}></input>
                                                                </div>
                                                                <div className="CampoCadastro">
                                                                    <label className="LabelCampoCadastro">Descrição</label>
                                                                    <input className="input" placeholder="Digite a descrição..." type="text" onChange={(e) => setDescricaoCadastroComentario(e.target.value)} value={descricaoCadastroComentario}></input>
                                                                </div>
                                                            </div>
                                                            {
                                                                IsLoading == true ?
                                                                    <button type="submit" className="button" disabled>Carregando...</button> : <button type="submit" className="button">Publicar</button>
                                                            }
                                                        </form>

                                                        <button className='HeaderModalClosBtn' onClick={(e) => closeModalComentarios(e)}>X</button>
                                                    </div>
                                                    <div className='ContainerComentarios'>
                                                        {
                                                            ComentariosModal != undefined &&
                                                            ComentariosModal.map((comentario) => {
                                                                return (
                                                                    <div className="Comentario" key={comentario.idComentario}>
                                                                        <div className='ComentarioUsuario'>
                                                                            <img src={"http://grupo7.azurewebsites.net/img/" + comentario.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.photoUser}></img>
                                                                            <span className='h5 semi-bold'>{comentario.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.userName1}</span>
                                                                        </div>
                                                                        <div className='ConteudoComentario'>
                                                                            <h6 className='h6'>{comentario.title}</h6>
                                                                            <p className='p'>{comentario.commentDescription}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </Modal>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        );
    }
    else {
        return (
            <div>

                <Navbar />
                <div className="body-pd">
                    {/* <Header /> */}
                    <VLibras />
                    {/* onboarding */}
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
                                    <h2 className='h2'>Assistente</h2>
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
                                                <span className='p textoBonito'>Sinta-se a vontade a parte Social da nossa plataforma !</span>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="swiper-slide-OnBoarding">
                                            <div className="boardingContainer">
                                                <span className='p textoBonito'>Aqui será onde você poderá ver as postagens dos usuários dentro de sua empresa!</span>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="swiper-slide-OnBoarding">
                                            <div className="boardingContainer">
                                                <span className='p textoBonito'>Verifiquei e você é um administrador. Administradores não podem postar, curtir e comentar. Mas possuem um importante papel moderador!</span>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="swiper-slide-OnBoarding">
                                            <div className="boardingContainer">
                                                <span className='p textoBonito'>Tenha controle sobre o que seus funcionários publicam na plataforma e sempre se mantenha atualizado!</span>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>

                            </div>
                        </div>
                    </Modal>
                    {/*  */}
                    <main id="Main">
                        <div className="ContainerGrid ContainerPosts">
                            {
                                ListaPosts != undefined &&
                                ListaPosts.map((post) => {
                                    return (
                                        < div className="BoxPost cardPattern" key={post.idPost} >
                                            <div className="UsuarioCampo">
                                                <img src={"http://grupo7.azurewebsites.net/img/" + post.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.photoUser}></img>
                                                <div className="UsuarioDados">
                                                    <span className="h5 semi-bold">{post.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.userName1}</span>
                                                    <span className="p">{post.idPlayerNavigation.idEmployeeNavigation.idOfficeNavigation.titleOffice}</span>
                                                </div>
                                            </div>
                                            {
                                                post.postImage != undefined ?
                                                    <img className="ImgPost" src={"http://grupo7.azurewebsites.net/img/" + post.postImage}></img> :
                                                    <img className="ImgPost" src={noPhoto}></img>
                                            }
                                            <div className="ContainerBotoesPost">
                                                <button onClick={() => {
                                                    openModalComentarios(post.comments)
                                                    setIdPostComentarios(post.idPost)
                                                }} className="BotaoComentar BotaoPost">
                                                    <img src={botaoComentarImg}></img>
                                                </button>
                                                {/* {
                                                    IsLoading == true ?
                                                        post.likes.find((like) => like.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.idUser == parseInt(parseJwt().jti)) != undefined ?
    
                                                            <button className="BotaoCurtir BotaoPost" onClick={(e) => LikesDescurtir(e, post.idPost)} disabled>
                                                                <img src={botaoCurtidoImg}></img>
                                                                <span>{post.likes.length}</span>
                                                            </button>
                                                            :
                                                            <button className="BotaoCurtir BotaoPost" onClick={(e) => LikesCurtir(e, post.idPost)} disabled>
                                                                <img src={botaoCurtirImg}></img>
                                                                <span>{post.likes.length}</span>
                                                            </button>
                                                        :
                                                        post.likes.find((like) => like.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.idUser == parseInt(parseJwt().jti)) != undefined ?
    
                                                            <button className="BotaoCurtir BotaoPost" onClick={(e) => LikesDescurtir(e, post.idPost)}>
                                                                <img src={botaoCurtidoImg}></img>
                                                                <span>{post.likes.length}</span>
                                                            </button>
                                                            :
                                                            <button className="BotaoCurtir BotaoPost" onClick={(e) => LikesCurtir(e, post.idPost)}>
                                                                <img src={botaoCurtirImg}></img>
                                                                <span>{post.likes.length}</span>
                                                            </button>
    
                                                } */}
                                            </div>
                                            <h2 className="TituloPost h5 semi-bold">{post.title}</h2>
                                            <p className="DescricaoPost p">{post.postDescription}</p>
                                            <Modal
                                                isOpen={ModalComentariosIsOpen}
                                                onAfterOpen={afterOpenModal}
                                                onRequestClose={closeModalComentarios}
                                                style={customStyles}
                                                contentLabel="Example Modal"
                                                class="ReactModal"
                                                closeTimeoutMS={2000}
                                            >
                                                <div className='ContainerModalComentarios'>
                                                    <div className="HeaderModal">
                                                        <button className='HeaderModalClosBtn' onClick={(e) => closeModalComentarios(e)}>X</button>
                                                    </div>
                                                    <div className='ContainerComentarios'>
                                                        {
                                                            ComentariosModal != undefined &&
                                                            ComentariosModal.map((comentario) => {
                                                                return (
                                                                    <div className="Comentario" key={comentario.idComentario}>
                                                                        <div className='ComentarioUsuario'>
                                                                            <img src={"http://grupo7.azurewebsites.net/img/" + comentario.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.photoUser}></img>
                                                                            <span className='h5 semi-bold'>{comentario.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.userName1}</span>
                                                                        </div>
                                                                        <div className='ConteudoComentario'>
                                                                            <h6 className='h6'>{comentario.title}</h6>
                                                                            <p className='p'>{comentario.commentDescription}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </Modal>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default TelaTimeline;