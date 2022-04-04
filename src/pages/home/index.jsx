import "../../assets/css/style.css"
import Navbar from '../../components/menu/Navbar'

//img:
import Azul_Home from '../../assets/img/Azul_Home.png'


//Components:
import Footer from '../../components/footer/footer'


{/* <Navbar/> */}

function App() {

  return (
    <div>
      <div className="top-container">
        <div className="top-buttons">
          <form>
          <button className="button-assistant">Criar Assistente</button>
          <input type='search' placeholder="Buscar assistente" id="Assistente"></input>
          </form>
          <form>
            <div className="card1">
              <img src={Azul_Home} className="card1-img"/>
              <h5>Assistente 1</h5>
              
              <a>Ver detalhes</a>
            </div>
          </form>
        </div>
      </div>
      <div className="body-container">
        <form>
          <h2 className="body-title-task">Minhas Tarefas</h2>
        </form>
      </div>
    </div>
  );
}

export default App;