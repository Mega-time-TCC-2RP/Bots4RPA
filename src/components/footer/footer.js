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
import * as AiIcons from 'react-icons/ai'

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
                            <a className="linkedin" href="https://www.linkedin.com/company/2rp-informatica/?challengeId=AQFoSwHA5gTrUQAAAYAFIyNh6S8FQaqyAT3hVNOtcZDOzpdg7UaWRgmJ9DVFeUJkZHA50MoYLAqpjwRQm3DB6heZY7RaEJxtrg&submissionId=e515b84d-63ae-e316-e4fb-af4fc4c84604" to="/"><AiIcons.AiFillLinkedin/></a>
                            <a className="linkedin" href="https://www.facebook.com/2rpnetservicos/" to="/"><AiIcons.AiFillFacebook/></a>
                            <a className="linkedin" href="https://www.youtube.com/channel/UC9n0XxkktvDXpsVoc1s5FQg" to="/"><AiIcons.AiFillYoutube/></a>
                        </div>
                    </div>
                </div>
                <span className="rightsReserved"><BiIcons.BiCopyright />Todos os direitos reservados - 2022</span>
            </footer>
        )
    }
}
export default Footer