import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import botaoComentarImg from "../../assets/img/botaoComentar.png";
import botaoCurtirImg from "../../assets/img/botaoLike.png";
import "../../assets/css/pages/Timeline.css"


//Imports temporários
import ImgUser from "../../assets/img/profile.jpg";
import ImgPost from "../../assets/img/ImgPost.png";

export const TelaTimeline = () => {
    const [ListaPosts, setListaPosts] = useState([]);
    const [ListaUsuarios, setListaUsuarios] = useState([]);
    const [ListaFuncionarios, setListaFuncionarios] = useState([]);
    const [ListaPlayers, setListaPlayers] = useState([]);
    const [ListaImagensPlayers, setListaImagensPlayers] = useState([]);

    const ListarPosts = () => {
        axios.get('http://localhost:5000/api/Posts', {
            headers: {
                Authorization: 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVyaWNrQGdtYWlsLmNvbSIsImp0aSI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiIxIiwicm9sZSI6IjEiLCJleHAiOjE2NDkxMDE5NDUsImlzcyI6IjJycC53ZWJBUEkiLCJhdWQiOiIycnAud2ViQVBJIn0.aCNb8VQczVAjbZOHOVQljF1r_EoEp13cznhfn7w2PuM"
            }
        }).then((resposta) => {
            setListaPosts(resposta.data.readAll);
            console.log(resposta.data.readAll);
        })
    }

    const ListarUsuarios = () => {
        axios.get('http://localhost:5000/api/UserNames').then((resposta) => {
            setListaUsuarios(resposta.data);
            // console.log(resposta.data)
        })
    }

    const ListarFuncionarios = () => {
        axios.get('http://localhost:5000/api/Employees').then((resposta) => {
            setListaFuncionarios(resposta.data);
            // console.log(resposta.data)
        })
    }

    const ListarPlayers = () => {
        axios.get('http://localhost:5000/api/Players').then((resposta) => {
            setListaPlayers(resposta.data);
            // console.log(resposta.data)
        })
    }

    useEffect(() => {
        // ListarPosts();
        // ListarUsuarios();
        // ListarFuncionarios();
        // ListarPlayers();
    }, [])
    return (
        <>
            <main>
                <div className="ContainerGrid ContainerPosts">
                    <div className="BoxPost">
                        <div className="UsuarioCampo">
                            <img src={ImgUser}></img>
                            <div className="UsuarioDados">
                                <span className="Nome">Marcos</span>
                                <span className="Cargo">Dev</span>
                            </div>
                        </div>
                        <img className="ImgPost" src={ImgPost}></img>
                        <div className="ContainerBotoesPost">
                            <button className="BotaoComentar BotaoPost">
                                <img src={botaoComentarImg}></img>
                            </button>
                            <button className="BotaoCurtir BotaoPost">
                                <img src={botaoCurtirImg}></img>
                            </button>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ultricies tortor quis viverra. Phasellus fermentum metus libero, et laoreet est faucibus.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ultricies tortor quis viverra. Phasellus fermentum metus libero, et laoreet est faucibus.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ultricies tortor quis viverra. Phasellus fermentum metus libero, et laoreet est faucibus.
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}

export default TelaTimeline;