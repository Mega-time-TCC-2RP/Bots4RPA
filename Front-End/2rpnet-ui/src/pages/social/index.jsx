import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import botaoComentarImg from "../../assets/img/botaoComentar.png";
import botaoCurtirImg from "../../assets/img/botaoLike.png";
import botaoCurtidoImg from "../../assets/img/botaoLikeLiked.png";

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

    const [labelImgCadastroPost, setLabelImgCadastroPost] = useState('Selecione o arquivo de imagem...');
    const [TituloPostCadastro, setTituloPostCadastro] = useState('');
    const [DescricaoPostCadastro, setDescricaoPostCadastro] = useState('');

    const [tituloCadastroComentario, setTituloCadastroComentario] = useState('');
    const [descricaoCadastroComentario, setDescricaoCadastroComentario] = useState('');
    const [idPostComentarios, setIdPostComentarios] = useState(0);

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
        })

        return ListaPostsRetorno;
    }

    const LikesCurtir = (e, idPost) => {
        e.preventDefault();
        axios.post('http://grupo7.azurewebsites.net/api/Likes', {
            "idPost": idPost,
        } ,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
            }
        }).then((response) => {
            ListarPosts();
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const LikesDescurtir = (e, idPostLike) => {
        e.preventDefault();
        console.log(idPostLike)
        axios.delete('http://grupo7.azurewebsites.net/api/Likes/' + idPostLike, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
            }
        }).then((response) => {
            console.log(response.data);
            ListarPosts();
        }).catch((error) => {
            console.log(error);
        })
    }

    const PublicarPost = (e) => {
        e.preventDefault();

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
                ListarPosts();
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    const PublicarComentario = async (e) => {
        e.preventDefault();

        axios.post("http://grupo7.azurewebsites.net/api/Comments", {
            "idPost": idPostComentarios,
            "title": tituloCadastroComentario,
            "commentDescription": descricaoCadastroComentario
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
            }
        }).then(async (response) => {
            console.log(response)
            let ListaPostsPosComentar = await ListarPosts();
            console.log(ListaPostsPosComentar.find((post) => post.idPost == idPostComentarios).comments);
            setComentariosModal(ListaPostsPosComentar.find((post) => post.idPost == idPostComentarios).comments)
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        ListarPosts();
        console.log(parseJwt());
    }, [])
    return (
        <div className="containerPag">
            <Header />
            <Navbar />
            <main id="Main">
                <VLibras />
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
                                <h2>Adicionar publicação</h2>
                                <button onClick={(e) => closeModalCadastro(e)}>X</button>
                            </div>
                            <div>
                                <div className="CamposCadastro">
                                    <div className="LinhaCampoCadastro">
                                        <div className="CampoCadastro">
                                            <label className="LabelCampoCadastro">Título</label>
                                            <input placeholder="Digite o título..." type="text" onChange={(e) => setTituloPostCadastro(e.target.value)} value={TituloPostCadastro}></input>
                                        </div>
                                        <div className="CampoCadastro">
                                            <label className="LabelCampoCadastro">Descrição</label>
                                            <input placeholder="Digite a descrição..." type="text" onChange={(e) => setDescricaoPostCadastro(e.target.value)} value={DescricaoPostCadastro}></input>
                                        </div>
                                    </div>
                                    <div className="CampoCadastro">
                                        <label className="LabelCampoCadastro">Imagem</label>
                                        <label className="ImagemInputExibição" for="InputImagemCadastroPost">{
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
                            <button className="BtnSubmitForm">Publicar</button>
                        </form>
                    </Modal>
                    {
                        ListaPosts != undefined &&
                        ListaPosts.map((post) => {
                            return (
                                < div className="BoxPost" key={post.idPost} >
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
                                        <button onClick={() => {
                                            openModalComentarios(post.comments)
                                            setIdPostComentarios(post.idPost)
                                        }} className="BotaoComentar BotaoPost">
                                            <img src={botaoComentarImg}></img>
                                        </button>
                                        {
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
                                                <form onSubmit={(e) => PublicarComentario(e)} className='CadastroComentarioContainer'>
                                                    <div className='LinhaCampoCadastroComentarios'>
                                                        <div className="CampoCadastro">
                                                            <label className="LabelCampoCadastro">Título</label>
                                                            <input placeholder="Digite o título..." type="text" onChange={(e) => setTituloCadastroComentario(e.target.value)} value={tituloCadastroComentario}></input>
                                                        </div>
                                                        <div className="CampoCadastro">
                                                            <label className="LabelCampoCadastro">Descrição</label>
                                                            <input placeholder="Digite a descrição..." type="text" onChange={(e) => setDescricaoCadastroComentario(e.target.value)} value={descricaoCadastroComentario}></input>
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
                                                            <div className="Comentario" key={comentario.idComentario}>
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