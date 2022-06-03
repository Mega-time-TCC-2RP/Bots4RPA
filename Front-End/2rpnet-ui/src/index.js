import React from 'react';
import ReactDOM from 'react-dom';
import '../src/assets/css/colorVariables.css';
import '../src/assets/css/colorBlind.css';
import '../src/assets/css/darkMode.css';
import '../src/assets/css/components/card.css';

import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  useNavigate
} from 'react-router-dom';

import './assets/css/components/button.css'
import './index.css';


// import Navbar from './components/menu/Navbar'
import Home from './pages/home/';
import WaitingRoom from './pages/waitingRoom/waitingRoom';
import Login from './pages/login/';
import SkinShop from './pages/skinShop/skinShop';
import Marketplace from './pages/marketplace/marketplace';
import Assistant from './pages/myProcesses/assistant';
import { TelaTimeline } from './pages/social/index';
import Quest from './pages/quests';
import DashBoard from './pages/dashboard/dashboard';
import TesteDaltonicMode from './pages/DaltonicModeTest';
import Profile from './pages/profile/index';
import Config from './pages/config/config';
import Guide from './pages/guide/guide';
import NotFound from './pages/notFound/';
import LandingPage from './pages/landingPage/landingPage';
import RegisterCompany from './pages/registerCompany/registerCompany';
import RegisterUser from './pages/registerUser/registerUser';
import Dags from './pages/dags/dags';
import RegisterUserGoogle from './pages/registerUser/registerUserGoogle';


import { history } from './history';
import VLibras from '@djpfs/react-vlibras'
import { usuarioAutenticado, parseJwt } from '../src/services/auth';
import { LayersClear } from '@material-ui/icons';


// Sem cadastro


const routing = (
  <Router>
    <div>
      <Routes history={history}>
        <Route exact path="/" element={<LandingPage />} /> {/* Home */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} /> {/* Login */}
        <Route path="/registerCompany" element={<RegisterCompany />} />
        <Route path="/registerUser" element={<RegisterUser />} />
        <Route path='/dags' element={<Dags />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path="/registerUserGoogle" element={<RegisterUserGoogle />} />
        <Route path="/Config" element={<Config />} /> {/* Config */}
        <Route path="/waitingRoom" element={<WaitingRoom />} /> {/* WaitingRoom */}
        <Route path="/profile" element={<Profile />} /> {/* Profile */}
        <Route path="/guide" element={<Guide />} /> {/* Guide */}
        <Route path="/skinShop" element={<SkinShop />} /> {/* Marketplace */}
        <Route path="/marketplace" element={<Marketplace />} /> {/* Marketplace */}
        <Route path="/assistant" element={<Assistant/>} /> {/* Assistant */}
        <Route path="/social" element={<TelaTimeline />} /> {/* Social */}
        <Route path="/quests" element={<Quest />} /> {/* Task Calendar */}
        <Route path="/testeDaltonic" element={<TesteDaltonicMode />} />

        <Route path="/notFound" element={<NotFound />} /> {/* Not Found */}
        <Route path="*" element={<Navigate to="notFound" />} /> {/*Redireciona para Not Found caso não encontre nenhuma rota*/}
      </Routes>
    </div>
  </Router>
);

const SetTema = () => {
  let mode = localStorage.getItem('temaApp');

  if (mode === "normal") {
    document.documentElement.classList.toggle("normal")
    document.documentElement.classList.remove("Acromatopsia")
    document.documentElement.classList.remove("Protanopia")
    document.documentElement.classList.remove("Deuteranopia")
    document.documentElement.classList.remove("Tritanopia")

    document.documentElement.classList.remove("Acromatomalia")
    document.documentElement.classList.remove("Tritanomalia")
    document.documentElement.classList.remove("Deuteranomalia")
    document.documentElement.classList.remove("Protanomalia")

    localStorage.setItem('temaApp', mode);
  }
  else if (mode === "darkMode") {
    document.documentElement.classList.toggle("Dark")
    document.documentElement.classList.remove("Acromatopsia")
    document.documentElement.classList.remove("Protanopia")
    document.documentElement.classList.remove("Deuteranopia")
    document.documentElement.classList.remove("Tritanopia")

    document.documentElement.classList.remove("Acromatomalia")
    document.documentElement.classList.remove("Tritanomalia")
    document.documentElement.classList.remove("Deuteranomalia")
    document.documentElement.classList.remove("Protanomalia")

    document.documentElement.classList.remove("normal");

    localStorage.setItem('temaApp', mode);
  }
  else if (mode === "achromatopsia") {
    document.documentElement.classList.toggle("Acromatopsia")
    document.documentElement.classList.remove("normal")
    document.documentElement.classList.remove("Protanopia")
    document.documentElement.classList.remove("Deuteranopia")
    document.documentElement.classList.remove("Tritanopia")

    document.documentElement.classList.remove("Acromatomalia")
    document.documentElement.classList.remove("Tritanomalia")
    document.documentElement.classList.remove("Deuteranomalia")
    document.documentElement.classList.remove("Protanomalia")

    document.documentElement.classList.remove("Dark");

    localStorage.setItem('temaApp', mode);
  }
  else if (mode === "protanopia") {
    document.documentElement.classList.toggle("Protanopia")
    document.documentElement.classList.remove("Acromatopsia")
    document.documentElement.classList.remove("normal")
    document.documentElement.classList.remove("Deuteranopia")
    document.documentElement.classList.remove("Tritanopia")

    document.documentElement.classList.remove("Acromatomalia")
    document.documentElement.classList.remove("Tritanomalia")
    document.documentElement.classList.remove("Deuteranomalia")
    document.documentElement.classList.remove("Protanomalia")

    document.documentElement.classList.remove("Dark");

    localStorage.setItem('temaApp', mode);
  }
  else if (mode === "deuteranopia") {
    document.documentElement.classList.toggle("Deuteranopia")
    document.documentElement.classList.remove("Acromatopsia")
    document.documentElement.classList.remove("Protanopia")
    document.documentElement.classList.remove("normal")
    document.documentElement.classList.remove("Tritanopia")

    document.documentElement.classList.remove("Acromatomalia")
    document.documentElement.classList.remove("Tritanomalia")
    document.documentElement.classList.remove("Deuteranomalia")
    document.documentElement.classList.remove("Protanomalia")

    document.documentElement.classList.remove("Dark");

    localStorage.setItem('temaApp', mode);
  }
  else if (mode === "tritanopia") {
    document.documentElement.classList.toggle("Tritanopia")
    document.documentElement.classList.remove("Acromatopsia")
    document.documentElement.classList.remove("Protanopia")
    document.documentElement.classList.remove("Deuteranopia")
    document.documentElement.classList.remove("normal")

    document.documentElement.classList.remove("Acromatomalia")
    document.documentElement.classList.remove("Tritanomalia")
    document.documentElement.classList.remove("Deuteranomalia")
    document.documentElement.classList.remove("Protanomalia")

    document.documentElement.classList.remove("Dark");

    localStorage.setItem('temaApp', mode);
  }
  else if (mode === "achromatomaly") {
    document.documentElement.classList.toggle("Acromatomalia")
    document.documentElement.classList.remove("Acromatopsia")
    document.documentElement.classList.remove("Protanopia")
    document.documentElement.classList.remove("Deuteranopia")
    document.documentElement.classList.remove("Tritanopia")

    document.documentElement.classList.remove("normal")
    document.documentElement.classList.remove("Tritanomalia")
    document.documentElement.classList.remove("Deuteranomalia")
    document.documentElement.classList.remove("Protanomalia")

    document.documentElement.classList.remove("Dark");

    localStorage.setItem('temaApp', mode);
  }
  else if (mode === "tritanomaly") {
    document.documentElement.classList.toggle("Tritanomalia")
    document.documentElement.classList.remove("Acromatopsia")
    document.documentElement.classList.remove("Protanopia")
    document.documentElement.classList.remove("Deuteranopia")
    document.documentElement.classList.remove("Tritanopia")

    document.documentElement.classList.remove("Acromatomalia")
    document.documentElement.classList.remove("normal")
    document.documentElement.classList.remove("Deuteranomalia")
    document.documentElement.classList.remove("Protanomalia")

    document.documentElement.classList.remove("Dark");

    localStorage.setItem('temaApp', mode);
  }
  else if (mode === "protanomaly") {
    document.documentElement.classList.toggle("Protanomalia")
    document.documentElement.classList.remove("Acromatopsia")
    document.documentElement.classList.remove("Protanopia")
    document.documentElement.classList.remove("Deuteranopia")
    document.documentElement.classList.remove("Tritanopia")

    document.documentElement.classList.remove("Acromatomalia")
    document.documentElement.classList.remove("Tritanomalia")
    document.documentElement.classList.remove("Deuteranomalia")
    document.documentElement.classList.remove("normal")

    document.documentElement.classList.remove("Dark");

    localStorage.setItem('temaApp', mode);
  }
  else if (mode === "deuteranomaly") {
    document.documentElement.classList.toggle("Deuteranomalia")
    document.documentElement.classList.remove("Acromatopsia")
    document.documentElement.classList.remove("Protanopia")
    document.documentElement.classList.remove("Deuteranopia")
    document.documentElement.classList.remove("Tritanopia")

    document.documentElement.classList.remove("Acromatomalia")
    document.documentElement.classList.remove("Tritanomalia")
    document.documentElement.classList.remove("normal")
    document.documentElement.classList.remove("Protanomalia")

    document.documentElement.classList.remove("Dark");

    localStorage.setItem('temaApp', mode);
  }
  else {
    document.documentElement.classList.toggle("normal")
    document.documentElement.classList.remove("Acromatopsia")
    document.documentElement.classList.remove("Protanopia")
    document.documentElement.classList.remove("Deuteranopia")
    document.documentElement.classList.remove("Tritanopia")

    document.documentElement.classList.remove("Acromatomalia")
    document.documentElement.classList.remove("Tritanomalia")
    document.documentElement.classList.remove("Deuteranomalia")
    document.documentElement.classList.remove("Protanomalia")

    document.documentElement.classList.remove("Dark");

    localStorage.setItem('temaApp', "normal");
  }
}

const ValidateToken = () => {
  let navigate = useNavigate();
  console.log("Bom dia!")
  console.log(parseJwt())
}

ReactDOM.render(routing, document.getElementById('root'));
ReactDOM.render(SetTema());