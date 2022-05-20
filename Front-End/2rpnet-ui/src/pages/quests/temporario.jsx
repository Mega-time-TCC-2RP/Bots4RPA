export default function TempQuests() {


    // <-- Drag and Drop, mudar state -->

    // const toDoTask = document.querySelector('.todo')
    // const doTask = document.querySelector('.do')
    // const doneTask = document.querySelector('.done')
    // const toDoTask = document.getElementById("testtodo")
    // const doTask = document.getElementById("testdo")
    // const doneTask = document.getElementById("testdone")

          // if (toDoTask) {
      // setStatusTask(1)
      //   console.log("Alterado para o tipo 'A Fazer'");
      // }
      // if (doTask) {
      //   console.log("Alterado para o tipo 'Fazendo'");
      // }
      // if (doneTask) {
      //   console.log("Alerado para o tipo 'Feito'");
      // } else console.log("Ocorreu um Erro ao alterar a Task! Inserindo tarefa em modo a Fazer.");
      // switch (cardTask) {
      //   case toDoTask: /*setStatusTask(1)*/ console.log("Alterado para o tipo 'A Fazer'");
      //     break;
      //   case doTask: /*setStatusTask(2)*/ console.log("Alterado para o tipo 'Fazendo'");
      //   break;
      //   case doneTask: /*setStatusTask(3)*/ console.log("Alerado para o tipo 'Feito'");
      //   break;
      //   default: /*setStatusTask(1) &&*/ console.log("Ocorreu um Erro ao alterar a Task! Inserindo tarefa em modo a Fazer.");
      //     break;
      // }


    // <-- Componetização do Calendário -->

  // const Calendar = () => {
  //   return (
  //   <section className="calendar p">
  //             <div className="calendarTitle">
  //               <h5 className="h5">Calendário</h5>
  //               {/* <h5 className="h5">{titulo}</h5> */}
  //             </div>
  //             <input id="calend1"
  //               className="btnCalendar p"
  //               type="button"
  //               value="1" />
  //             <input id="calend2"
  //               className="btnCalendar p"
  //               type="button"
  //               value="2" />
  //             <input id="calend3"
  //               className="btnCalendar p"
  //               type="button"
  //               value="3" />
  //             <input id="calend4"
  //               className="btnCalendar p"
  //               type="button"
  //               value="4" />
  //             <input id="calend5"
  //               className="btnCalendar p"
  //               type="button"
  //               value="5" />
  //             <input id="calend6"
  //               className="btnCalendar p"
  //               type="button"
  //               value="6" />
  //             <input id="calend7"
  //               className="btnCalendar p"
  //               type="button"
  //               value="7" />
  //             <input id="calend8"
  //               className="btnCalendar p"
  //               type="button"
  //               value="8" />
  //             <input id="calend9"
  //               className="btnCalendar p"
  //               type="button"
  //               value="9" />
  //             <input id="calend10"
  //               className="btnCalendar p"
  //               type="button"
  //               value="10" />
  //             <input id="calend11"
  //               className="btnCalendar p"
  //               type="button"
  //               value="11" />
  //             <input id="calend12"
  //               className="btnCalendar p"
  //               type="button"
  //               value="12" />
  //             <input id="calend13"
  //               className="btnCalendar p"
  //               type="button"
  //               value="13" />
  //             <input id="calend14"
  //               className="btnCalendar p"
  //               type="button"
  //               value="14" />
  //             <input id="calend15"
  //               className="btnCalendar p"
  //               type="button"
  //               value="15" />
  //             <input id="calend16"
  //               className="btnCalendar p"
  //               type="button"
  //               value="16" />
  //             <input id="calend17"
  //               className="btnCalendar p"
  //               type="button"
  //               value="17" />
  //             <input id="calend18"
  //               className="btnCalendar p"
  //               type="button"
  //               value="18" />
  //             <input id="calend19"
  //               className="btnCalendar p"
  //               type="button"
  //               value="19" />
  //             <input id="calend20"
  //               className="btnCalendar p"
  //               type="button"
  //               value="20" />
  //             <input id="calend21"
  //               className="btnCalendar p"
  //               type="button"
  //               value="21" />
  //             <input id="calend22"
  //               className="btnCalendar p"
  //               type="button"
  //               value="22" />
  //             <input id="calend23"
  //               className="btnCalendar p"
  //               type="button"
  //               value="23" />
  //             <input id="calend24"
  //               className="btnCalendar p"
  //               type="button"
  //               value="24" />
  //             <input id="calend25"
  //               className="btnCalendar p"
  //               type="button"
  //               value="25" />
  //             <input id="calend26"
  //               className="btnCalendar p"
  //               type="button"
  //               value="26" />
  //             <input id="calend27"
  //               className="btnCalendar p"
  //               type="button"
  //               value="27" />
  //             <input id="calend28"
  //               className="btnCalendar p"
  //               type="button"
  //               value="28" />
  //             <input id="calend29"
  //               className="btnCalendar p"
  //               type="button"
  //               value="29" />
  //             <input id="calend30"
  //               className="btnCalendar p"
  //               type="button"
  //               value="30" />
  //             <div className="lastCalend"><input id="calend31"
  //               className="btnCalendar p"
  //               type="button"
  //               value="31" /></div>
  //           </section>
  //   )
  // }

  // Parte modal da Tarefa nova
  // <div className="dayAndMonth">
  //                 <section className="calendar p">
  //                   <div className="calendarTitle">
  //                     <h5 className="h5">Selecione a Data</h5>
  //                   </div>
  //                   <input id="calendM1" className="btnCalendar p btnCalendarModal" type="button" value="1" />
  //                   <input id="calendM2" className="btnCalendar p btnCalendarModal" type="button" value="2" />
  //                   <input id="calendM3" className="btnCalendar p btnCalendarModal" type="button" value="3" />
  //                   <input id="calendM4" className="btnCalendar p btnCalendarModal" type="button" value="4" />
  //                   <input id="calendM5" className="btnCalendar p btnCalendarModal" type="button" value="5" />
  //                   <input id="calendM6" className="btnCalendar p btnCalendarModal" type="button" value="6" />
  //                   <input id="calendM7" className="btnCalendar p btnCalendarModal" type="button" value="7" />
  //                   <input id="calendM8" className="btnCalendar p btnCalendarModal" type="button" value="8" />
  //                   <input id="calendM9" className="btnCalendar p btnCalendarModal" type="button" value="9" />
  //                   <input id="calendM10" className="btnCalendar p btnCalendarModal" type="button" value="10" />
  //                   <input id="calendM11" className="btnCalendar p btnCalendarModal" type="button" value="11" />
  //                   <input id="calendM12" className="btnCalendar p btnCalendarModal" type="button" value="12" />
  //                   <input id="calendM13" className="btnCalendar p btnCalendarModal" type="button" value="13" />
  //                   <input id="calendM14" className="btnCalendar p btnCalendarModal" type="button" value="14" />
  //                   <input id="calendM15" className="btnCalendar p btnCalendarModal" type="button" value="15" />
  //                   <input id="calendM16" className="btnCalendar p btnCalendarModal" type="button" value="16" />
  //                   <input id="calendM17" className="btnCalendar p btnCalendarModal" type="button" value="17" />
  //                   <input id="calendM18" className="btnCalendar p btnCalendarModal" type="button" value="18" />
  //                   <input id="calendM19" className="btnCalendar p btnCalendarModal" type="button" value="19" />
  //                   <input id="calendM20" className="btnCalendar p btnCalendarModal" type="button" value="20" />
  //                   <input id="calendM21" className="btnCalendar p btnCalendarModal" type="button" value="21" />
  //                   <input id="calendM22" className="btnCalendar p btnCalendarModal" type="button" value="22" />
  //                   <input id="calendM23" className="btnCalendar p btnCalendarModal" type="button" value="23" />
  //                   <input id="calendM24" className="btnCalendar p btnCalendarModal" type="button" value="24" />
  //                   <input id="calendM25" className="btnCalendar p btnCalendarModal" type="button" value="25" />
  //                   <input id="calendM26" className="btnCalendar p btnCalendarModal" type="button" value="26" />
  //                   <input id="calendM27" className="btnCalendar p btnCalendarModal" type="button" value="27" />
  //                   <input id="calendM28" className="btnCalendar p btnCalendarModal" type="button" value="28" />
  //                   <input id="calendM29" className="btnCalendar p btnCalendarModal" type="button" value="29" />
  //                   <input id="calendM30" className="btnCalendar p btnCalendarModal" type="button" value="30" />
  //                   <div className="lastCalend"><input id="calendM31" className="btnCalendar p btnCalendarModal" type="button" value="31" /></div>
  //                 </section>
  //                 <section className="calendarMonth p">
  //                   <div className="calendarTitle">
  //                     <h5 className="h5">Selecione o Mês</h5>
  //                   </div>
  //                   <input id="calendM1" className="btnCalendarMonth p btnCalendarModal" type="button" value="Janeiro" />
  //                   <input id="calendM2" className="btnCalendarMonth p btnCalendarModal" type="button" value="Fevereiro" />
  //                   <input id="calendM3" className="btnCalendarMonth p btnCalendarModal" type="button" value="Março" />
  //                   <input id="calendM4" className="btnCalendarMonth p btnCalendarModal" type="button" value="Abril" />
  //                   <input id="calendM5" className="btnCalendarMonth p btnCalendarModal" type="button" value="Maio" />
  //                   <input id="calendM6" className="btnCalendarMonth p btnCalendarModal" type="button" value="Junho" />
  //                   <input id="calendM7" className="btnCalendarMonth p btnCalendarModal" type="button" value="Julho" />
  //                   <input id="calendM8" className="btnCalendarMonth p btnCalendarModal" type="button" value="Agosto" />
  //                   <input id="calendM9" className="btnCalendarMonth p btnCalendarModal" type="button" value="Setembro" />
  //                   <input id="calendM10" className="btnCalendarMonth p btnCalendarModal" type="button" value="Outubro" />
  //                   <input id="calendM11" className="btnCalendarMonth p btnCalendarModal" type="button" value="Novembro" />
  //                   <input id="calendM12" className="btnCalendarMonth p btnCalendarModal" type="button" value="Dezembro" />
  //                 </section>
  //                 </div>

//   .dayAndMonth {
//     display: flex;
//     flex-direction: row;
// }

// .calendarMonth {
//     border-radius: 30px;
//     margin: auto;
//     padding: 1rem;
//     box-shadow: 0px 4px 4px var(--ComplementaryColor4);
//     display: grid;
//     grid-template: repeat(4, 3rem) / repeat(3, 6rem);
//     grid-gap: 1rem;
//     background-color: #fff;
// }

// .btnCalendarMonth {
//     /* width: 3rem; */
//     /* height: 3rem; */
//     color: var(--BLACK);
//     font-weight: bold;
//     background-color: var(--ComplementaryColor1);
//     border: none;
//     border-radius: 30px;
// }
}