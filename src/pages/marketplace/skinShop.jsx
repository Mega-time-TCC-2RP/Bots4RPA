import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import Navbar from '../../components/menu/Navbar'
import skin from '../../assets/img/Robo.png'
import Coin from '../../assets/img/coin.png'
import '../../assets/css/pages/skinShop.css'
import VLibras from '@djpfs/react-vlibras'


export default function skinShop() {
    return (
        <div id='all'>
            <Header/>
            <Navbar/>
            <VLibras/>
            <div className='container2'>
            <div className='Titulo_inputs'>
                <h1 id='titulo'>Skins</h1>
            <div className='filtragem_Busca'>
                <input className="input"
                        name="Buscar Skins.."
                        placeholder="Buscar Skins.."
                    />
                <select className='input' name="select">
                    <option value="valor1">Mais caras</option>
                    <option value="valor2" selected>Mais baratas</option>
                    <option value="valor3">Personalizadas</option>
                </select>  
            </div>
            </div>
            
            
            <div className='lista'>
            <div className='skin'>
                <img src={skin} alt="img robot"/>
                <span className='nameRobot'>Bôbotron Limão</span>
                <div className ='coin'>
                    <img src={Coin} alt="img coin"/>
                    <span>2000</span>
                </div>
                <span className='details2'>ver detalhes</span>
            </div>
            <div className='skin'>
                <img src={skin} alt="img robot"/>
                <span className='nameRobot'>Bôbotron Limão</span>
                <div className ='coin'>
                    <img src={Coin} alt="img coin"/>
                    <span>2000</span>
                </div>
                <span className='details2'>ver detalhes</span>
            </div>
            <div className='skin'>
                <img src={skin} alt="img robot"/>
                <span className='nameRobot'>Bôbotron Limão</span>
                <div className ='coin'>
                    <img src={Coin} alt="img coin"/>
                    <span>2000</span>
                </div>
                <span className='details2'>ver detalhes</span>
            </div>
            <div className='skin'>
                <img src={skin} alt="img robot"/>
                <span className='nameRobot'>Bôbotron Limão</span>
                <div className ='coin'>
                    <img src={Coin} alt="img coin"/>
                    <span>2000</span>
                </div>
                <span className='details2'>ver detalhes</span>
            </div>
            </div>
            
            </div>


            
            <Footer />
        </div>
    );
} 