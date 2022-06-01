import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VLibras from '@djpfs/react-vlibras'
import axios, { Axios } from 'axios';


//Components
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import Navbar from '../../components/menu/Navbar'

//css
import '../../assets/css/pages/dashboard.css'
import '../../assets/css/components/button.css'
import '../../assets/css/components/fonts.css'


export default function DashBoard() {
        return(
                <div>
                        <Navbar/>
                        <VLibras/>
                        <div className='h1 dashboard-aaa'>
                                DASHBOARD
                        </div>
                </div>
        )

}