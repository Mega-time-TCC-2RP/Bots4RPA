// Componetizacoes
import Navbar from '../../components/menu/Navbar'
import Header from '../../components/header/header.js'

//libras
import VLibras from '@djpfs/react-vlibras'

// Servicos
import { parseJwt } from '../../services/auth';


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

const taskCustom = {
  content: {
    // width: 1,
    // height: 1,
    // backgroundcolor: rgba(0, 255, 255, 0.75),
    // boxShadow: '',
    // marginTop: '1rem',
    // marginBottom: 'auto',
    // right: '0',
    // left: '0',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '1000px',
    height: '90vh',
    background: 'var(--WHITE)',
    boxShadow: 'var(--darkShadow)',
    borderRadius: '30px'
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function App() {
  const [workflowList, setWorkflowList] = useState([]);
  const [titleTask, setTitleTask] = useState('');
  const [descriptionTask, setDescriptionTask] = useState('');
  const [statusTask, setStatusTask] = useState();
  const [endDate, setEndDate] = useState();
  const [idQuest, setIdQuest] = useState();

  const [taskIsOpen, setTaskIsOpen] = useState(false);
  const [newTaskIsOpen, setNewTaskIsOpen] = useState(false);
  const [onBoardingIsOpen, setOnBoardingIsOpen] = useState(false);

  function handleOpenOnBoarding() {
    setOnBoardingIsOpen(true)
  }
  function handleCloseOnBoarding() {
    setOnBoardingIsOpen(false)
  }
  function handleOpenNewTask() {
    // for (let index = 0; index < 32; index++) {
    //   document.getElementById("calend" + index).style.cursor = "pointer";
    // }
    // for (let i = 0; i < 32; i++) {

    // }
    setStatusTask(1)
    setNewTaskIsOpen(true)
    // setBtnStyle()

    // .classList.add('.btnCalendarModal');
  }
  function handleCloseNewTask() {
    // for (let index = 0; index < 32; index++) {
    //   document.getElementById("calend" + index).style.cursor = "pointer";
    // }
    setNewTaskIsOpen(false)
  }

  function handleOpenTask(e) {
    e.preventDefault();
    setTaskIsOpen(true)
  }

  function handleCloseTask(e) {
    e.preventDefault();
    setTaskIsOpen(false)
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

  // Consumo da API - Patch Status - Atualizacao de estado do card
  const patchStatusTask = (event) => {
    event.preventDefault()

    let updateTask = {
      idStatus: statusTask
    }

    axios
      .patch('http://grupo7.azurewebsites.net/api/Quests/ChangeStatus/' + statusTask, updateTask, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
        }
      })
  }

  // Form Nova Tare
  const formNewTask = (submit_newtask) => {
    submit_newtask.preventDefault()
    // console.log(`O título da Tarefa é: ${titleTask} e a descrição dela é ${descriptionTask}`);

    let createNewTask = {
      idStatus: statusTask,
      endDate: endDate,
      title: titleTask,
      workflowDescription: descriptionTask
    }

    if (endDate === "" || endDate === null || titleTask === "" || titleTask === null || descriptionTask === "" || descriptionTask === null) {
      console.log("Task cannot be empty!");
      alert("Por favor, preencha todos os campos!")
      return
    } else {
      axios.post(apiPlatform + '/Workflows', createNewTask, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
        }
      })
        .then((response) => {
          if (response.status === 201 || response.status === 200) {
            console.log("New Task Created!");
            setEndDate();
            setTitleTask("");
            setDescriptionTask("");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .then(handleCloseNewTask())
        .then(getWorkflowList())
    }

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
      // console.log(workflowList[this]);
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

      // Regra de deixar pronto para mudar
    }

    function drop() {
      // console.log('Droping Card');
      this.classList.remove('over')

      // Regra da mudança de Status
    }
  }

  const month = () => {
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    let indexMonth = new Date().getMonth()

    let setMonth = months[indexMonth]

    // console.log(months[indexMonth]);

    document.getElementById("monthCalendar").innerHTML = setMonth
  }

  useEffect(() => {
    //getWorkflowList()
    day()
    month()
    dragNDrop()
  });

  if (parseJwt().Role == "3" || parseJwt().Role == "2") {
    return (

      <div className='pageTaskCalendar'>
        {/* <Header /> */}
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
                        <span className='p textoBonito'>Sinta-se a vontade a tela de Tarefas!</span>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide-OnBoarding-social">
                      <div className="boardingContainer">
                        <span className='p textoBonito'>Aqui é onde você poderá ver o desenvolvimento de tarefas, tanto as pessoais, quanto a dos seus assistentes!</span>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide-OnBoarding-social">
                      <div className="boardingContainer">
                        <span className='p textoBonito'>Cada tarefa contém um título, descrição, tempo de entrega, dias de execução e, logicamente, a lista de tarefas.</span>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide-OnBoarding-social">
                      <div className="boardingContainer">
                        <span className='p textoBonito'>Visualize a sequência de ações que o seu assistente está realizando, e tarefas que você mesmo poderá criar!</span>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide-OnBoarding-social">
                      <div className="boardingContainer">
                        <span className='p textoBonito'>Organize seu dia-a-dia com este Painel Organizacional, e você nunca mais ficará perdido.</span>
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
              <div id="todoID"
                className="toDo">
                <div className="taskTitle">
                  <h5 className="h5">A Fazer</h5>
                </div>
                <div
                  // key={myQuests.idWorkflow
                  // && myQuests.idStatus === 1
                  // }
                  className="taskSpace">
                  {
                    workflowList.map((myQuests, idx) => {
                      return (
                        <div
                          key={(myQuests.idWorflow) > (new Date().getDate() - 1)}
                          onClick={handleOpenTask}
                          className="cardTask" draggable="true">
                          {/* <div className="p">Lorem Ipsum is simply dummy text.</div> */}

                          <div
                            className="p"
                          >{myQuests.title}</div>
                          <Modal
                            isOpen={taskIsOpen}
                            onRequestClose={handleCloseTask}
                            style={taskCustom} >
                            <div className="modalQuestsOneTask">
                              <div className="headerModalOne">
                                <div className="title h2">{myQuests.title}</div>
                                <input type="button" className="exit h5" value='X' onClick={handleCloseNewTask} />
                              </div>
                              <div className="bodyModalQuest">
                                <div className="descriptionArea">
                                  <label for="descTask" className="h5">Descrição da Tarefa:</label>
                                  <div id="descTask" className="p">{myQuests.workflowDescription}</div>
                                </div>
                                <div className="dateArea">
                                  <div className="h5">Data de Entrega:</div>
                                  <div className="p dateOneTask">{myQuests.endDate}</div>
                                </div>
                                <input className="button btnNewTask marginBtnModalTask"
                                  type="button"
                                  onClick={handleCloseTask}
                                  value="Fechar Tarefa" />
                              </div>
                            </div>
                          </Modal>
                        </div>
                      )
                    }
                    )
                  }
                </div>
              </div>

              <div id="doID"
                className="do">
                <div className="taskTitle">
                  <h5 className="h5">Fazendo</h5>
                </div>
                <div
                  // key={myQuests.idWorkflow && myQuests.idStatus === 2}
                  className="taskSpace">
                  {/* <div className="cardTask" draggable="true">
                  <div className="p">Lorem Ipsum is simply dummy text.</div>
                  <div className="p">
                    {myQuests.title}
                  </div>
                </div> */}
                </div>
              </div>

              <div id="doneID"
                className="done">
                <div className="taskTitle">
                  <h5 className="h5">Feito</h5>
                </div>
                <div
                  // key={myQuests.idWorkflow && myQuests.idStatus === 3}
                  className="taskSpace">
                  {/* <div className="cardTask" draggable="true">
                  <div className="p">Lorem Ipsum is simply dummy text.</div>
                  <div className="p">
                    {myQuests.title}
                  </div>
                </div> */}
                </div>
              </div>

            </section>
            {/* )
             }
             )
           } */}
            <div className="calendarAndBtn">
              <section className="calendar p">
                <div className="calendarTitle"><h5 id="monthCalendar" className="h5">Calendário</h5></div>
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
                value="Nova Tarefa"
                onClick={handleOpenNewTask} />
              <Modal
                isOpen={newTaskIsOpen}
                onRequestClose={handleCloseNewTask}
                style={taskCustom} >
                <div className="modalQuests">
                  <div className="headerModal">
                    <div className="title h2">Nova Tarefa</div>
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
                          <label for="descriptionInput" className="h5">Descrição</label>
                          <input
                            id="descriptionInput"
                            className="input"
                            type="text"
                            placeholder="Insira pontos importantes para a resolução da tarefa..."
                            onChange={(event) => setDescriptionTask(event.target.value)} />
                          <label for="dayAndMonthWorkflow" className="h5 labelDateTask">Selecione a Data de Entrega da Tarefa</label>
                          <input
                            id="dayAndMonthWorkflow"
                            className="input inputQuestsDate"
                            type="date"
                            onChange={(event) => setEndDate(event.target.value)} />
                          <input
                            className="btnNewTask button btnSpaceNewTask"
                            type="submit"
                            value="Adicionar Tarefa" />
                        </div>
                      </div>
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
}

// 1. Arrumar bug do loop infinito
// 2. Conseguir realizar o patch em cada tabelinha
// 3. Fazer a listagem de cada tabela para seu status
// 4. Arrumar o calendário para pelo menos mostrar os dias da semana
// e se der certo, fazer um calendário q transita entre os meses

// 5. Responsividade da tela de tarefas... Como? nao sei, mai vai ter que
// ser feito de uma forma ou de outra

export default App;