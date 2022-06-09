// import Sidebar from "./sidebar/Sidebar";
import Navbar from "../../components/menu/Navbar";
import "../../assets/css/pages/dashboard.scss";
import Widget from "../dashboard/widget/widget";
import Featured from "../dashboard/featured/featured";
import Chart from "./chart/Chart";
import Table from "./table/Table";
import Footer from "../../components/footer/footer";
import axios, { Axios } from 'axios';
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [dags, setDags] = useState([]);
  const [assistantDag, setassistantDag] = useState(0);
  const [runsList, setRunsList] = useState([]);
  const [percentage, setPercentage] = useState(0); 

  const getData = () => {
    axios.get('https://grupo7.azurewebsites.net/api/Assistants', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('2rp-chave-autenticacao')
      }
    })
      .then((response) => {
        console.log(response.data)
        setDags(response.data)
      })

      .catch((err) => {
        console.log('deu errado: ' + err)
      })
  }

  const changeGraphsData = async (index) => {
    var runsFromDags = await dags[index].runs;
    var percentage = await dags[index].succesPercentage;
    var runs = [];
    runsFromDags.forEach((run) =>{
      var newRun = {};
      if(run.runStatus === true){
        newRun = {
          name: "Sucesso",
          Total: 1
        }
      }
      else{
        newRun = {
          name: "Falha",
          Total: 0
        }
      }
      runs.push(newRun);
    })
    setRunsList(runs);
    setPercentage(percentage);
    console.log(runsList);
  }

  useEffect(() => {
    getData();
    console.log(assistantDag)
  })

  return (
    <div>
      <Navbar />
      <div className="body-pd">
        <select value={assistantDag} onChange={(e) => {
          setassistantDag(e.target.value);
          changeGraphsData(e.target.value);
        }} className="select">
          <optgroup>
            <option value={undefined} selected>Selecione um assistente</option>
            {
              dags.filter((dag) => dag.runs !== undefined).map((dag, index) => {
                console.log('obaa dagggg')
                console.log(dag)
                  return(
                    <option value={index} key={index}>
                      {dag.assistantName + " - " + dag.employeeName}
                    </option>
                  )
              })
            }
          </optgroup>
        </select>
        {/* <Sidebar /> */}
        <div className="home">
          <div className="homeContainer">
            {/* <div className="widgets">
            <Widget type="user" />
            <Widget type="order" />
            <Widget type="earning" />
            <Widget type="balance" />
          </div> */}
            <div className="charts">
              <Featured value={percentage}/>
              <Chart title="Histórico de execuções" aspect={2 / 1} data={runsList}/>
            </div>
            {/* <div className="listContainer">
            <div className="listTitle">Assistentes em execução</div>
            <Table />
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;