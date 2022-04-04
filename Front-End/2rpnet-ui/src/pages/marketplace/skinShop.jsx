import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import Navbar from '../../components/menu/Navbar'
import skin from '../../assets/img/Robo.png'
import Coin from '../../assets/img/coin.png'

export default function skinShop() {
    return (
        <div>
            <Header/>
            {/* <Navbar/> */}
            <div className='container2'>
                <h1 id='titulo'>Skins</h1>
            <div className='filtragem_Busca'>
                <input className="input_busca"
                        name="Buscar Skins.."
                        placeholder="Buscar Skins.."
                    />
                <select name="select">
                    <option value="valor1">Mais caras</option>
                    <option value="valor2" selected>Mais baratas</option>
                    <option value="valor3">Personalizadas</option>
                </select>  
            </div>
            </div>
            
            <div className='skin'>
                <img src={skin} alt="img robot"/>
                <span>Bôbotron Limão</span>
                <div className ='coin'>
                    <img src={Coin} alt="img coin"/>
                    <span>2000</span>
                </div>
                <span>ver detalhes</span>
            </div>


            
            <Footer />
        </div>
    );
} 