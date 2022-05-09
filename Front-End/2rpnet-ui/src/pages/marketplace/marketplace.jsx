import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import Navbar from '../../components/menu/Navbar'
import skin from '../../assets/img/Robo.png'
import Coin from '../../assets/img/coin.png'
import '../../assets/css/pages/skinShop.css'
import '../../assets/css/pages/workflow.css'
import VLibras from '@djpfs/react-vlibras'
import React from "react"


export default function marketplace() {
    return (
        <div id='all'>
            <Header/>
            <Navbar/>
            <VLibras/>
            <div className='container2'>
            <div className='Titulo_inputs'>
                <h1 id='titulo'>Loja de Assistentes</h1>
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
            
            
            <div className='lista2'>
            <div className='workflow'>
                <div className='assistent'>
                <img src={skin} alt="img robot"/>
                <span className='nameRobot'>Bôbotron Limão</span>
                </div>
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