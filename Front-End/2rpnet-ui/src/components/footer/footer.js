import React, {Component} from "react";
import { Link } from 'react-router-dom';

//img:
import Logo from '../../assets/img/logo2RPbranco.png'
import Insta from '../../assets/img/iconeInstagram.png'
import Twitter from '../../assets/img/iconeTwitter.png'
import Facebook from '../../assets/img/iconeFacebook.png'
import Youtube from '../../assets/img/iconeYoutube.png'

//Icons:
import * as BiIcons from 'react-icons/bi'

//css: 
import '../../assets/css/components/footer.css'

class Footer extends Component {
    render(){
        return (
            <footer className="footer">
                <div className="container footerMainContent">
                    <img className="footer2RP" src={Logo} alt="Logo 2RPnet"/>
                    <div className="socialNetworkArea">
                        <span>Nossas Redes Sociais:</span>
                        <div className="socialNetworkIcons">
                            <Link to="/"><img className="instagramIcon" src={Insta} alt="Logo Instagram"/></Link>
                            <Link to="/"><img className="twitterIcon" src={Twitter} alt="Logo Twitter"/></Link>
                            <Link to="/"><img className="facebookIcon" src={Facebook} alt="Logo Facebook"/></Link>
                            <Link to="/"><img className="youtubeIcon" src={Youtube} alt="Logo Youtube"/></Link>
                        </div>
                    </div>
                </div>
                <span className="rightsReserved"><BiIcons.BiCopyright />Todos os direitos reservados - 2022</span>
            </footer>
        )
    }
}
export default Footer