// Componetizacoes
import Navbar from '../../components/menu/Navbar'
import Header from '../../components/header/header.js'

//libras
import VLibras from '@djpfs/react-vlibras'


// CSS
import "../../assets/css/style.css"
import "../../assets/css/pages/taskCalendar.css"
import "../../assets/css/components/fonts.css"
import "../../assets/css/components/button.css"
import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {
  const [questsList, setQuestList] = useState([]);
  const [titleTask, setTitleTask] = useState('');
  
  // Consumo da API
  const getQuestList = () => {
    axios('https://grupo7.azurewebsites.net/api/quests', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
            }
        })
    .then(resposta => {
      if(resposta.status === 200){
        console.log(resposta);
        setQuestList( resposta.data );
      }
    })
    .catch(erro => console.log(erro));
  }

  // Funcionalidade da Data
  const day = () => {



    let date = new Date().getDate()

    console.log(`O dia de hoje é: ${date}`);
    
    document.getElementById("calend" + date).style.color = "var(--WHITE)";
    document.getElementById("calend" + date).style.backgroundColor = "var(--PrimaryColor1)";
  }

  // Funcionalidade do Drag n' Drop
  const dragNDrop = () => {
    const cardTask = document.querySelectorAll('.cardTask')
    const taskSpace = document.querySelectorAll('.taskSpace')

    // Cards
    cardTask.forEach((card) => {
      card.addEventListener('dragstart', dragstart)
      card.addEventListener('drag', drag)
      card.addEventListener('dragend', dragend)
    })

    function dragstart() {
      // console.log('Starting Drag');
      taskSpace.forEach(taskSpace => taskSpace.classList.add('highlights'))
      this.classList.add('isDragging')
    }

    function drag() {
      // console.log('Dragging');
    }

    function dragend() {
      // console.log('Ending Drag');
      taskSpace.forEach(taskSpace => taskSpace.classList.remove('highlights'))
      this.classList.remove('isDragging')
    }

    // Área dos Cards
    taskSpace.forEach((space) => {
      space.addEventListener('dragenter', dragenter)
      space.addEventListener('dragover', dragover)
      space.addEventListener('dragleave', dragleave)
      space.addEventListener('drop', drop)
    })

    function dragenter() {
      // console.log('Entering in Space');
      this.classList.add('over')
    }

    function dragover() {
      // console.log('Overing Card');
      this.classList.add('over')

      const cardBeingDragged = document.querySelector('.isDragging')

      this.appendChild(cardBeingDragged);
    }

    function dragleave() {
      // console.log('Leaving Card');
      this.classList.remove('over')
    }

    function drop() {
      // console.log('Droping Card');
      this.classList.remove('over')
    }
  }

  useEffect(() => {
    getQuestList()
    // getQuestList, []
    day()
    dragNDrop()
  });


  return (

    <div className='pageTaskCalendar'>
      <Header />
      <Navbar />
      <VLibras />
      <h2 className="pageTitle h2">Painel Organizacional</h2>
      <div className='taskCalendar'>
        <section className="task">
          <div className="toDo">
            <div className="taskTitle">
              <h5 className="h5">A Fazer</h5>
            </div>
            <div className="taskSpace">
              <div className="cardTask" draggable="true">
                <div className="p">Lorem Ipsum is simply dummy text.</div>
              </div>
            </div>
          </div>
          <div className="do">
            <div className="taskTitle">
              <h5 className="h5">Fazendo</h5>
            </div>
            <div className="taskSpace">
              <div className="cardTask" draggable="true">
                <div className="p">Lorem Ipsum is simply dummy text.</div>
              </div>
            </div>
          </div>
          <div className="done">
            <div className="taskTitle">
              <h5 className="h5">Feito</h5>
            </div>
            <div className="taskSpace">
              <div className="cardTask" draggable="true">
                <div className="p">Lorem Ipsum is simply dummy text.</div>
              </div>
            </div>
          </div>
        </section>
        <div className="calendarAndBtn">
          <section className="calendar p">
            <div className="calendarTitle"><h5 className="h5">Calendário</h5></div>
            <input id="calend1"
              className="btnCalendar p"
              type="button"
              value="1" />
            <input id="calend2"
              className="btnCalendar p"
              type="button"
              value="2" />
            <input id="calend3"
              className="btnCalendar p"
              type="button"
              value="3" />
            <input id="calend4"
              className="btnCalendar p"
              type="button"
              value="4" />
            <input id="calend5"
              className="btnCalendar p"
              type="button"
              value="5" />
            <input id="calend6"
              className="btnCalendar p"
              type="button"
              value="6" />
            <input id="calend7"
              className="btnCalendar p"
              type="button"
              value="7" />
            <input id="calend8"
              className="btnCalendar p"
              type="button"
              value="8" />
            <input id="calend9"
              className="btnCalendar p"
              type="button"
              value="9" />
            <input id="calend10"
              className="btnCalendar p"
              type="button"
              value="10" />
            <input id="calend11"
              className="btnCalendar p"
              type="button"
              value="11" />
            <input id="calend12"
              className="btnCalendar p"
              type="button"
              value="12" />
            <input id="calend13"
              className="btnCalendar p"
              type="button"
              value="13" />
            <input id="calend14"
              className="btnCalendar p"
              type="button"
              value="14" />
            <input id="calend15"
              className="btnCalendar p"
              type="button"
              value="15" />
            <input id="calend16"
              className="btnCalendar p"
              type="button"
              value="16" />
            <input id="calend17"
              className="btnCalendar p"
              type="button"
              value="17" />
            <input id="calend18"
              className="btnCalendar p"
              type="button"
              value="18" />
            <input id="calend19"
              className="btnCalendar p"
              type="button"
              value="19" />
            <input id="calend20"
              className="btnCalendar p"
              type="button"
              value="20" />
            <input id="calend21"
              className="btnCalendar p"
              type="button"
              value="21" />
            <input id="calend22"
              className="btnCalendar p"
              type="button"
              value="22" />
            <input id="calend23"
              className="btnCalendar p"
              type="button"
              value="23" />
            <input id="calend24"
              className="btnCalendar p"
              type="button"
              value="24" />
            <input id="calend25"
              className="btnCalendar p"
              type="button"
              value="25" />
            <input id="calend26"
              className="btnCalendar p"
              type="button"
              value="26" />
            <input id="calend27"
              className="btnCalendar p"
              type="button"
              value="27" />
            <input id="calend28"
              className="btnCalendar p"
              type="button"
              value="28" />
            <input id="calend29"
              className="btnCalendar p"
              type="button"
              value="29" />
            <input id="calend30"
              className="btnCalendar p"
              type="button"
              value="30" />
            <div className="lastCalend"><input id="calend31" 
              className="btnCalendar p"
              type="button"
              value="31" /></div>
          </section>
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