import "../../assets/css/style.css"
import VLibras from '@djpfs/react-vlibras'

//components
import Footer from '../../components/footer/footer'
import Navbar from '../../components/menu/Navbar'


const NotFound = () => {
  //verificar se o usuario está registrado(token)

  return (
    <div>
      <Navbar/>
      <VLibras/>
      <h1 className="test">Página não encontrada :(</h1>
      <Footer/>
    </div>

  );
}

export default NotFound;