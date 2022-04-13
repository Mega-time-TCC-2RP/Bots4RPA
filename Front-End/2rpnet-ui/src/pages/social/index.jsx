import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import botaoComentarImg from "../../assets/img/botaoComentar.png";
import botaoCurtirImg from "../../assets/img/botaoLike.png";
import "../../assets/css/pages/Timeline.css"
import Modal from 'react-modal';
import ImagemModalCadastro from "../../assets/img/CadastroPostBtn.png"
import VLibras from '@djpfs/react-vlibras'


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
        background: '#FFFFFF',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
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

    function closeModalCadastro() {
        setModalCadastroIsOpen(false);
    }

    function closeModalComentarios() {
        setComentariosIsOpen(false)
    }

    const ListarPosts = () => {
        axios.get('http://localhost:5000/api/Posts', {
            headers: {
                Authorization: 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVyaWNrQGdtYWlsLmNvbSIsImp0aSI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiIxIiwicm9sZSI6IjEiLCJleHAiOjE2NDkxOTAwOTQsImlzcyI6IjJycC53ZWJBUEkiLCJhdWQiOiIycnAud2ViQVBJIn0.m-HJBiOBP9Ii513fif1Y7lKXPSO6CmlaGyp0txvXksU"
            }
        }).then((resposta) => {
            console.log(resposta.data);
            setListaPosts(resposta.data);
        })
    }

    useEffect(() => {
        ListarPosts();
    }, [])
    return (
        <>
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
                                <button onClick={closeModalCadastro}>X</button>
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
                                        <img src={"http://localhost:5000/StaticFiles/Images/" + post.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.photoUser}></img>
                                        <div className="UsuarioDados">
                                            <span className="Nome">{post.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.userName1}</span>
                                            <span className="Cargo">{post.idPlayerNavigation.idEmployeeNavigation.idOfficeNavigation.titleOffice}</span>
                                        </div>
                                    </div>
                                    {
                                        post.postImage != undefined ?
                                            <img className="ImgPost" src={"http://localhost:5000/StaticFiles/Images/" + post.postImage}></img> :
                                            <p className="TextoNaoHaImagemPost">Não há uma imagem para ilustrar esse post :(</p>
                                    }
                                    <div className="ContainerBotoesPost">
                                        <button onClick={() => openModalComentarios(post.comments)} className="BotaoComentar BotaoPost">
                                            <img src={botaoComentarImg}></img>
                                        </button>
                                        <button className="BotaoCurtir BotaoPost">
                                            <img src={botaoCurtirImg}></img>
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
                                                <button onClick={closeModalComentarios}>X</button>
                                            </div>
                                            <div className='ContainerComentarios'>
                                                {
                                                    ComentariosModal != undefined &&
                                                    ComentariosModal.map((comentario) => {
                                                        return (
                                                            <div className="Comentario">
                                                                <div className='ComentarioUsuario'>
                                                                    <img src={"http://localhost:5000/StaticFiles/Images/" + comentario.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.photoUser}></img>
                                                                    <span>{"http://localhost:5000/StaticFiles/Images/" + comentario.idPlayerNavigation.idEmployeeNavigation.idUserNavigation.userName1}</span>
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
        </>
    );
}

export default TelaTimeline;