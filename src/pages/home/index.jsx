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
              <a className="play-button">▶</a>
              <a className="details-button">Ver detalhes</a>
            </div>
            <div className="card1">
              <img src={Azul_Home} className="card1-img"/>
              <h5>Assistente 1</h5>
              <a className="play-button">▶</a>
              <a className="details-button">Ver detalhes</a>
            </div>
            <div className="card1">
              <img src={Azul_Home} className="card1-img"/>
              <h5>Assistente 1</h5>
              <a className="play-button">▶</a>
              <a className="details-button">Ver detalhes</a>
            </div>
            <div className="card1">
              <img src={Azul_Home} className="card1-img"/>
              <h5>Assistente 1</h5>
              <a className="play-button">▶</a>
              <a className="details-button">Ver detalhes</a>
            </div>
          </form>
        </div>
      </div>
      <div className="body-container">
        <form>
          <h2 className="body-title-task">Minhas Tarefas</h2>
            <div className="card-body-content">
              <h3 className="title-card-content">Título</h3>
              <p className="text-body1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p className="data-body">Data de entrega : xx/xx/xxxx</p>
            </div>
            <div className="card-body-content">
              <h3 className="title-card-content">Título</h3>
              <p className="text-body1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p className="data-body">Data de entrega : xx/xx/xxxx</p>
            </div>
            <div className="card-body-content">
              <h3 className="title-card-content">Título</h3>
              <p className="text-body1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p className="data-body">Data de entrega : xx/xx/xxxx</p>
            </div>
        </form>


      </div>
    </div>
  );
}

export default App;