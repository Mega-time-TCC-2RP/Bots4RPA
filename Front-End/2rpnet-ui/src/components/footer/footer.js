import React, {Component} from "react";
import { Link } from 'react-router-dom';

//img:
import LogoBranca from '../../assets/img/LogoBranca.png'
import Insta from '../../assets/img/iconeInstagram.png'
import Twitter from '../../assets/img/iconeTwitter.png'
import Facebook from '../../assets/img/iconeFacebook.png'
import Youtube from '../../assets/img/iconeYoutube.png'

//Icons:
import * as BiIcons from 'react-icons/bi'
import * as AiIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa'

//css: 
import '../../assets/css/components/footer.css'

class Footer extends Component {
    render(){
        return (
            <footer className="footer">
                <div className="container footerMainContent">
                    <img className="footer2RP" src={LogoBranca} alt="Logo 2RPnet"/>
                    <div className="socialNetworkArea">
                        <span alt="Nossas redes sociais" className="p">Nossas Redes Sociais:</span>
                        <div className="socialNetworkIcons">
                            <a href="https://www.linkedin.com/company/2rp-informatica/" to="/"><FaIcons.FaLinkedin  color="white" alt="Imagem Logo Linkedin" size='55px'/></a>
                            <a href="https://www.facebook.com/2rpnetservicos/?modal=admin_todo_tour"  to="/"><FaIcons.FaFacebookSquare color="white" alt="Imagem Logo Facebook" size='55px'/></a>
                            <a href="https://www.youtube.com/channel/UC9n0XxkktvDXpsVoc1s5FQg" to="/"><FaIcons.FaYoutubeSquare color="white" alt="Imagem Logo Youtube" size='55px' /></a>
                        </div>
                    </div>
                </div>
                <span className="p"><BiIcons.BiCopyright alt="Todos os direitos resevados 2022" />Todos os direitos reservados - 2022</span>
            </footer>
        )
    }
}
export default Footer