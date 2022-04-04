// Componetizacoes
import Navbar from '../../components/menu/Navbar'
import Header from '../../components/header/header.js'

// CSS
import "../../assets/css/style.css"
import "../../assets/css/pages/taskCalendar.css"
import "../../assets/css/components/fonts.css"
import "../../assets/css/components/button.css"

function App() {

  return (

    <div className='pageTaskCalendar'>
      {/* <Header /> */}
      {/* <Navbar /> */}
      <h3 className="pageTitle h3">Painel Organizacional</h3>
      <div className='taskCalendar'>
        <section className="task">
          <div className="toDo">
            <h5 className="taskTitle h5">A Fazer</h5>
          </div>
          <div className="do">
            <h5 className="taskTitle h5">Fazendo</h5>
          </div>
          <div className="done">
            <h5 className="taskTitle h5">Feito</h5>
          </div>
        </section>
        <div className="calendarAndBtn">
          <section className="calendar"></section>
          <input
            className="btnNewTask button"
            type="button"
            value="Nova Tarefa" />
        </div>
      </div>
    </div>

  );
}

export default App;
