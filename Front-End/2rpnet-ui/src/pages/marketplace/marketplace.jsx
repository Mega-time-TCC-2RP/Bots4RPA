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
                <div className='descriptionDtails'>
                <div className='description'>
                    <span id='descrição'>Descrição do assistente</span>
                    <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta urna nec leo ornare blandit. In ornare, tortor in aliquet mollis, diam nibh cursus eros, sed venenatis ex urna quis mi. Morbi ultricies ut sapien vel congue. Pellentesque eu sodales justo, et accumsan erat. Nullam eu eros vel sem volutpat fringilla. Mauris interdum erat nibh, sed porttitor eros molestie vitae.</text>
                </div>

                <div className='coinDetails'>
                <div className ='coin'>
                    <img src={Coin} alt="img coin"/>
                    <span>2000</span>
                </div>
                <div className='details2'>
                <span >ver detalhes</span>
                </div>
                </div>
                </div>

            </div>
            <div className='workflow'>
                <div className='assistent'>
                <img src={skin} alt="img robot"/>
                <span className='nameRobot'>Bôbotron Limão</span>
                </div>
                <div className='descriptionDtails'>
                <div className='description'>
                    <span id='descrição'>Descrição do assistente</span>
                    <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta urna nec leo ornare blandit. In ornare, tortor in aliquet mollis, diam nibh cursus eros, sed venenatis ex urna quis mi. Morbi ultricies ut sapien vel congue. Pellentesque eu sodales justo, et accumsan erat. Nullam eu eros vel sem volutpat fringilla. Mauris interdum erat nibh, sed porttitor eros molestie vitae.</text>
                </div>

                <div className='coinDetails'>
                <div className ='coin'>
                    <img src={Coin} alt="img coin"/>
                    <span>2000</span>
                </div>
                <div className='details2'>
                <span >ver detalhes</span>
                </div>
                </div>
                </div>

            </div>
            <div className='workflow'>
                <div className='assistent'>
                <img src={skin} alt="img robot"/>
                <span className='nameRobot'>Bôbotron Limão</span>
                </div>
                <div className='descriptionDtails'>
                <div className='description'>
                    <span id='descrição'>Descrição do assistente</span>
                    <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta urna nec leo ornare blandit. In ornare, tortor in aliquet mollis, diam nibh cursus eros, sed venenatis ex urna quis mi. Morbi ultricies ut sapien vel congue. Pellentesque eu sodales justo, et accumsan erat. Nullam eu eros vel sem volutpat fringilla. Mauris interdum erat nibh, sed porttitor eros molestie vitae.</text>
                </div>

                <div className='coinDetails'>
                <div className ='coin'>
                    <img src={Coin} alt="img coin"/>
                    <span>2000</span>
                </div>
                <div className='details2'>
                <span >ver detalhes</span>
                </div>
                </div>
                </div>

            </div>
            
            </div>
            
            </div>


            
            <Footer />
        </div>
    );
} 