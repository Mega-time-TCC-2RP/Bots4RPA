import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import botaoComentarImg from "../../assets/img/botaoComentar.png";
import botaoCurtirImg from "../../assets/img/botaoLike.png";
import "../../assets/css/pages/Timeline.css"
import Modal from 'react-modal';
import ImagemModalCadastro from "../../assets/img/CadastroPostBtn.png"
import VLibras from '@djpfs/react-vlibras'
import Navbar from '../../components/menu/Navbar'
import { usuarioAutenticado, parseJwt } from '../../services/auth';
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '1000px',
        height: '90vh',
        background: 'var(--WHITE)',
        boxShadow: 'var(--darkShadow)',
        borderRadius: '30px'
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const TelaTimeline = () => {
    const [ListaPosts, setListaPosts] = useState([]);
    const [ModalCadastroIsOpen, setModalCadastroIsOpen] = useState(false);
    const [ModalComentariosIsOpen, setComentariosIsOpen] = useState(false);
    const [ComentariosModal, setComentariosModal] = useState([]);

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

    const ListarPosts = () => {
        axios.get('http://grupo7.azurewebsites.net/api/Posts', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
            }
        }).then((resposta) => {
            console.log(resposta.data);
            setListaPosts(resposta.data);
        })
    }

    const PublicarPost = (e) => {
        e.preventDefault();
        
    }

    useEffect(() => {
        ListarPosts();
        console.log(usuarioAutenticado())
        console.log(parseJwt())
        console.log(localStorage.getItem('2rp-chave-autenticacao'))
    }, [])
    return (
        <div className="containerPag">
            <Header/>
            <Navbar />
            <main id="Main">
                <VLibras/>
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
                        <form className="CadastroModalContainer">
                            <div className="HeaderModal">
                                <h2>Adicionar publicação</h2>
                                <button onClick={(e) => closeModalCadastro(e)}>X</button>
                            </div>
                            <div>
                                <div className="CamposCadastro">
                                    <div className="LinhaCampoCadastro">
                                        <div className="CampoCadastro">
                                            <label className="LabelCampoCadastro">Título</label>
                                            <input placeholder="Digite o título..." type="text"></input>
                                        </div>
                                        <div className="CampoCadastro">
                                            <label className="LabelCampoCadastro">Descrição</label>
                                            <input placeholder="Digite a descrição..." type="text"></input>
                                        </div>
                                    </div>
                                    <div className="CampoCadastro">
                                        <label className="LabelCampoCadastro">Imagem</label>
                                        <label className="ImagemInputExibição" for="InputImagemCadastroPost">Selecione a imagem...</label>
                                        <input className="ImagemInputReal" id="InputImagemCadastroPost" placeholder="Selecione a imagem..." type="file" accept="image/*"></input>
                                    </div>
                                </div>
                            </div>
                            <button className="BtnSubmitForm">Publicar</button>
                        </form>
                    </Modal>
                    {
                        ListaPosts != undefined &&
                        ListaPosts.map((post) => {
                            return (
                                < div className="BoxPost" >
                                    <div className="UsuarioCampo">
                                        <img src={"http://grupo7.azurewebsites.net/img/" + post.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.photoUser}></img>
                                        <div className="UsuarioDados">
                                            <span className="Nome">{post.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.userName1}</span>
                                            <span className="Cargo">{post.idPlayerNavigation.idEmployeeNavigation.idOfficeNavigation.titleOffice}</span>
                                        </div>
                                    </div>
                                    {
                                        post.postImage != undefined ?
                                            <img className="ImgPost" src={"http://grupo7.azurewebsites.net/img/" + post.postImage}></img> :
                                            <p className="TextoNaoHaImagemPost">Não há uma imagem para ilustrar esse post :(</p>
                                    }
                                    <div className="ContainerBotoesPost">
                                        <button onClick={() => openModalComentarios(post.comments)} className="BotaoComentar BotaoPost">
                                            <img src={botaoComentarImg}></img>
                                        </button>
                                        <button className="BotaoCurtir BotaoPost">
                                            <img src={botaoCurtirImg}></img>
                                            <span>{post.likes.length}</span>
                                        </button>
                                    </div>
                                    <h2 className="TituloPost">{post.title}</h2>
                                    <p className="DescricaoPost">{post.postDescription}</p>
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
                                                <form className='CadastroComentarioContainer'>
                                                    <div className='LinhaCampoCadastroComentarios'>
                                                        <div className="CampoCadastro">
                                                            <label className="LabelCampoCadastro">Título</label>
                                                            <input placeholder="Digite o título..." type="text"></input>
                                                        </div>
                                                        <div className="CampoCadastro">
                                                            <label className="LabelCampoCadastro">Descrição</label>
                                                            <input placeholder="Digite a descrição..." type="text"></input>
                                                        </div>
                                                    </div>
                                                    <button className="BtnSubmitForm">Publicar</button>
                                                </form>
                                                <button onClick={(e) => closeModalComentarios(e)}>X</button>
                                            </div>
                                            <div className='ContainerComentarios'>
                                                {
                                                    ComentariosModal != undefined &&
                                                    ComentariosModal.map((comentario) => {
                                                        return (
                                                            <div className="Comentario">
                                                                <div className='ComentarioUsuario'>
                                                                    <img src={"http://grupo7.azurewebsites.net/img/" + comentario.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.photoUser}></img>
                                                                    <span>{comentario.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.userName1}</span>
                                                                </div>
                                                                <h2 className='TituloComentario'>{comentario.title}</h2>
                                                                <p className='TextoComentario'>{comentario.commentDescription}
                                                                </p>
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
                    {/* Estilização Modal Comentários */}
                    {/* <Modal
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
                                <form className='CadastroComentarioContainer'>
                                    <div className='LinhaCampoCadastroComentarios'>
                                        <div className="CampoCadastro">
                                            <label className="LabelCampoCadastro">Título</label>
                                            <input placeholder="Digite o título..." type="text"></input>
                                        </div>
                                        <div className="CampoCadastro">
                                            <label className="LabelCampoCadastro">Descrição</label>
                                            <input placeholder="Digite a descrição..." type="text"></input>
                                        </div>
                                    </div>
                                    <button className="BtnSubmitForm">Publicar</button>
                                </form>
                                <button onClick={closeModalComentarios}>X</button>
                            </div>
                            <div className='ContainerComentarios'>

                                <div className="Comentario">
                                    <div className='ComentarioUsuario'>
                                        <img src={ImagemModalCadastro}></img>
                                        <span>Nome</span>
                                    </div>
                                    <h2 className='TituloComentario'>Titulum</h2>
                                    <p className='TextoComentario'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ultricies tortor quis viverra. Phasellus fermentum metus libero, et laoreet est faucibus.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ultricies tortor quis viverra. Phasellus fermentum metus libero, et laoreet est faucibus.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ultricies tortor quis viverra. Phasellus fermentum metus libero, et laoreet est faucibus.

                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ultricies tortor quis viverra. Phasellus fermentum metus libero, et laoreet est faucibus.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Modal> */}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default TelaTimeline;