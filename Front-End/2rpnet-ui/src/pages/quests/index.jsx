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
import "../../assets/css/components/navbar.css"
import { useEffect, useState } from 'react'
import axios from 'axios';

//onboarding
import '../../assets/css/pages/onBoarding.css'
import Modal from 'react-modal';
import Blue_Head from '../../assets/img/Blue_Head.png'
import onBoardingBot from '../../assets/img/onBoardingBot.png'
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const stylesCustom = {
  content: {
    width: 1,
    height: 1,
    // backgroundcolor: rgba(0, 255, 255, 0.75),
    boxShadow: ''
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function App() {
  const [workflowList, setWorkflowList] = useState([]);
  const [titleTask, setTitleTask] = useState('');
  const [descriptionTask, setDescriptionTask] = useState('');
  const [statusTask, setStatusTask] = useState();

  const [newTaskIsOpen, setNewTaskIsOpen] = useState(false);
  const [onBoardingIsOpen, setOnBoardingIsOpen] = useState(false);

  function handleOpenOnBoarding() {
    setOnBoardingIsOpen(true)
  }
  function handleCloseOnBoarding() {
    setOnBoardingIsOpen(false)
  }
  // let btnStyle = document.querySelectorAll('.btnCalendar');

  const btnStyle = () => {
    for (let i = 0; i < 32; i++) {
      let g = i;
      document.getElementById("calendM" + g).classList.add(".btnCalendarModal");
    }
  }
  // const setBtnStyle = () => {
  // }
  function handleOpenNewTask() {
    // for (let index = 0; index < 32; index++) {
    //   document.getElementById("calend" + index).style.cursor = "pointer";      
    // }
    // for (let i = 0; i < 32; i++) {

    // }
    setNewTaskIsOpen(true).then(btnStyle())
    // setBtnStyle()
    
    // .classList.add('.btnCalendarModal');
  }
  function handleCloseNewTask() {
    // for (let index = 0; index < 32; index++) {
    //   document.getElementById("calend" + index).style.cursor = "pointer";      
    // }
    setNewTaskIsOpen(false)
  }

  // Const da API = http://grupo7.azurewebsites.net/api
  const apiPlatform = 'http://grupo7.azurewebsites.net/api'

  // Consumo da API - GET
  const getWorkflowList = () => {
    axios(apiPlatform + '/Workflows/GetMine', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
      }
    })
      .then(response => {
        if (response.status === 200) {
          // console.log(response.data);
          setWorkflowList(response.data);
        }
      })
      .catch(erro => console.log(erro));
  }

  // Consumo da API - Patch Status
  // const patchStatusTask = () => {
  //   axios
  //   .patch('http://grupo7.azurewebsites.net/api/Quests/ChangeStatus/' + statusTask, {
  //     headers: {
  //       'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
  //     }
  //   })
  // }

  // Form Nova Tare
  const formNewTask = (submit_newtask) => {
      submit_newtask.preventDefault()
      // console.log(`O título da Tarefa é: ${titleTask} e a descrição dela é ${descriptionTask}`);

      let createNewTask = {
        title: titleTask,
        workflowDescription: descriptionTask
      }

      axios.post(apiPlatform + '/Workflows', createNewTask, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
        }
      })
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          console.log("New Task Created!");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .then(handleCloseNewTask())
      .then(getWorkflowList())
  }

  // Funcionalidade da Data
  const day = () => {
    let date = new Date().getDate()

    // console.log(`O dia de hoje é: ${date}`);

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
    getWorkflowList()
    // getQuestList()
    // getQuestList, []
    day()
    dragNDrop()
  });

  return (

    <div className='pageTaskCalendar'>
      <Header />
      <Navbar />
      <div className='body-pd'>
        <VLibras />
        <img
          src={onBoardingBot}
          onClick={handleOpenOnBoarding}
          className="img-onboarding"
        />
        <Modal
          isOpen={onBoardingIsOpen}
          onRequestClose={handleCloseOnBoarding}
          style={stylesCustom}
        >
          <div className="top-container-onboarding" >
            <div className="background-body" >
              <div className="boarding-image">
                <img className="bot-img" src={Blue_Head} />
              </div>
              <div className="body-content">
                <h2>Assistente</h2>
                <Swiper
                  pagination={{
                    type: "fraction",
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}

                  className="swiperHomeTasks-social"
                >
                  <SwiperSlide className="swiper-slide-OnBoarding-social">
                    <div className="boardingContainer">
                      <span className='bayer'>Sinta-se a vontade a tela de Tarefas!</span>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide-OnBoarding">
                    <div className="boardingContainer">
                      <span className='bayer'>Aqui é onde você poderá ver o desenvolvimento de tarefas, tanto as pessoais, quanto a dos seus assistentes!</span>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide-OnBoarding">
                    <div className="boardingContainer">
                      <span className='bayer'>Cada tarefa contém um título, descrição, tempo de entrega, dias de execução e, logicamente, a lista de tarefas.</span>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide-OnBoarding">
                    <div className="boardingContainer">
                      <span className='bayer'>Visualize a sequência de ações que o seu assistente está realizando, e tarefas que você mesmo poderá criar!</span>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide-OnBoarding">
                    <div className="boardingContainer">
                      <span className='bayer'>Organize seu dia-a-dia com este Painel Organizacional, e você nunca mais ficará perdido.</span>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>

            </div>
          </div>
        </Modal>
        <h2 className="pageTitle h2">Painel Organizacional</h2>
        <div className='taskCalendar'>
          <section className="task">
            <div id="testtodo"
              className="toDo">
              <div className="taskTitle">
                <h5 className="h5">A Fazer</h5>
              </div>
              {
                workflowList.map((myQuests) => {
                  return (
                    <div
                      // key={myQuests.idWorkflow 
                      // && myQuests.idStatus === 1
                      // } 
                      className="taskSpace">
                      <div
                        className="cardTask" draggable="true">
                        {/* <div className="p">Lorem Ipsum is simply dummy text.</div> */}
                        <div
                          key={myQuests.idWorflow}
                          className="p">{myQuests.title}</div>
                      </div>
                    </div>
                  )
                }
                )
              }
            </div>

            <div id="testdo"
              className="do">
              <div className="taskTitle">
                <h5 className="h5">Fazendo</h5>
              </div>
              <div
                // key={myQuests.idWorkflow && myQuests.idStatus === 2} 
                className="taskSpace">
                <div className="cardTask" draggable="true">
                  {/* <div className="p">Lorem Ipsum is simply dummy text.</div> */}
                  <div className="p">
                    {/* {myQuests.title} */}
                  </div>
                </div>
              </div>
            </div>

            <div id="testdone"
              className="done">
              <div className="taskTitle">
                <h5 className="h5">Feito</h5>
              </div>
              <div
                // key={myQuests.idWorkflow && myQuests.idStatus === 3} 
                className="taskSpace">
                <div className="cardTask" draggable="true">
                  {/* <div className="p">Lorem Ipsum is simply dummy text.</div> */}
                  <div className="p">
                    {/* {myQuests.title} */}
                  </div>
                </div>
              </div>
            </div>

          </section>
          {/* )
             }
             )
           } */}
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
            {/* <Calendar /> */}
            <input
              className="btnNewTask button"
              type="button"
              value="Nova Tarefa"
              onClick={handleOpenNewTask} />
            <Modal
              isOpen={newTaskIsOpen}
              onRequestClose={handleCloseNewTask}
              style={stylesCustom} >
              <div className="modalQuests">
                <div className="headerModal">
                  <div className="title h3">Nova Tarefa</div>
                  <input type="button" className="exit h5" value='X' onClick={handleCloseNewTask} />
                </div>
                <form onSubmit={formNewTask}>
                <div className="bodyModalQuest">
                  <div className="inputsQuests">
                    <div className="inputQuests">
                      <label for="titleInput" className="h5">Título</label>
                      <input 
                      id="titleInput" 
                      className="input" 
                      type="text" 
                      placeholder="Insira o Título da tarefa..."
                      onChange={(event) => setTitleTask(event.target.value)} />
                    </div>
                    <div className="inputQuests">
                      <label for="descriptionInput" className="h5">Descrição</label>
                      <input 
                      id="descriptionInput" 
                      className="input" 
                      type="text"
                      placeholder="Insira pontos importantes para a resolução da tarefa..." 
                      onChange={(event) => setDescriptionTask(event.target.value)}/>
                    </div>
                  </div>
                  <section className="calendar p">
                    <div className="calendarTitle">
                      <h5 className="h5">Selecione a Data</h5>
                    </div>
                    <input id="calendM1" className="btnCalendar p btnCalendarModal" type="button" value="1" />
                    <input id="calendM2" className="btnCalendar p btnCalendarModal" type="button" value="2" />
                    <input id="calendM3" className="btnCalendar p btnCalendarModal" type="button" value="3" />
                    <input id="calendM4" className="btnCalendar p btnCalendarModal" type="button" value="4" />
                    <input id="calendM5" className="btnCalendar p btnCalendarModal" type="button" value="5" />
                    <input id="calendM6" className="btnCalendar p btnCalendarModal" type="button" value="6" />
                    <input id="calendM7" className="btnCalendar p btnCalendarModal" type="button" value="7" />
                    <input id="calendM8" className="btnCalendar p btnCalendarModal" type="button" value="8" />
                    <input id="calendM9" className="btnCalendar p btnCalendarModal" type="button" value="9" />
                    <input id="calendM10" className="btnCalendar p btnCalendarModal" type="button" value="10" />
                    <input id="calendM11" className="btnCalendar p btnCalendarModal" type="button" value="11" />
                    <input id="calendM12" className="btnCalendar p btnCalendarModal" type="button" value="12" />
                    <input id="calendM13" className="btnCalendar p btnCalendarModal" type="button" value="13" />
                    <input id="calendM14" className="btnCalendar p btnCalendarModal" type="button" value="14" />
                    <input id="calendM15" className="btnCalendar p btnCalendarModal" type="button" value="15" />
                    <input id="calendM16" className="btnCalendar p btnCalendarModal" type="button" value="16" />
                    <input id="calendM17" className="btnCalendar p btnCalendarModal" type="button" value="17" />
                    <input id="calendM18" className="btnCalendar p btnCalendarModal" type="button" value="18" />
                    <input id="calendM19" className="btnCalendar p btnCalendarModal" type="button" value="19" />
                    <input id="calendM20" className="btnCalendar p btnCalendarModal" type="button" value="20" />
                    <input id="calendM21" className="btnCalendar p btnCalendarModal" type="button" value="21" />
                    <input id="calendM22" className="btnCalendar p btnCalendarModal" type="button" value="22" />
                    <input id="calendM23" className="btnCalendar p btnCalendarModal" type="button" value="23" />
                    <input id="calendM24" className="btnCalendar p btnCalendarModal" type="button" value="24" />
                    <input id="calendM25" className="btnCalendar p btnCalendarModal" type="button" value="25" />
                    <input id="calendM26" className="btnCalendar p btnCalendarModal" type="button" value="26" />
                    <input id="calendM27" className="btnCalendar p btnCalendarModal" type="button" value="27" />
                    <input id="calendM28" className="btnCalendar p btnCalendarModal" type="button" value="28" />
                    <input id="calendM29" className="btnCalendar p btnCalendarModal" type="button" value="29" />
                    <input id="calendM30" className="btnCalendar p btnCalendarModal" type="button" value="30" />
                    <div className="lastCalend"><input id="calendM31" className="btnCalendar p btnCalendarModal" type="button" value="31" /></div>
                  </section>
                  <input 
                  className="btnNewTask button" 
                  type="submit" 
                  value="Adicionar Tarefa" />
                </div>
                </form>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;